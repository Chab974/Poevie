# Landing Page "Poevie" - Documentation Complete et Didactique

## 1) Objectif du projet

Ce depot contient une landing page statique pour promouvoir le livre **Poevie** de **Patrice Lauret** avec un objectif principal de conversion vers Amazon:

- parcours d'achat `ebook`
- parcours d'achat `broche`
- presentation editoriale (livre, auteur, extraits, avis)
- publication simple sur GitHub Pages

Le projet est volontairement **sans framework**: HTML + CSS + JavaScript, avec un fichier de contenu central `book.config.json`.

---

## 2) Stack technique

- `HTML` pour la structure de page
- `CSS` custom pour le style
- `JavaScript` vanilla pour injecter les contenus
- `JSON` pour piloter les textes/liens/images sans hardcode massif
- `GitHub Pages` pour l'hebergement

Points importants:

- Pas de build obligatoire
- Pas de dependances Node/NPM pour le run
- Edition de contenu possible sans toucher la logique JS

---

## 3) Structure du projet

```text
Poevie/
├── index.html
├── book.config.json
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   └── main.css
    ├── js/
    │   └── main.js
    └── img/
        ├── poevie-cover.png
        ├── poevie-cover.avif
        ├── author-photo.png
        ├── author-photo.avif
        ├── cover-placeholder.svg
        └── author-placeholder.svg
```

---

## 4) Fonctionnement general

### 4.1 Flux de rendu

1. `index.html` fournit les sections et les conteneurs vides.
2. `assets/js/main.js` charge `book.config.json`.
3. Le JS injecte les contenus dans les blocs cibles (`hero`, `infos`, `avis`, etc.).
4. Si une donnee est absente:
   - fallback texte/image, ou
   - masquage propre de la section (`hidden`)

### 4.2 Principe "content-first"

La majorite du contenu edito est pilotee par `book.config.json`.  
Vous changez le message marketing sans re-ecrire la page.

---

## 5) Contrat de donnees: `book.config.json`

Schema fonctionnel actuellement exploite:

```json
{
  "site": {
    "name": "string",
    "url": "string",
    "locale": "string"
  },
  "seo": {
    "title": "string",
    "description": "string",
    "og_image": "string",
    "twitter_card": "string"
  },
  "book": {
    "title": "string",
    "subtitle": "string",
    "author": "string",
    "tagline": "string",
    "description": "string",
    "benefits": ["string", "string", "string"],
    "information_points": ["string", "string", "string", "string"],
    "cover_image": "string",
    "cover_image_png": "string",
    "cover_image_avif": "string (optionnel)",
    "formats": [
      {
        "type": "ebook | paperback",
        "price_label": "string",
        "amazon_url": "string"
      }
    ]
  },
  "author": {
    "name": "string",
    "bio": "string",
    "photo": "string",
    "photo_avif": "string (optionnel)"
  },
  "excerpts": ["string", "string", "string"],
  "universe_sections": [
    {
      "title": "string",
      "body": "string avec retours a la ligne"
    }
  ],
  "social_proof": [
    {
      "quote": "string",
      "source": "string (optionnel)"
    }
  ],
  "legal": {
    "footer_note": "string"
  }
}
```

### 5.1 Regles de fallback

- `cover_image_png` absent -> fallback `cover_image`
- `cover_image_avif` absent -> image PNG
- `author.photo_avif` absent -> image PNG
- `social_proof` vide -> section avis masquee
- `book.information_points` vide -> section informations masquee
- `universe_sections` vide -> section univers masquee
- `social_proof[].source` vide -> aucun sous-texte affiche sous la citation

---

## 6) Sections de la page (etat actuel)

- `#hero`: promesse + CTA formats
- `#livre`: pitch + "Pourquoi la poesie ?"
- `#informations`: faits fascinants
- `#auteur`: bio + photo
- `#univers`: bloc visuel + cartes style/themes/portee
- `#extraits`: poeme "Eau"
- `#avis`: temoignages
- `#acheter`: cartes d'achat Amazon

Navigation ancree dans le menu principal.

---

## 7) Modifier le contenu pas a pas

