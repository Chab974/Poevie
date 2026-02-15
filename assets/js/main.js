const FALLBACK_CONFIG = {
  site: {
    name: "Poévie",
    url: "https://chab974.github.io/Poevie/",
    locale: "fr_FR"
  },
  seo: {
    title: "Poévie | Patrice Lauret",
    description: "Poévie, une vie de poèmes de Patrice Lauret. Disponible en ebook et en livre broché.",
    og_image: "./assets/img/poevie-cover.png",
    twitter_card: "summary_large_image"
  },
  book: {
    title: "Poévie",
    subtitle: "Une vie de poèmes",
    author: "Patrice Lauret",
    tagline: "Un recueil poétique à découvrir et à offrir.",
    description:
      "Poévie rassemble des textes courts et sensibles autour des émotions, des liens humains et de la mémoire.",
    benefits: [
      "Des textes concis, accessibles et profonds.",
      "Un univers intime pour lecteurs de poésie contemporaine.",
      "Deux formats disponibles pour lire partout."
    ],
    information_points: [],
    cover_image: "./assets/img/poevie-cover.png",
    cover_image_png: "./assets/img/poevie-cover.png",
    cover_image_avif: "./assets/img/poevie-cover.avif",
    formats: [
      {
        type: "ebook",
        price_label: "Prix et disponibilité sur Amazon",
        amazon_url:
          "https://www.amazon.fr/Poevie-Une-Po%C3%A8mes-Patrice-Lauret-ebook/dp/B07MJTZHYQ/ref=sr_1_3?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=TBUL9QVTD07Y&dib=eyJ2IjoiMSJ9.pUTXcgwYJ0MDV03KuYzDD2vVwrsaJgfY0HhAmv1xv6nqiZiGAlnI5hkeJScohkXLvSyGxaQMlTE0V6gFMw2LqVsUcsUNoL6eBdvivQjJrXUGB71GDQU93i-y1sBCz-huTAJizSarhdZ7mC09jU9qOEdwYLq8ki0WZmOy1IKoFCPwPHHjkAxW3Zfl64Xalf_jcAVNrihb4oe2irsOuQxXIWvYi8SLI51lk8dDc3YXJ5E.HH4504oV-TVU09UGCTIOo8_sd6deDVUA2L9E4ElbhTU&dib_tag=se&keywords=poevie&qid=1771121001&s=books&sprefix=poevie%2Cstripbooks%2C213&sr=1-3"
      },
      {
        type: "paperback",
        price_label: "Prix et disponibilité sur Amazon",
        amazon_url: "https://amzn.eu/d/h7kd53S"
      }
    ]
  },
  author: {
    name: "Patrice Lauret",
    bio:
      "Patrice Lauret propose une écriture poétique directe et sensible. Ses textes captent des instants de vie, des fragilités et des élans intérieurs.",
    photo: "./assets/img/author-photo.png",
    photo_avif: "./assets/img/author-photo.avif"
  },
  excerpts: [
    "Je marche dans la ville / un silence au fond des poches / et la lumière qui insiste.",
    "L'encre garde nos failles / comme une mer garde le sel / sans jamais juger la rive.",
    "Chaque mot posé / est une fenêtre ouverte / sur ce que l'on tait."
  ],
  social_proof: [
    {
      quote: "À remplacer par un avis Amazon vérifié: recueil émouvant, écriture fluide, lecture marquante.",
      source: "Lecteur Amazon"
    },
    {
      quote: "À remplacer par un avis Amazon vérifié: poésie accessible, texte sincère, beau livre à offrir.",
      source: "Lectrice Amazon"
    },
    {
      quote: "À remplacer par un avis Amazon vérifié: univers intime, style net et moderne.",
      source: "Lecteur Amazon"
    }
  ],
  legal: {
    footer_note: "© 2026 Patrice Lauret. Tous droits réservés."
  }
};

const COVER_PLACEHOLDER = "./assets/img/cover-placeholder.svg";
const AUTHOR_PLACEHOLDER = "./assets/img/author-placeholder.svg";

