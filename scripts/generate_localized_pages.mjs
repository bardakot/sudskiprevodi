import { readFile, rm, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://sudskiprevodimk.com";

const homePages = {
  mk: {
    route: "/",
    title: "Професионални Судски Преводи – Судски Преводи МК",
    description: "Професионални судски преводи на правни, академски, деловни и други видови на документи, со најкраток рок за изработка.",
    locale: "mk_MK",
  },
  en: {
    route: "/en/",
    title: "Professional Legal Translation Services – Sudski Prevodi MK",
    description: "Professional certified court translations of legal, academic, business and other types of documents, with the shortest possible turnaround time.",
    locale: "en_GB",
  },
  sr: {
    route: "/sr/",
    title: "Професионални судски преводи – Судски Преводи МК",
    description: "Професионални судски преводи правних, академских, пословних и других врста докумената, у најкраћем року за израду.",
    locale: "sr_RS",
  },
};

const staticClusters = [
  {
    source: "/services/english-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/english-macedonian-translation/",
        title: "Овластен судски преведувач за Англиски јазик – Судски Преводи МК",
        description: "Официјален судски заверен превод помеѓу англиски и македонски јазик, на сите видови на документи.",
      },
      en: {
        route: "/en/services/english-macedonian-translation/",
        title: "Authorized Court Translator for English – Sudski Prevodi MK",
        description: "Official certified court translations between English and Macedonian, for all types of documents.",
      },
    },
  },
  {
    source: "/services/serbian-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/serbian-macedonian-translation/",
        title: "Овластен судски преведувач за Српски јазик – Судски Преводи МК",
        description: "Официјален судски заверен превод помеѓу српски и македонски јазик, на сите видови на документи.",
      },
      sr: {
        route: "/sr/services/serbian-macedonian-translation/",
        title: "Овлашћени судски преводилац за српски језик – Судски Преводи МК",
        description: "Званични судски оверени преводи са српског на македонски језик и са македонског на српски језик, за све врсте докумената.",
      },
    },
  },
  {
    source: "/services/turkish-macedonian-translation/",
    pages: {
      mk: {
        route: "/services/turkish-macedonian-translation/",
        title: "Овластен судски преведувач за Турски јазик – Судски Преводи МК",
        description: "Официјален судски заверен превод помеѓу турски и македонски јазик, на сите видови на документи.",
      },
      tr: {
        route: "/tr/services/turkish-macedonian-translation/",
        title: "Türkçe–Makedonca Yeminli Tercüme | Sudski Prevodi MK",
        description: "Hukuki, akademik, ticari ve kişisel belgeler için Türkçeden Makedoncaya ve Makedoncadan Türkçeye yeminli tercüme.",
      },
    },
  },
  {
    source: "/locations/skopje/",
    pages: {
      mk: {
        route: "/locations/skopje/",
        title: "Скопје – Судски Преводи МК",
        description: "Професионални судски преводи на правни, академски, деловни и други видови на документи во Скопје, со најкраток рок за изработка и достава до Вашата адреса.",
      },
      en: {
        route: "/en/locations/skopje/",
        title: "Skopje – Sudski Prevodi MK",
        description: "Professional certified court translations of legal, academic, business and other types of documents in Skopje, with the shortest possible turnaround time and delivery to your address.",
      },
    },
  },
  {
    source: "/locations/prilep/",
    pages: {
      mk: {
        route: "/locations/prilep/",
        title: "Прилеп – Судски Преводи МК",
        description: "Професионални судски преводи на правни, академски, деловни и други видови на документи во Прилеп, со најкраток рок за изработка и бесплатна достава до Вашата адреса.",
      },
      en: {
        route: "/en/locations/prilep/",
        title: "Prilep – Sudski Prevodi MK",
        description: "Professional certified court translations of legal, academic, business and other types of documents in Prilep, with the shortest possible turnaround time and free delivery to your address.",
      },
    },
  },
  {
    source: "/locations/bitola/",
    pages: {
      mk: {
        route: "/locations/bitola/",
        title: "Битола – Судски Преводи МК",
        description: "Професионални судски преводи на правни, академски, деловни и други видови на документи во Битола, со најкраток рок за изработка и бесплатна достава до Вашата адреса.",
      },
      en: {
        route: "/en/locations/bitola/",
        title: "Bitola – Sudski Prevodi MK",
        description: "Professional certified court translations of legal, academic, business and other types of documents in Bitola, with the shortest possible turnaround time and free delivery to your address.",
      },
    },
  },
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
