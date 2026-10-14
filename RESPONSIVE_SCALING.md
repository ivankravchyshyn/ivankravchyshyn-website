# Unified responsive scaling

All production pages use a 1536 CSS-pixel design coordinate system. `responsive-stage.js` computes `min(1, window.innerWidth / 1536)` and applies it once to the complete stage. The surrounding shell receives the scaled height, so document scrolling ends at the visible bottom after resize or orientation changes.

The transform belongs only to the stage. Existing child `scaleX`/`scaleY` values are approved typography corrections and remain intact; viewport-dependent child scaling was removed. Artwork, text, navigation, posters, buttons and hotspots therefore share the same coordinate system.

To adopt the engine on a future page, load `responsive-stage.css`, add `data-responsive-stage` and `data-design-height` to the 1536px stage, then load `responsive-stage.js` after the stage exists. Existing hotspots remain aligned because they are stage children. Later trailer, film and photo URLs can be attached to those existing anchors/buttons without changing positions or dimensions.

Production Würde pages always start from committed approved corrections. Browser `localStorage` calibration is read only in `?diagnostic=1`, preventing origin-specific layout drift.