### 7.1 Changer les liens Amazon

Fichier: `book.config.json`

- Ebook: `book.formats[]` avec `type: "ebook"`
- Broche: `book.formats[]` avec `type: "paperback"`

### 7.2 Changer les textes marketing

Toujours dans `book.config.json`:

- `site.name`, `book.tagline`, `book.description`
- `book.benefits`
- `book.information_points`
- `excerpts`
- `social_proof`
- `universe_sections`

### 7.3 Changer les visuels

Images recommandees:

- couverture: `assets/img/poevie-cover.png` + `assets/img/poevie-cover.avif`
- auteur: `assets/img/author-photo.png` + `assets/img/author-photo.avif`

Mettre a jour les chemins dans `book.config.json` si besoin.

---

## 8) Personnalisation du design

Fichier: `assets/css/main.css`

Variables principales:

- `--paper`, `--paper-strong`
- `--ink`, `--ink-soft`
- `--accent`, `--accent-soft`
- `--line`

Le projet est deja calibre pour une identite:

- fond papier
- accents turquoise/rose
- contraste editorial
- section univers plus visuelle et compacte

---

## 9) SEO et meta

### 9.1 Elements geres

- `<title>` dynamique
- `meta description`
- Open Graph (`og:*`)
- Twitter Card
- canonical URL
- JSON-LD `Book` (injection via `#book-ldjson`)
- `robots.txt`
- `sitemap.xml`

### 9.2 Fichiers SEO

- `index.html` (meta)
- `book.config.json` (valeurs SEO dynamiques)
- `robots.txt`
- `sitemap.xml`

---

## 10) Accessibilite et UX

Implementations presentes:

- lien "skip to content"
- `alt` sur images
- CTA explicites
- sections masquables sans casser la structure
- responsive mobile/desktop

Recommandations:

- conserver des textes de boutons explicites
- ne pas surcharger les sections longues
- verifier contraste apres changement de palette

---

## 11) Lancement local

Depuis la racine du projet:

```bash
python3 -m http.server 8080
```

Puis ouvrir:

- [http://localhost:8080](http://localhost:8080)

Pourquoi ce mode:

- evite les problemes de `fetch("./book.config.json")` en ouvrant le fichier directement

---

## 12) Deploiement GitHub Pages

Etat attendu:

- branche source: `main`
- dossier source: `/` (root)

Workflow:

```bash
git add .
git commit -m "Votre message"
git push
```

URL de production actuelle:

- [https://chab974.github.io/Poevie/](https://chab974.github.io/Poevie/)

---

## 13) Troubleshooting

### Probleme: section vide non voulue

- Verifier la cle JSON correspondante:
  - `information_points`
  - `social_proof`
  - `universe_sections`

### Probleme: image non chargee

- Verifier le chemin dans `book.config.json`
- Verifier que le fichier existe dans `assets/img/`
- Le placeholder est automatique en cas d'erreur

### Probleme: changement non visible en ligne

- verifier `git push` termine
- verifier le dernier build GitHub Pages
- attendre la propagation CDN (quelques secondes a 1-2 min)

---

## 14) Guide editorial rapide

Pour garder une page efficace:

- garder 3 a 4 messages forts max par section
- garder les extraits courts et lisibles
- privilegier une phrase d'impact + un CTA net
- eviter les blocs de texte trop longs (mobile)

Template de citation:

```json
{
  "quote": "Texte de l'avis.",
  "source": "Optionnel"
}
```

Si `source` est vide, rien n'est affiche sous la citation.

---

## 15) Maintenance

Checklist avant push:

- JSON valide (`python3 -m json.tool book.config.json`)
- liens Amazon cliquables
- visuels charges
- sections dynamiques ok
- rendu mobile lisible

Checklist apres push:

- site accessible
- build Pages en `built`
- meta SEO presentes

---

## 16) Resume

Ce projet est pense pour etre:

- simple a maintenir
- rapide a faire evoluer
- robuste sans framework
- efficace pour convertir vers Amazon

Si vous gardez `book.config.json` comme source unique de contenu, vous pouvez iterer tres vite sans dette technique.
