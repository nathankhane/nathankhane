/**
 * Canonical social links — single source of truth for all social URLs.
 * Update here to change links site-wide.
 */

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nathan-khane-morales/" },
  { label: "TikTok", href: "https://www.tiktok.com/@nathankmorales" },
  { label: "X", href: "https://x.com/nathankmo" },
  { label: "Instagram", href: "https://www.instagram.com/nathankmorales/" },
  { label: "Substack", href: "https://nathankhane.substack.com/?utm_campaign=profile_chips" },
  { label: "YouTube", href: "https://www.youtube.com/@nathankhane" },
  { label: "Spotify", href: "https://open.spotify.com/user/mastanathan?si=fac979b133e642c5" },
] as const;

/** TikTok profile URL for CTAs (e.g. SocialArchitect). Derive handle from href if needed. */
export const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@nathankmorales";
export const TIKTOK_HANDLE = "@nathankmorales";
