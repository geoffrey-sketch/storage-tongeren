/* Storage Tongeren — site script
   - Mobile menu toggle
   - Size guide ("maatwijzer") on opslagruimtes.html and index.html
   - Footer year
   No dependencies. */

(function () {
  "use strict";

  /* ---------- footer year ---------- */
  var jaartal = document.getElementById("jaartal");
  if (jaartal) {
    jaartal.textContent = new Date().getFullYear();
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hoofdmenu");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu when a link inside it is clicked (handy on mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- size guide ("maatwijzer") ----------
     Every entry is [x, y, width, height, label] in metres, measured from
     the top-left corner of the unit. Adjust these to the real unit sizes
     once you have the list from myYounit — see README.md.
     All units are drawn from the same top-left corner (x=0, y=0) so they
     line up against the same 25 m² dashed reference square (5 m x 5 m)
     and stay easy to compare. */
  var sizes = [
    [0, 0, 1.5, 1, "1,5 m²", "Een extra kast: dozen, archief, seizoensspullen."],
    [0, 0, 2, 2.5, "5 m²", "De inhoud van een kleine berging of zolder."],
    [0, 0, 3, 4, "12 m²", "Een studio of één kamer volledig leeg."],
    [0, 0, 4, 5, "20 m²", "De inboedel van een appartement met 2 slaapkamers."],
    [0, 0, 5, 6, "30 m² en groter", "Een garage, wagen of de volledige inboedel van een huis."]
  ];

  var optionsWrap = document.getElementById("maatwijzer-keuze");
  var stage = document.getElementById("maatwijzer-tekening");

  if (optionsWrap && stage) {
    var SCALE = 76; // px per metre
    var REF = 5; // 25 m² reference square = 5m x 5m
    var PAD = 30; // px padding inside the drawing
    var VIEW = REF * SCALE + PAD * 2;

    function drawSize(index) {
      var entry = sizes[index];
      var w = entry[2];
      var h = entry[3];
      var label = entry[4];
      var caption = entry[5];
      var area = (w * h).toLocaleString("nl-BE", { maximumFractionDigits: 1 });

      var refPx = REF * SCALE;
      var unitWpx = w * SCALE;
      var unitHpx = h * SCALE;
      var originX = PAD;
      var originY = PAD;

      var svg =
        '<svg viewBox="0 0 ' + VIEW + " " + VIEW + '" width="' + VIEW + '" height="' + VIEW + '" role="img" aria-label="Plattegrond van ' + label + ', naast een stippellijn van 25 m² ter vergelijking">' +
        // 25 m² dashed reference square
        '<rect x="' + originX + '" y="' + originY + '" width="' + refPx + '" height="' + refPx + '" fill="none" stroke="#c3cee3" stroke-width="2" stroke-dasharray="6 6" rx="4"></rect>' +
        '<text x="' + (originX + refPx - 6) + '" y="' + (originY + refPx - 10) + '" text-anchor="end" font-size="13" fill="#8b98b3" font-family="IBM Plex Sans, sans-serif">25 m² referentie</text>' +
        // the actual unit, same top-left corner
        '<rect x="' + originX + '" y="' + originY + '" width="' + unitWpx + '" height="' + unitHpx + '" fill="#e8eefc" stroke="#1450d8" stroke-width="2.5" rx="4"></rect>' +
        '<text x="' + (originX + unitWpx / 2) + '" y="' + (originY + unitHpx / 2 - 6) + '" text-anchor="middle" font-size="16" font-weight="700" fill="#0b1e33" font-family="Archivo, sans-serif">' + label + "</text>" +
        '<text x="' + (originX + unitWpx / 2) + '" y="' + (originY + unitHpx / 2 + 14) + '" text-anchor="middle" font-size="12" fill="#445269" font-family="IBM Plex Sans, sans-serif">' + w.toString().replace(".", ",") + " x " + h.toString().replace(".", ",") + " m</text>" +
        "</svg>";

      stage.innerHTML = svg + '<p class="sizer__caption"><strong>' + label + "</strong> — " + caption + "</p>";

      optionsWrap.querySelectorAll(".sizer__option").forEach(function (btn, i) {
        btn.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
    }

    optionsWrap.innerHTML = sizes
      .map(function (entry, i) {
        return (
          '<button type="button" class="sizer__option" aria-pressed="' + (i === 0 ? "true" : "false") + '" data-index="' + i + '">' +
          '<span class="sz">' + entry[4] + "</span>" +
          '<span class="lbl">' + entry[2].toString().replace(".", ",") + " x " + entry[3].toString().replace(".", ",") + " m</span>" +
          "</button>"
        );
      })
      .join("");

    optionsWrap.querySelectorAll(".sizer__option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        drawSize(parseInt(btn.getAttribute("data-index"), 10));
      });
    });

    drawSize(0);
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ---------- photo lightbox ---------- */
  var lightboxImgs = Array.prototype.slice.call(document.querySelectorAll(".lightbox-img"));
  var lightbox = document.getElementById("lightbox");

  if (lightboxImgs.length && lightbox) {
    var lbImg = document.getElementById("lightboxImg");
    var lbClose = lightbox.querySelector(".lightbox__close");
    var lbPrev = lightbox.querySelector(".lightbox__prev");
    var lbNext = lightbox.querySelector(".lightbox__next");
    var lbIndex = 0;

    function showLightbox(index) {
      lbIndex = index;
      lbImg.src = lightboxImgs[lbIndex].currentSrc || lightboxImgs[lbIndex].src;
      lbImg.alt = lightboxImgs[lbIndex].alt || "";
    }

    function openLightbox(index) {
      showLightbox(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }

    function stepLightbox(delta) {
      showLightbox((lbIndex + delta + lightboxImgs.length) % lightboxImgs.length);
    }

    lightboxImgs.forEach(function (img, i) {
      img.addEventListener("click", function () {
        openLightbox(i);
      });
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", function () { stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener("click", function () { stepLightbox(1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });

    if (lightboxImgs.length < 2) {
      if (lbPrev) lbPrev.style.display = "none";
      if (lbNext) lbNext.style.display = "none";
    }
  }
})();
