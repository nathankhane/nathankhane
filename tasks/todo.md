## Headshot Static Asset Plan

- [x] Confirm framework/static serving behavior and target public path.
- [x] Add headshot files under `public/assets/headshots/` without modifying image bytes.
- [x] Add crawler disallow rule for the headshot asset folder.
- [x] Verify direct image URLs return raw image MIME types locally.
- [x] Commit the asset and robots changes.

## Review

- Confirmed this is a Next.js site and the images live under `public/assets/headshots/`.
- Verified local direct responses returned `image/png`, `image/png`, and `image/jpeg` for the three files.
- Confirmed the headshot paths are not linked from site content; only `public/robots.txt` disallows crawler access to the folder.
- `npm run build` did not complete in this environment; it hung after invoking `next build` with no additional output, so MIME verification used a static server rooted at `public/`.

