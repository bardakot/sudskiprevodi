import { readFile, rm, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://sudskiprevodimk.com";

const homePages = {
  mk: {
    route: "/",
    title: "Судски преводи | Овластен судски преведувач",
    description: "Судски преводи од овластен преведувач за англиски, српски и турски јазик. Онлајн нарачка, цена од 300–400 денари и бесплатна достава.",
    locale: "mk_MK",
  },
  en: {
    route: "/en/",
    title: "Certified Court Translation Services | Sudski Prevodi MK",
    description: "Certified translations between Macedonian, English, Serbian and Turkish. Online ordering, transparent pricing and free document delivery.",
    locale: "en_GB",
  },
  sr: {
    route: "/sr/",
    title: "Sudski prevodi | Ovlašćeni sudski prevodilac",
    description: "Ovlašćeni sudski prevodi između makedonskog, srpskog, engleskog i turskog jezika. Onlajn naručivanje i besplatna dostava.",
    locale: "sr_RS",
  },
};

const staticClusters = [
  {
    source: "/services/english-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/english-macedonian-translation/",
        title: "Судски Преводи МК | Англиски–Македонски",
        description: "Заверен судски превод од англиски на македонски и обратно — правни, академски, деловни и лични документи.",
      },
      en: {
        route: "/en/services/english-macedonian-translation/",
        title: "English–Macedonian Certified Translation | Sudski Prevodi MK",
        description: "Certified English to Macedonian and Macedonian to English translation for legal, academic, business and personal documents.",
      },
    },
  },
  {
    source: "/services/serbian-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/serbian-macedonian-translation/",
        title: "Судски Преводи МК | Српски–Македонски",
        description: "Заверен судски превод од српски на македонски и обратно — правни, академски, деловни и лични документи.",
      },
      sr: {
        route: "/sr/services/serbian-macedonian-translation/",
        title: "Overeni prevod srpski–makedonski | Sudski Prevodi MK",
        description: "Overeni prevod sa srpskog na makedonski i sa makedonskog na srpski za pravne, akademske, poslovne i lične dokumente.",
      },
    },
  },
  {
    source: "/services/turkish-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/turkish-macedonian-translation/",
        title: "Судски Преводи МК | Турски–Македонски",
        description: "Заверен судски превод од турски на македонски и обратно — правни, академски, деловни и лични документи.",
      },
      tr: {
        route: "/tr/services/turkish-macedonian-translation/",
        title: "Türkçe–Makedonca Yeminli Tercüme | Sudski Prevodi MK",
        description: "Hukuki, akademik, ticari ve kişisel belgeler için Türkçeden Makedoncaya ve Makedoncadan Türkçeye yeminli tercüme.",
      },
    },
  },
  ...["skopje", "prilep", "bitola"].map((city) => {
    const names = {
      skopje: ["Скопје", "Skopje"],
      prilep: ["Прилеп", "Prilep"],
      bitola: ["Битола", "Bitola"],
    }[city];
    return {
      source: `/locations/${city}/`,
      pages: {
        mk: {
          route: `/locations/${city}/`,
          title: `Судски Преводи МК | ${names[0]}`,
          description: `Овластени судски преводи за клиенти во ${names[0]} со онлајн праќање и бесплатна достава.`,
        },
        en: {
          route: `/en/locations/${city}/`,
          title: `Certified Translation Services in ${names[1]} | Sudski Prevodi MK`,
          description: `Certified document translations for clients in ${names[1]}, with online submission, transparent pricing and document delivery.`,
        },
      },
    };
  }),
];

function outputPath(route) {
  return route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
}

async function writeRoute(route, html) {
  const out = outputPath(route);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}

function setMetadata($, page, alternatives, locale) {
  const absolute = `${siteUrl}${page.route}`;
  $("html").attr("lang", page.language).attr("data-lang", page.language);
  $("title").text(page.title);
  $('meta[name="description"]').attr("content", page.description);
  $('link[rel="canonical"]').remove();
  $('link[rel="alternate"][hreflang]').remove();
  $("head").append(`<link rel="canonical" href="${absolute}">`);
  for (const alternative of alternatives) {
    $("head").append(`<link rel="alternate" hreflang="${alternative.language}" href="${siteUrl}${alternative.route}">`);
  }
  const defaultPage = alternatives.find((item) => item.language === "mk") ?? alternatives[0];
  $("head").append(`<link rel="alternate" hreflang="x-default" href="${siteUrl}${defaultPage.route}">`);
  $('meta[property="og:title"]').attr("content", page.title);
  $('meta[property="og:description"]').attr("content", page.description);
  $('meta[property="og:url"]').attr("content", absolute);
  $('meta[property="og:locale"]').attr("content", locale);
  $('meta[name="twitter:title"]').attr("content", page.title);
  $('meta[name="twitter:description"]').attr("content", page.description);
}

function localizedTarget(href, language) {
  if (language === "mk" || !href.startsWith("/")) return href;
  if (href === "/") return language === "en" || language === "sr" ? `/${language}/` : href;
  if (language === "en" && (href.startsWith("/locations/") || href.startsWith("/services/english-"))) return `/en${href}`;
  if (language === "sr" && href.startsWith("/services/serbian-")) return `/sr${href}`;
  if (language === "tr" && href.startsWith("/services/turkish-")) return `/tr${href}`;
  return href;
}

async function generateHomePages() {
  const template = await readFile(path.join(dist, "index.html"), "utf8");
  const serverModule = await import(path.join(root, "dist-server", "entry-server.js"));
  const alternatives = Object.entries(homePages).map(([language, page]) => ({ language, route: page.route }));

  for (const [language, config] of Object.entries(homePages)) {
    const $ = load(template);
    const page = { ...config, language };
    setMetadata($, page, alternatives, config.locale);
    $("#root").html(await serverModule.render(config.route, language));
    await writeRoute(config.route, $.html());
  }
}

async function generateStaticPages() {
  for (const cluster of staticClusters) {
    const sourceHtml = await readFile(outputPath(cluster.source), "utf8");
    const alternatives = Object.entries(cluster.pages).map(([language, page]) => ({ language, route: page.route }));

    for (const [language, config] of Object.entries(cluster.pages)) {
      const $ = load(sourceHtml);
      const page = { ...config, language };
      setMetadata($, page, alternatives, language === "mk" ? "mk_MK" : language === "en" ? "en_GB" : language);

      for (const otherLanguage of ["mk", "en", "sr", "tr"].filter((item) => item !== language)) {
        $(`.lang-${otherLanguage}`).remove();
      }
      $(`.lang-${language}`).removeClass(`lang-${language}`);
      $("head > script:not([type])").filter((_, element) => $(element).text().includes("localStorage.getItem('spm-lang')")).remove();

      $("a[href]").each((_, element) => {
        const anchor = $(element);
        anchor.attr("href", localizedTarget(anchor.attr("href"), language));
      });

      $("[data-set-lang]").each((_, element) => {
        const button = $(element);
        const targetLanguage = button.attr("data-set-lang");
        const target = alternatives.find((item) => item.language === targetLanguage);
        if (!target) return button.remove();
        button.replaceWith(`<a class="lang-btn" data-set-lang="${target.language}" href="${target.route}" hreflang="${target.language}" aria-label="${button.attr("aria-label") ?? target.language}" title="${button.attr("title") ?? target.language}">${button.html()}</a>`);
      });

      await writeRoute(config.route, $.html());
    }
  }
}

await generateHomePages();
await generateStaticPages();
await rm(path.join(root, "dist-server"), { recursive: true, force: true });
