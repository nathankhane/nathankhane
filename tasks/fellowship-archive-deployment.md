# Fellowship Site Archive Deployment

## Preserved Snapshot

- Branch: `archive/google-fellowship-site`
- Tag: `google-fellowship-site-2026-06-29`
- Commit: `7a72a8b`
- Repo: `git@github.com:nathankhane/nathankhane.git`

This branch preserves the current Google Creative Fellowship / Business Is Poetry site so `main` can be redesigned into the new personal site.

## Recommended Live URL

Use a subdomain, not a slug:

- Preferred: `fellowship.nathankhane.com`
- Alternate: `businessispoetry.nathankhane.com`

A separate subdomain keeps the current site as a portfolio artifact without forcing the future root site to carry this app's routes, hero frame system, audio player, AI agent, and artifact subdomain behavior.

## Vercel Setup

Create a separate Vercel project for the archive:

1. In Vercel, add a new project from the existing `nathankhane/nathankhane` GitHub repo.
2. Set the production branch to `archive/google-fellowship-site`.
3. Use the same framework settings as the current project:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Install command: default npm install
   - Output directory: Next.js default
4. Copy required environment variables from the current project:
   - `GOOGLE_AI_API_KEY`
5. Add the custom domain:
   - `fellowship.nathankhane.com`
6. Leave the existing root project on `main`, so `nathankhane.com` can become the redesigned personal site.

## Verification

Archive branch verification passed locally:

- `npm run lint`
- `npm run type-check`
- `npm run build`

`npm run build` requires network access for `next/font` to fetch Google Fonts.
