# Homepage media links

All homepage poster and button destinations are stored in `media-links-data.js`. Each record has a stable `id`, project name, media type, normalized URL, `ACTIVE` or `LATER` status, and selectors for its approved poster and button.

To activate a future item, add a normalized YouTube or gallery URL to its `url` field and change `status` from `LATER` to `ACTIVE`. Do not edit its target selectors unless the approved HTML asset itself was renamed. YouTube URLs must use only `https://www.youtube.com/watch?v=VIDEO_ID`, without `t`, `start`, `time_continue`, share or tracking parameters.

Test both the poster and its existing button on `index.html?lang=en` and `index.html?lang=de`. ACTIVE targets must open the same URL in a new tab. LATER targets must have no anchor or `href` and must retain `aria-disabled="true"`.

Future link maintenance must not change `responsive-stage.js`, `responsive-stage.css`, coordinates, transforms, artwork, button labels, typography, stage heights or page-specific scaling code.
