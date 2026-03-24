/**
 * lib/timeline-data.ts — Parallel timeline data
 *
 * Powers the ParallelTimeline section (Act 1, Section 2).
 * Two tracks scroll in sync: Nate's life (left) and Google milestones (right).
 * Born Feb 14, 2000 — Valentine's Day — the year Google became the world's
 * most-used search engine. CliftonStrength #4: Connectedness. This writes itself.
 *
 * CORRECTED: March 11, 2026 — dates verified by Nathan directly.
 */

export interface TimelineEvent {
  year: number;
  nate?: string;
  google?: string;
  nateDetail?: string;
  googleDetail?: string;
  highlight?: boolean;
}

export const timelineData: TimelineEvent[] = [
  {
    year: 2000,
    nate: "Born — Valentine's Day, Houston TX",
    google: "Becomes world's most-used search engine",
    nateDetail: "February 14, 2000. CliftonStrength #4: Connectedness — born on the day of connection.",
    googleDetail: "AdWords launches. The dot-com bubble peaks. The internet economy ignites.",
    highlight: true,
  },
  {
    year: 2003,
    nate: "Moved to Daytona Beach, Florida",
    nateDetail: "Houston roots, Florida upbringing. Two coasts before age 5.",
  },
  {
    year: 2004,
    google: "Gmail launches (invite-only)",
    googleDetail: "1GB of storage. The world didn't know it needed it.",
  },
  {
    year: 2005,
    nate: "Started writing — music, poetry, screenplays",
    google: "Google Maps. YouTube is founded.",
    nateDetail: "Five years old, already making things. Words before code.",
  },
  {
    year: 2006,
    nate: "Began acting — alone in the mirror",
    google: "Acquires YouTube for $1.65B",
    nateDetail: "Performance as practice. Learning to hold a room before knowing what a room was.",
    googleDetail: "Culture becomes searchable. Video becomes the internet's native language.",
  },
  {
    year: 2008,
    google: "Chrome launches",
  },
  {
    year: 2010,
    google: "Android reaches 100,000 activations per day",
  },
  {
    year: 2012,
    google: "Knowledge Graph: search understands meaning, not just keywords",
  },
  {
    year: 2013,
    nate: "Built my first PC by hand",
    nateDetail: "Sourced every part. Assembled it alone. The moment I stopped being a user and became a builder.",
  },
  {
    year: 2015,
    google: "Alphabet restructuring. Google Photos. AMP.",
  },
  {
    year: 2017,
    google: "Google Home. Waymo spins out.",
  },
  {
    year: 2018,
    nate: "University of Houston — Entrepreneurship & MIS",
    google: "Google Duplex demo — AI makes a phone call",
    nateDetail: "Where business systems meet technology. The education that made everything else make sense.",
    googleDetail: "The world realized AI wasn't just about efficiency. It was about relationship.",
    highlight: true,
  },
  {
    year: 2019,
    google: "Year in Search: 'What is...?' The world is asking deeper questions.",
  },
  {
    year: 2020,
    nate: "Wolff Center for Entrepreneurship. Broke fundraising records.",
    google: "Year in Search: 'How to help.' The world learns it can.",
    nateDetail: "Ranked #1 entrepreneurship program by Princeton Review. Raised $325K — broke the record by 35%.",
    googleDetail: "Search queries become a mirror for collective human resilience.",
    highlight: true,
  },
  {
    year: 2021,
    nate: "Nexus Veterinary Specialists — BD & Marketing",
    google: "LaMDA — language models start to feel alive",
    nateDetail: "Built field marketing playbooks. Launched 3 hospitals. Real revenue, real operations.",
    googleDetail: "The LaMDA sentience debate. AI gets a soul, or at least a press cycle.",
  },
  {
    year: 2022,
    nate: "Graduated UH. Wolff Center. The foundation is set.",
    google: "Google Creative Studio expands. PaLM. Year in Search: togetherness.",
    nateDetail: "BBA in Entrepreneurship & Management Information Systems. Five years of building compressed into one credential.",
  },
  {
    year: 2023,
    nate: "Moved to SF. Capgemini. Khane Creative. First recordings with Matt O'Neill and UM?.",
    google: "Bard (Gemini). YouTube Creative Studio investment accelerates.",
    nateDetail: "June 3rd — landed in San Francisco. UX consulting for Fortune 500 by day. Building Khane Creative and recording studio tracks by night. Befriended a ton of Googlers.",
    googleDetail: "Google's creative teams start speaking the language of builders.",
    highlight: true,
  },
  {
    year: 2024,
    nate: "Co-producing beats. Audio engineering. Managing a band in LA.",
    google: "Gemini everywhere. NotebookLM. Google Creative Fellowship announces.",
    nateDetail: "Started co-producing in Dec 2023 / Jan 2024. Now 4 tracks recorded with Matt O'Neill and UM?. Became a band manager in Los Angeles.",
    googleDetail: "The fellowship is created for exactly this kind of person.",
    highlight: true,
  },
  {
    year: 2025,
    nate: "Founded Bridge — AI Business Intelligence. Left Capgemini.",
    google: "Google I/O: AI as creative collaborator. Year in Search: 'What's possible?'",
    nateDetail: "June 3rd, 2025 — Bridge is born. Built an AI platform from 0 to 1. The same date I moved to SF two years earlier. Patterns everywhere.",
    googleDetail: "Google asks: who belongs in our creative future?",
    highlight: true,
  },
  {
    year: 2026,
    nate: "Founders Basketball SF Chapter Lead. Building toward NYC. This site is the proof.",
    google: "Google Creative Fellowship 2026 applications open. The door is here.",
    nateDetail: "Every project, every session, every build has been parallel. Now it converges.",
    googleDetail: "The fellowship asks for makers. Here's one.",
    highlight: true,
  },
];
