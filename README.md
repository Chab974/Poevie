# Poévie - Landing Page Statique

Mise à jour du README: 16 février 2026.

Landing page éditoriale pour promouvoir le livre **Poévie** de **Patrice Lauret** avec un objectif de conversion vers Amazon (Kindle + broché).

## Aperçu

- Site statique sans framework: `index.html` + `assets/css/main.css` + `assets/js/main.js`
- Contenu piloté par `book.config.json`
- Déploiement sur GitHub Pages
- SEO dynamique injecté côté client (meta + JSON-LD `Book`)

URL de production: [https://chab974.github.io/Poevie/](https://chab974.github.io/Poevie/)

## Structure

```text
Poevie/
├── index.html
├── book.config.json
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/main.css
    ├── js/main.js
    └── img/
```

## Démarrage local

Le fichier `book.config.json` est chargé via `fetch`, donc il faut servir le dossier avec un serveur HTTP.

```bash
python3 -m http.server 8080
```

Puis ouvrir [http://localhost:8080](http://localhost:8080).

## Comment ça fonctionne

1. `index.html` contient la structure.
2. `assets/js/main.js` charge `book.config.json` avec `cache: "no-store"`.
3. Le contenu est injecté dynamiquement.
4. Si le JSON est indisponible/invalide, le site retombe sur `FALLBACK_CONFIG` (intégré dans `main.js`).

## Contrat de données (`book.config.json`)

Clés principales utilisées par le code:

- `site`: nom du site, URL canonique, locale
- `seo`: title, description, image OG, twitter card
- `book`: titre, sous-titre, tagline, description, bénéfices, formats Amazon, préface, images
- `author`: nom, bio, photo
- `excerpts`: extraits
- `universe_sections`: blocs "univers"
- `social_proof`: avis lecteurs
- `legal.footer_note`: texte de footer

Exemple minimal:

```json
{
  "site": {
    "name": "L'Univers des Mots",
    "url": "https://chab974.github.io/Poevie/",
    "locale": "fr_FR"
  },
  "book": {
    "title": "Poévie",
    "subtitle": "Une vie de poèmes",
    "author": "Patrice Lauret",
    "formats": [
      { "type": "ebook", "price_label": "Prix Amazon", "amazon_url": "https://..." },
      { "type": "paperback", "price_label": "Prix Amazon", "amazon_url": "https://..." }
    ],
    "preface_title": "Préface",
    "preface_paragraphs": ["Paragraphe 1", "Paragraphe 2"]
  },
  "author": {
    "name": "Patrice Lauret",
    "photo": "./assets/img/author-photo.png"
  }
}
```

## Règles de rendu importantes

- `book.cover_image_png` fallback sur `book.cover_image`
- `book.cover_image_avif` et `author.photo_avif` sont optionnels
- En cas d'erreur image: placeholders automatiques (`cover-placeholder.svg`, `author-placeholder.svg`)
- `book.information_points` vide: section `#informations` masquée
- `universe_sections` vide: section `#univers` masquée
- `social_proof` vide: section `#avis` masquée
- `social_proof[].source` vide: source non affichée

Limites appliquées dans `main.js`:

- `information_points`: max 4
- `universe_sections`: max 4
- `excerpts`: max 3

## Préface interactive (flip du livre)

- La face avant affiche la couverture.
- La face arrière affiche `book.preface_title` + `book.preface_paragraphs`.
- Desktop: flip au survol.
- Mobile / pointeur tactile: flip au clic.
- Accessibilité clavier: touche `Entrée` et `Espace`.

## SEO et métadonnées

Mises à jour dynamiques à partir de `book.config.json`:

- `<title>`
- `meta[name="description"]`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter (`twitter:title`, `twitter:description`, `twitter:image`, `twitter:card`)
- lien canonical
- JSON-LD `Book` dans `#book-ldjson`

Fichiers SEO statiques:

- `robots.txt`
- `sitemap.xml`

## Déploiement (GitHub Pages)

Configuration attendue:

- Branche: `main`
- Dossier source: racine (`/`)

Workflow:

```bash
git add .
git commit -m "docs: update README"
git push
```

## Maintenance rapide

Avant push:

- Valider le JSON: `python3 -m json.tool book.config.json > /dev/null`
- Vérifier les liens Amazon
- Vérifier le rendu mobile/desktop
- Vérifier les images (cover + auteur)

Après push:

- Vérifier le site en production
- Vérifier le statut du build GitHub Pages

## Tuto détaillé de la pile technique

Cette section explique la pile utilisée dans ce projet et le rôle de chaque composant, de façon pratique.

### 1) Vue d'ensemble

Le site repose sur 5 briques:

- `index.html` pour la structure
- `assets/css/main.css` pour le style et le responsive
- `assets/js/main.js` pour le rendu dynamique
- `book.config.json` pour le contenu (approche content-first)
- GitHub Pages pour l'hébergement

Le projet est volontairement sans framework et sans build obligatoire.

### 2) Flux de rendu

1. Le navigateur charge `index.html`.
2. Le script `assets/js/main.js` lance `init()`.
3. `loadConfig()` charge `book.config.json` via `fetch`.
4. `applyContent(config)` injecte les contenus et met à jour les metas SEO.
5. Les blocs dynamiques (formats, infos, avis, univers, extraits, préface) sont rendus par des fonctions dédiées.
6. En cas d'erreur de chargement JSON, le code utilise `FALLBACK_CONFIG`.

### 3) Rôle des fichiers

- `index.html`: sections, conteneurs, IDs cibles, metas de base, script principal.
- `assets/css/main.css`: design system (variables), layout, composants, media queries, animation du livre.
- `assets/js/main.js`: logique de chargement des données, injection DOM, SEO dynamique, interactions.
- `book.config.json`: source éditoriale unique (texte, liens Amazon, visuels, SEO).
- `robots.txt` et `sitemap.xml`: support SEO côté indexation.

### 4) Modèle de données dans `book.config.json`

Clés principales attendues:

- `site`: `name`, `url`, `locale`
- `seo`: `title`, `description`, `og_image`, `twitter_card`
- `book`: `title`, `subtitle`, `author`, `tagline`, `description`, `benefits`, `information_points`, `formats`, `preface_title`, `preface_paragraphs`, images de couverture
- `author`: `name`, `bio`, `photo`, `photo_avif`
- `excerpts`, `universe_sections`, `social_proof`
- `legal.footer_note`

### 5) Règles de fallback (robustesse)

- `cover_image_png` fallback sur `cover_image`.
- `cover_image_avif` est optionnel.
- `author.photo_avif` est optionnel.
- En cas d'erreur image, placeholders automatiques:
- `assets/img/cover-placeholder.svg`
- `assets/img/author-placeholder.svg`
- Si une section n'a pas de contenu exploitable, elle est masquée proprement:
- `#informations` si `information_points` vide
- `#univers` si `universe_sections` vide
- `#avis` si `social_proof` vide

Limites appliquées:

- `information_points`: max 4
- `universe_sections`: max 4
- `excerpts`: max 3

### 6) Préface interactive (flip card)

La couverture du livre est interactive:

- face avant: image de couverture
- face arrière: `preface_title` + `preface_paragraphs`
- desktop: flip au survol (si périphérique hover)
- mobile/tactile: flip au clic
- clavier: `Entrée` et `Espace` pris en charge

Ce comportement est géré par `setupBookFlip()` dans `assets/js/main.js` et stylé dans `assets/css/main.css`.

### 7) SEO dynamique

Le JS met à jour dynamiquement:

- `document.title`
- `meta[name="description"]`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter (`twitter:title`, `twitter:description`, `twitter:image`, `twitter:card`)
- `<link rel="canonical">`
- JSON-LD `Book` dans `#book-ldjson`

Résultat: le SEO peut être ajusté depuis `book.config.json` sans modifier la structure HTML.

### 8) Responsive et accessibilité

Dans `assets/css/main.css`:

- design piloté par variables CSS (`:root`)
- grilles adaptatives (`hero-grid`, `section-grid`, etc.)
- passage en mono-colonne sous `980px`
- adaptation boutons/hero sous `640px`
- gestion du mode réduction de mouvement:
- `@media (prefers-reduced-motion: reduce)`
- lien d'évitement présent (`skip-link`)
- textes alternatifs image mis à jour dynamiquement

### 9) Workflow d'édition de contenu

1. Modifier `book.config.json`.
2. Lancer le site en local (`python3 -m http.server 8080`).
3. Vérifier les sections clés (hero, infos, univers, avis, acheter).
4. Vérifier les liens Amazon.
5. Commit/push pour publication GitHub Pages.

### 10) Checklist opérationnelle

Avant push:

- `python3 -m json.tool book.config.json > /dev/null`
- vérifier les liens Amazon
- vérifier chargement des images
- vérifier rendu mobile et desktop
- vérifier title/description/canonical

Après push:

- vérifier la disponibilité du site
- vérifier le build GitHub Pages
- contrôler rapidement les metas (source HTML rendu)
