# Storage Tongeren — website

A standalone static website for Storage Tongeren, modelled on citystorage.be (and in
particular its Tongeren location page), with blue as the leading colour instead of orange.
Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.

## Open it on your PC

Unzip the folder and double-click `index.html`. It opens in your browser and every page
and link works straight from disk. (The Google Maps frame on the contact page and the two
web fonts need an internet connection; everything else works offline.)

## Files

```
storage-tongeren/
├── index.html            Home — hero, size guide, steps, reasons, practical info, FAQ
├── opslagruimtes.html    Sizes: three categories, size guide, what you may and may not store
├── hoe-het-werkt.html    Booking process, during the rental, packing tips, FAQ
├── over-ons.html         The split from CityStorage, the building
├── contact.html          Contact details, map, contact form
├── assets/
│   ├── css/style.css     All styling. Colours and fonts sit in :root at the top.
│   ├── js/main.js        Mobile menu, the size guide, the year in the footer
│   └── img/logo.svg      Logo and favicon
└── README.md
```

## Things to check before going live

These are taken from the current CityStorage Tongeren page and booking system, so please
confirm they still apply to the new company:

| What | Current value | Where |
|---|---|---|
| Booking link | `https://beheer.myyounit.nl/checkout/fastgoed-bv/blOBJDpx` | every "Boek nu" button |
| Phone / WhatsApp | +32 456 83 49 66 | header, footer, contact |
| E-mail | info@storagetongeren.be (invented placeholder) | footer, contact |
| Starting price | € 42,65 per month | home facts bar, opslagruimtes.html |
| Address | Prinsenweg 59, 3700 Tongeren | everywhere |

The `/checkout/fastgoed-bv/` URL you gave me returns a 404 on its own; the code
`blOBJDpx` at the end is what makes it resolve to the Tongeren checkout. If myYounit gives
you a new link for the split-off company, search and replace the whole URL across the five
HTML files.

## Changing things

**Colours** — open `assets/css/style.css` and edit the values in `:root`. `--blue` is the
main blue, `--navy` the dark sections, `--signal` the yellow accent used on the booking
buttons.

**Text** — edit the HTML files directly; the content is plain text between the tags.

**The size guide** — the sizes, the drawings and the "what fits in here" descriptions live
in the `sizes` array at the top of `assets/js/main.js`. Every item is `[x, y, width, height,
label]` in metres, measured from the top-left corner of the unit. Adjust these to your real
unit sizes once you have the list from myYounit.

**Photos** — there are none in here on purpose: the CityStorage photos belong to the other
company. Once you have your own photos of the building, the corridor and an open unit, drop
them in `assets/img/` and replace the drawn SVG in the hero of `index.html` with
`<img src="assets/img/jouw-foto.jpg" alt="...">`.

**The contact form** doesn't send anything yet. Create a free form endpoint (Formspree,
Basin, or whatever your host offers) and paste its address into the `action="..."` attribute
in `contact.html`.

## Publishing it

Any static host works: Netlify or Cloudflare Pages (drag the folder onto their dashboard),
GitHub Pages, or classic FTP to a hosting package at Combell or One.com. Point
storagetongeren.be (or whichever domain you register) at it.

## Still to do

- Algemene voorwaarden and privacy/cookie policy pages — the footer links are placeholders.
- Company details in the footer: legal name, VAT number, registered office.
- A redirect or notice on citystorage.be/locaties/tongeren pointing here, so you keep the
  existing search traffic.
