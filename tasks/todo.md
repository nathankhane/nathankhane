## Fellowship Site Archive Plan

- [x] Confirm exact archive target and exclude local-only/untracked workspace files.
- [x] Commit the current tracked site snapshot on `main` or an archive branch.
- [x] Create a permanent archive branch and tag for the Google Fellowship / Business Is Poetry site.
- [x] Push the archive branch/tag to GitHub.
- [x] Set up or document a separate Vercel project for the archive branch.
- [ ] Attach a subdomain such as `fellowship.nathankhane.com` to the archive deployment.
- [x] Verify the archived site builds and remains reachable independently of future root redesign work.

## Review

- Created archive branch `archive/google-fellowship-site`.
- Committed the current tracked site snapshot as `7a72a8b`.
- Created and pushed tag `google-fellowship-site-2026-06-29`.
- Pushed branch `archive/google-fellowship-site` to GitHub.
- Left untracked local-only folders/files out of the archive snapshot.
- Verified archive branch with `npm run lint`, `npm run type-check`, and `npm run build`.
- Documented the recommended separate Vercel project setup in `tasks/fellowship-archive-deployment.md`.
- Remaining external step: create the separate Vercel project from the archive branch and attach `fellowship.nathankhane.com` or the chosen subdomain.
