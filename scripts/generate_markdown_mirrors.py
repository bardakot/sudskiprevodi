#!/usr/bin/env python3
"""
Generate clean markdown mirrors of every static page on the site for AI tools
(ChatGPT, Claude, Perplexity). Walks SITE_ROOT, finds every index.html, strips
chrome (nav/footer/scripts/widgets), converts the body to markdown, and writes
index.md alongside each source.

Re-runnable — overwrites existing mirrors on each run.

Setup (one time):
    python3 -m venv .venv
    .venv/bin/pip install beautifulsoup4 markdownify

Usage:
    .venv/bin/python scripts/generate_markdown_mirrors.py
"""

from __future__ import annotations

import re
import sys
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify

REPO_ROOT = Path(__file__).resolve().parent.parent
SITE_ROOT = REPO_ROOT / "public"
SITE_BASE_URL = "https://www.sudskiprevodimk.com"

SKIP_PATH_FRAGMENTS = ("/404", "/thanks/")

STRIP_TAGS = ("nav", "footer", "script", "style", "noscript", "iframe")

STRIP_CLASS_EXACT = {"nav", "footer", "cta-split"}
STRIP_CLASS_PREFIX = ("ghl",)
STRIP_CLASS_CONTAINS = (
    "hubspot",
    "intercom",
    "drift",
    "tawk",
    "crisp",
    "livechat",
    "zendesk",
)


def should_skip(html_path: Path) -> bool:
    rel = "/" + html_path.relative_to(SITE_ROOT).as_posix()
    return any(frag in rel for frag in SKIP_PATH_FRAGMENTS)


def matches_strip_class(class_list):
    for cls in class_list:
        c = cls.lower()
        if c in STRIP_CLASS_EXACT:
            return True
        if any(c.startswith(p) for p in STRIP_CLASS_PREFIX):
            return True
        if any(s in c for s in STRIP_CLASS_CONTAINS):
            return True
    return False


def strip_chrome(soup: BeautifulSoup) -> None:
    for tag in soup.find_all(STRIP_TAGS):
        tag.decompose()

    for el in soup.find_all(attrs={"class": True}):
        if matches_strip_class(el.get("class", [])):
            el.decompose()

    for tag_name in ("div", "span"):
        for el in list(soup.find_all(tag_name)):
            if not el.get_text(strip=True) and not el.find(
                ["img", "svg", "video", "audio"]
            ):
                el.unwrap()


def clean_markdown(md: str) -> str:
    md = re.sub(r"\n{3,}", "\n\n", md)
    md = re.sub(r"^\s*0\d\s*$", "", md, flags=re.MULTILINE)
    md = re.sub(r"[•·‧∙▪◦]", "", md)
    md = re.sub(r"!\[\]\([^)]*\)", "", md)
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip() + "\n"


def page_url(html_path: Path) -> str:
    rel = html_path.relative_to(SITE_ROOT).parent
    if rel == Path("."):
        return f"{SITE_BASE_URL}/"
    return f"{SITE_BASE_URL}/{rel.as_posix()}/"


def process(html_path: Path) -> Path:
    html = html_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")

    title = ""
    if soup.title and soup.title.string:
        title = soup.title.string.strip()

    description = ""
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag and desc_tag.get("content"):
        description = desc_tag["content"].strip()

    strip_chrome(soup)

    body = soup.body if soup.body else soup
    md_body = markdownify(str(body), heading_style="ATX")
    md_body = clean_markdown(md_body)

    frontmatter = (
        "---\n"
        f"title: {title}\n"
        f"description: {description}\n"
        f"url: {page_url(html_path)}\n"
        f"last_updated: {date.today().isoformat()}\n"
        "---\n\n"
    )

    out_path = html_path.with_name("index.md")
    out_path.write_text(frontmatter + md_body, encoding="utf-8")
    return out_path


def main() -> int:
    if not SITE_ROOT.exists():
        print(f"Site root not found: {SITE_ROOT}", file=sys.stderr)
        return 1

    generated = []
    skipped = []
    failed = []

    for html_path in sorted(SITE_ROOT.rglob("index.html")):
        if should_skip(html_path):
            skipped.append(html_path)
            continue
        try:
            generated.append(process(html_path))
        except Exception as exc:
            failed.append((html_path, exc))
            print(f"FAILED: {html_path}: {exc}", file=sys.stderr)

    print(f"Generated {len(generated)} markdown mirror(s):")
    for out in generated:
        print(f"  - {out.relative_to(REPO_ROOT)}")
    if skipped:
        print(f"\nSkipped {len(skipped)} page(s) (404 or noindex /thanks/):")
        for p in skipped:
            print(f"  - {p.relative_to(REPO_ROOT)}")
    if failed:
        print(f"\nFailed: {len(failed)}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