function pick(value, fallback) {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

function formatLabel(type) {
  return type === "paperback" ? "Livre broché" : "Ebook Kindle";
}

function getFormat(config, wanted) {
  const formats = pick(config?.book?.formats, []);
  return formats.find((item) => item.type === wanted);
}

function getCoverPng(config) {
  return pick(
    config?.book?.cover_image_png,
    pick(config?.book?.cover_image, FALLBACK_CONFIG.book.cover_image_png)
  );
}

function getCoverAvif(config) {
  return pick(config?.book?.cover_image_avif, "");
}

function getAuthorPhoto(config) {
  return pick(config?.author?.photo, FALLBACK_CONFIG.author.photo);
}

function getAuthorPhotoAvif(config) {
  return pick(config?.author?.photo_avif, "");
}

async function loadConfig() {
  try {
    const response = await fetch("./book.config.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return { ...FALLBACK_CONFIG, ...json };
  } catch (error) {
    console.warn("Config fallback used:", error);
    return FALLBACK_CONFIG;
  }
}

function setMetaTag(selector, content) {
  const el = document.querySelector(selector);
  if (el && content) el.setAttribute("content", content);
}

function renderHeroActions(config) {
  const holder = document.getElementById("hero-format-buttons");
  if (!holder) return;
  holder.innerHTML = "";

  const formats = pick(config?.book?.formats, []);
  if (!formats.length) return;

  formats.forEach((format, idx) => {
    const link = document.createElement("a");
    link.className = `btn ${idx === 0 ? "btn-ink" : "btn-outline"}`;
    link.href = pick(format.amazon_url, "https://amzn.eu/d/h7kd53S");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `Acheter ${formatLabel(format.type)}`;
    link.setAttribute("aria-label", `Acheter ${formatLabel(format.type)} sur Amazon`);
    holder.appendChild(link);
  });
}

function renderFormatCards(config) {
  const holder = document.getElementById("format-cards");
  if (!holder) return;
  holder.innerHTML = "";

  const formats = pick(config?.book?.formats, []);
  formats.forEach((format) => {
    const article = document.createElement("article");
    article.className = "format-card";
    article.innerHTML = `
      <p class="format-type">Format</p>
      <h3 class="format-name">${formatLabel(format.type)}</h3>
      <p class="format-price">${pick(format.price_label, "Prix sur Amazon")}</p>
      <a class="btn btn-ink btn-wide"
         href="${pick(format.amazon_url, "https://amzn.eu/d/h7kd53S")}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Commander ${formatLabel(format.type)} sur Amazon">
         Voir sur Amazon
      </a>
    `;
    holder.appendChild(article);
  });
}

function renderBenefits(config) {
  const list = document.getElementById("book-benefits");
  if (!list) return;

  const benefits = pick(config?.book?.benefits, FALLBACK_CONFIG.book.benefits);
  list.innerHTML = "";
  benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    list.appendChild(li);
  });
}

function renderExcerpts(config) {
  const list = document.getElementById("excerpts-list");
  if (!list) return;

  const excerpts = pick(config?.excerpts, []);
  list.innerHTML = "";

  if (!excerpts.length) {
    list.innerHTML = `<p class="excerpt-item">Extraits à venir.</p>`;
    return;
  }

  excerpts.slice(0, 3).forEach((excerpt) => {
    const p = document.createElement("p");
    p.className = "excerpt-item";
    p.textContent = excerpt;
    list.appendChild(p);
  });
}

function renderInformationPoints(config) {
  const section = document.getElementById("informations");
  const list = document.getElementById("information-points-list");
  if (!section || !list) return;

  const points = pick(config?.book?.information_points, []);
  if (!points.length) {
    section.hidden = true;
    list.innerHTML = "";
    return;
  }

  section.hidden = false;
  list.innerHTML = "";
  points.slice(0, 4).forEach((point) => {
    const card = document.createElement("article");
    card.className = "info-card";
    card.textContent = point;
    list.appendChild(card);
  });
}

function renderSocialProof(config) {
  const section = document.getElementById("avis");
  const list = document.getElementById("social-proof-list");
  if (!section || !list) return;

  const quotes = pick(config?.social_proof, []);
  if (!quotes.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  list.innerHTML = "";
  quotes.forEach((quoteItem) => {
    const figure = document.createElement("figure");
    figure.className = "quote-card";
    figure.innerHTML = `
      <blockquote>${pick(quoteItem.quote, "Avis lecteur indisponible.")}</blockquote>
      <figcaption>${pick(quoteItem.source, "Source non précisée")}</figcaption>
    `;
    list.appendChild(figure);
  });
}

function renderJsonLd(config) {
  const script = document.getElementById("book-ldjson");
  if (!script) return;

  const offers = pick(config?.book?.formats, []).map((format) => ({
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "",
    availability: "https://schema.org/InStock",
    url: pick(format.amazon_url, "https://amzn.eu/d/h7kd53S"),
    itemCondition: "https://schema.org/NewCondition",
    category: formatLabel(format.type)
  }));

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: pick(config?.book?.title, FALLBACK_CONFIG.book.title),
    author: {
      "@type": "Person",
      name: pick(config?.book?.author, FALLBACK_CONFIG.book.author)
    },
    bookFormat: pick(config?.book?.formats, []).map((f) => formatLabel(f.type)),
    image: getCoverPng(config),
    inLanguage: "fr",
    offers
  };

  script.textContent = JSON.stringify(bookJsonLd, null, 2);
}

