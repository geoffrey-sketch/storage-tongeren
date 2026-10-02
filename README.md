# Super Storage — website

A static website for Super Storage, a self-storage facility at Prinsenweg 59, 3700 Tongeren
(legally Fastgoed BV, BTW BE 0628.981.850). Plain HTML, CSS and JavaScript — no build step,
no framework, no dependencies. Live at https://www.superstorage.be.

The site is in three languages: Dutch (root), French (`/fr/`) and English (`/en/`). Dutch is
the primary, legally authoritative version — French and English are translations, each in
their own subfolder with the same page structure and a shared `assets/` folder.

## Open it on your PC

Unzip the folder and double-click `index.html`. It opens in your browser and every page and
link works straight from disk. (The Google Maps frame on the contact page, the web fonts and
Google Analytics need an internet connection; everything else works offline.)

## Files

```
storage-tongeren/
├── index.html                  Home — hero, size guide, steps, reasons, practical info, FAQ
├── opslagruimtes.html          Sizes: three categories, size guide, what you may/may not store
├── hoe-het-werkt.html          Booking process, during the rental, packing tips, FAQ
├── over-ons.html               The split from CityStorage, the building
├── contact.html                Contact details, map, contact form
├── bedankt.html                Thank-you / booking-confirmation page (noindex, Google Ads conversion tag)
├── algemene-voorwaarden.html   Terms and conditions
├── privacybeleid.html          Privacy policy
├── cookiebeleid.html           Cookie policy
├── fr/                         French translations of all 9 pages above (same filenames)
├── en/                         English translations of all 9 pages above (same filenames)
├── assets/
│   ├── css/style.css           All styling. Colours and fonts sit in :root at the top.
│   ├── js/main.js              Mobile menu, size guide (localised), contact form, year in footer
│   ├── css/fonts.css           Self-hosted web fonts
│   └── img/                    Logo, favicons, photos (foto2/3/4.jpg)
├── sitemap.xml                 All NL/FR/EN URLs with hreflang annotations
├── robots.txt
├── llms.txt                    Plain-text site summary for AI crawlers
└── README.md
```

## The three languages

- Every NL page at the root has a matching page at the same filename under `fr/` and `en/`,
  e.g. `opslagruimtes.html` ↔ `fr/opslagruimtes.html` ↔ `en/opslagruimtes.html`.
- `fr/` and `en/` pages reference the shared `assets/` folder at the root via `../assets/...`.
- Every page has a language switcher in the nav (`NL · FR · EN`) and `hreflang` tags in
  the `<head>` pointing to the other two versions plus `x-default` (Dutch).
- `assets/js/main.js` reads `document.documentElement.lang` at runtime to pick the right
  size-guide labels, number formatting (comma vs. period decimals) and contact-form status
  messages — there is only one JS file for all three languages.
- The three legal pages (terms, privacy, cookies) carry a small notice in French/English
  stating that the Dutch version is legally authoritative in case of any discrepancy. If the
  Dutch legal text changes, the FR/EN translations need to be updated by hand to match —
  they do not update automatically.
- `algemene-voorwaarden.html` (in all three languages) shows the registered seat
  (Millerdries 7a, 3770 Riemst) in its footer instead of the Prinsenweg storage address,
  matching the company's official "maatschappelijke zetel" — this is intentional and
  specific to that one page.

**Adding a new page or changing shared chrome (header/footer/cookie banner) across all
three languages** is easiest with the Python helper that was used to generate the FR/EN
pages in the first place — ask for it if you need to regenerate pages after a structural
change, rather than hand-editing 27 files.

## Changing things

**Colours** — open `assets/css/style.css` and edit the values in `:root`. `--blue` is the
main blue, `--navy` the dark sections, `--signal` the orange/yellow accent used on the
booking buttons.

**Text** — edit the HTML files directly; the content is plain text between the tags. If you
change NL content, remember to also update the matching FR and EN pages, since they are not
generated automatically from the Dutch source.

**The size guide** — the sizes, the drawings and the "what fits in here" descriptions live in
the `SIZES` object (one array per language) near the top of `assets/js/main.js`. Every item is
`[x, y, width, height, label, description]` in metres, measured from the top-left corner of
the unit.

**Photos** — `assets/img/foto2.jpg`, `foto3.jpg` and `foto4.jpg` are referenced across the
site (hero image, gallery, Open Graph share image, JSON-LD `image`). Replace them with your
own photos of the building, the corridor and an open unit, keeping the same filenames, or
update every reference if you rename them.

**The contact form** submits to Formspree (`https://formspree.io/f/mnpnkoqa`) via `fetch()`
in `main.js`, with a honeypot field against spam. If you ever need to point it at a different
endpoint, update the `action="..."` attribute on the `<form>` in all three `contact.html`
files (NL, FR, EN).

## SEO / LLM discoverability

- `sitemap.xml` and `robots.txt` are in the root.
- Every page has Open Graph/Twitter Card meta tags, a canonical link, and `hreflang`
  alternates for all three languages.
- `SelfStorage` (schema.org) JSON-LD business data is on every page; `FAQPage` JSON-LD is on
  the pages with a visible FAQ section (home, "hoe het werkt"/"comment ça marche"/"how it
  works").
- `llms.txt` gives AI crawlers/answer engines a short plain-text summary of the site and its
  three language versions.
- What's outside this repo's control: Google Business Profile listing, backlinks, and actual
  indexing status (check Google Search Console once the site is live and verified).

## Publishing it

Hosted at DeltaBlue, deployed by pulling from this GitHub repository ("Pull from GitHub" in
the DeltaBlue panel) after pushing changes here.

## Still to confirm

- That the FR/EN legal-page translations have been reviewed by someone qualified before they
  are relied on for anything contentious — they were translated carefully but are not a
  substitute for legal sign-off.
- Formspree, MyYounit/booking redirect, DNS and Google Search Console indexing are set up and
  working for the live domain (these were confirmed working for the NL site; recheck after
  any domain or hosting change).
