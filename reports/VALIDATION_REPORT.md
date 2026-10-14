# Validation report

Validated locally on 14 October 2026 from baseline `0d60413ce5d050680a27ec941155ff659e8e7f0f`.

## Local review

```sh
cd /Users/ivankravchyshyn/Documents/VYDYVO_SITE_IvanKravchyshyn/unified-responsive-scaling && python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. The same files were also verified below the repository-style subpath `/unified-responsive-scaling/`.

## Confirmed root causes and implementation

- The homepage used unsupported CSS typed division and clipped a fixed 1536px composition.
- Hymn backgrounds, text and controls mixed percentage/container units with independent transforms, producing divergent scaling and long-line overflow.
- Würde backgrounds and HTML layers used competing responsive calculations, while persisted browser calibration could make final geometry origin-dependent.
- The three pages had no shared height compensation after visual scaling.

`responsive-stage.css` and `responsive-stage.js` now define one 1536px stage contract. The script applies `min(1, innerWidth / 1536)` once to the whole composition and gives the outer shell the resulting visual height. It reruns after fonts are ready, resize and orientation changes. Existing approved child typography corrections remain child transforms; duplicate viewport-responsive transforms were removed. The Hymn text fitter is non-cumulative and only constrains lines that actually exceed the stage.

Production files changed:

- `responsive-stage.css`, `responsive-stage.js`: shared scaling and height compensation.
- `index.html`: homepage stage integration and removal of unsupported CSS division.
- `hymn-of-europe/app.js`, `style.css`, `production-languages.js`: canonical pixel geometry, shared stage integration, font-safe non-cumulative overflow fitting and in-stage HOME control.
- `die-wuerde-des-schaffens/en/index.html`, `de/index.html`: canonical stage integration, deterministic approved corrections and explicit Barlow weights.
- `favicon.ico`: prevents the browser's automatic root favicon 404, using an existing approved asset.
- `RESPONSIVE_SCALING.md`: maintenance contract for future pages and later media links.
- `tests/geometry-audit.js`: reusable bounds and asset audit.
- `reports/`: baseline/corrected screenshots, pixel diffs and this validation record.

## Matrix

EN and DE variants of the homepage, Hymn of Europe and Die Würde des Schaffens were tested at 1536, 1440, 1366, 1280, 1024 and 390 CSS pixels (36 combinations, DPR 1).

Every combination passed:

- `documentElement.scrollWidth === documentElement.clientWidth`;
- zero visible non-decorative glyph/image/control bounds outside the viewport;
- scaled document height matches the design height times the shared scale (rounded to a CSS pixel);
- zero broken page images;
- Barlow Condensed 400, 500 and 600 available through `document.fonts.check`;
- zero relevant console errors or warnings;
- `IVAN KRAVCHYSHYN` stays on one line;
- buttons and project hotspots remain inside the shared stage.

The same six EN/DE routes also passed when served below `/unified-responsive-scaling/`, confirming repository-subpath compatibility.

Only the Chromium-based Codex in-app browser was available. Firefox and WebKit/Safari-compatible engines were not available in this environment and were not claimed as tested.

## Navigation and interaction

- Homepage project cards route to the correct EN/DE project pages.
- Hymn EN/DE switching updates the document language, URL and HOME target; HOME returns to the matching homepage language.
- Würde EN/DE switching and HOME navigation were exercised by real clicks and returned the expected routes.
- The two development-card hotspots match their images (the Hymn image keeps its intentional 15px design bleed).
- All 19 existing media controls remain present, within bounds and pointer-enabled. Their uncertain external trailer/film/photo URLs were deliberately not added.

## Assets and portability

No page HTML, CSS, JavaScript, font or content-image request returned 404. A root favicon was added from an existing approved laurel asset to avoid the browser's automatic `/favicon.ico` 404. No case-colliding tracked paths, filenames with spaces, or non-ASCII/Unicode-normalization filenames remain.

Asset observations for later cleanup only:

- EN and DE Würde `background.jpg` files are byte-identical, as are their `reference.jpg` files.
- Hymn retains separate active background and diagnostic reference trees plus full-composite reference files.
- root `hymn-of-europe.png` and root `style.css` appear unused by production HTML.
- no assets were deleted or reorganized in this task.

## Visual comparison

Full-page baseline and corrected screenshots were captured at 1536px. Corrected review screenshots were also captured at 1366, 1024 and 390px.

Pixel differences above an 8/255 threshold:

- Homepage: 0.977% changed pixels.
- Hymn of Europe: 1.947% changed pixels.
- Würde: 1.951% changed pixels.

The diff images show the dominant change as the 15px right/bottom browser-scrollbar strip removed by the unified viewport treatment. Remaining sparse text differences come from deterministic final Barlow loading and the verified Hymn overflow fitting. Artwork areas remain visually unchanged. Ivan should approve the minor Hymn long-line fitting and the now-deterministic Würde font rendering.

## Proposed second stage after geometry approval (not executed)

1. Obtain Ivan's authoritative trailer, full-film and photo URLs for each existing control.
2. Attach URLs only to the existing anchors, posters and buttons; do not alter their dimensions or positions.
3. Verify EN/DE destinations, external-tab behavior and keyboard activation.
4. Re-run the geometry matrix to confirm that no link wiring changed layout.
5. Re-check every external destination, then prepare a separate review commit or pull request without deploying it.

No pull request was created because this task is intentionally local-only. `main`, GitHub Pages, the custom domain and all remote branches were left unchanged.