function applyContent(config) {
  const siteName = pick(config?.site?.name, FALLBACK_CONFIG.site.name);
  const siteUrl = pick(config?.site?.url, FALLBACK_CONFIG.site.url);
  const bookTitle = pick(config?.book?.title, FALLBACK_CONFIG.book.title);
  const bookSubtitle = pick(config?.book?.subtitle, FALLBACK_CONFIG.book.subtitle);
  const authorName = pick(config?.author?.name, pick(config?.book?.author, FALLBACK_CONFIG.book.author));
  const paperback = getFormat(config, "paperback");
  const defaultCtaUrl = pick(paperback?.amazon_url, "https://amzn.eu/d/h7kd53S");

  const coverPng = getCoverPng(config);
  const coverAvif = getCoverAvif(config);
  const ogImage = pick(config?.seo?.og_image, coverPng);

  document.title = pick(config?.seo?.title, `${bookTitle} | ${authorName}`);
  setMetaTag('meta[name="description"]', pick(config?.seo?.description, FALLBACK_CONFIG.seo.description));
  setMetaTag('meta[property="og:title"]', pick(config?.seo?.title, `${bookTitle} | ${authorName}`));
  setMetaTag(
    'meta[property="og:description"]',
    pick(config?.seo?.description, FALLBACK_CONFIG.seo.description)
  );
  setMetaTag('meta[property="og:image"]', ogImage);
  setMetaTag('meta[property="og:url"]', siteUrl);
  setMetaTag('meta[name="twitter:title"]', pick(config?.seo?.title, `${bookTitle} | ${authorName}`));
  setMetaTag(
    'meta[name="twitter:description"]',
    pick(config?.seo?.description, FALLBACK_CONFIG.seo.description)
  );
  setMetaTag('meta[name="twitter:image"]', ogImage);
  setMetaTag('meta[name="twitter:card"]', pick(config?.seo?.twitter_card, FALLBACK_CONFIG.seo.twitter_card));

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", siteUrl);

  const titleEl = document.getElementById("hero-title");
  if (titleEl) titleEl.textContent = bookTitle;

  const subtitleEl = document.getElementById("hero-subtitle");
  if (subtitleEl) subtitleEl.textContent = bookSubtitle;

  const taglineEl = document.getElementById("hero-tagline");
  if (taglineEl) taglineEl.textContent = pick(config?.book?.tagline, FALLBACK_CONFIG.book.tagline);

  const eyebrowEl = document.getElementById("hero-eyebrow");
  if (eyebrowEl) eyebrowEl.textContent = `${siteName} • ${authorName}`;

  const descriptionEl = document.getElementById("book-description");
  if (descriptionEl) descriptionEl.textContent = pick(config?.book?.description, FALLBACK_CONFIG.book.description);

  const coverEl = document.getElementById("book-cover");
  const coverAvifSourceEl = document.getElementById("book-cover-avif");
  if (coverEl) {
    coverEl.src = coverPng;
    coverEl.alt = `Couverture du livre ${bookTitle} de ${authorName}`;
    coverEl.onerror = () => {
      coverEl.onerror = null;
      coverEl.src = COVER_PLACEHOLDER;
      if (coverAvifSourceEl) coverAvifSourceEl.removeAttribute("srcset");
    };
  }

  if (coverAvifSourceEl) {
    if (coverAvif) {
      coverAvifSourceEl.srcset = coverAvif;
    } else {
      coverAvifSourceEl.removeAttribute("srcset");
    }
  }

  const authorPhotoEl = document.getElementById("author-photo");
  const authorPhotoAvifSourceEl = document.getElementById("author-photo-avif");
  if (authorPhotoEl) {
    authorPhotoEl.src = getAuthorPhoto(config);
    authorPhotoEl.alt = `Portrait de ${authorName}`;
    authorPhotoEl.onerror = () => {
      authorPhotoEl.onerror = null;
      authorPhotoEl.src = AUTHOR_PLACEHOLDER;
      if (authorPhotoAvifSourceEl) authorPhotoAvifSourceEl.removeAttribute("srcset");
    };
  }

  if (authorPhotoAvifSourceEl) {
    const authorPhotoAvif = getAuthorPhotoAvif(config);
    if (authorPhotoAvif) {
      authorPhotoAvifSourceEl.srcset = authorPhotoAvif;
    } else {
      authorPhotoAvifSourceEl.removeAttribute("srcset");
    }
  }

  const authorNameEl = document.getElementById("author-name");
  if (authorNameEl) authorNameEl.textContent = authorName;

  const authorBioEl = document.getElementById("author-bio");
  if (authorBioEl) authorBioEl.textContent = pick(config?.author?.bio, FALLBACK_CONFIG.author.bio);

  const footerTitle = document.getElementById("footer-title");
  if (footerTitle) footerTitle.textContent = bookTitle;

  const footerCopy = document.getElementById("footer-copy");
  if (footerCopy) footerCopy.textContent = pick(config?.legal?.footer_note, FALLBACK_CONFIG.legal.footer_note);

  const navCta = document.getElementById("nav-cta");
  if (navCta) navCta.href = defaultCtaUrl;

  renderHeroActions(config);
  renderBenefits(config);
  renderInformationPoints(config);
  renderExcerpts(config);
  renderSocialProof(config);
  renderFormatCards(config);
  renderJsonLd(config);
}

async function init() {
  const config = await loadConfig();
  applyContent(config);
}

init();
