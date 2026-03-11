/**
 * lib/timeline-data.ts — Parallel timeline data
 *
 * Powers the ParallelTimeline section (Act 1, Section 2).
 * Two tracks scroll in sync: Nate's life (left) and Google milestones (right).
 * Born Feb 14, 2000 — Valentine's Day — the year Google became the world's
 * most-used search engine. CliftonStrength #4: Connectedness. This writes itself.
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
    year: 2004,
    google: "Gmail launches (invite-only)",
    googleDetail: "1GB of storage. The world didn't know it needed it.",
  },
  {
    year: 2005,
    nate: "First exposure to music production",
    google: "Google Maps. YouTube is founded.",
    nateDetail: "Houston has a sound. You either hear it or you don't.",
  },
  {
    year: 2006,
    google: "Acquires YouTube for $1.65B",
    googleDetail: "Culture becomes searchable. Video becomes the internet's native language.",
  },
  {
    year: 2008,
    nate: "First system I ever designed: my class schedule",
    google: "Chrome launches",
    nateDetail: "Not school-mandated. I rearranged everything to optimize energy, not compliance.",
  },
  {
    year: 2010,
    google: "Android reaches 100,000 activations per day",
  },
  {
    year: 2012,
    nate: "Started making music — first beats, first loops",
    google: "Knowledge Graph: search understands meaning, not just keywords",
    nateDetail: "A beat is a system. Kick, snare, hat — architecture before melody.",
  },
  {
    year: 2015,
    nate: "First entrepreneurial idea: what if the campus had a better map?",
    google: "Alphabet restructuring. Google Photos. AMP.",
    nateDetail: "The idea was bad. The instinct was right.",
  },
  {
    year: 2017,
    nate: "Started studying MIS — Management Information Systems",
    google: "Google Home. Waymo spins out.",
    nateDetail: "Where business systems meet technology. I didn't know it had a name until then.",
  },
  {
    year: 2018,
    nate: "UX consulting internship — Fortune 500 clients via Capgemini",
    google: "Google Duplex demo — AI makes a phone call",
    nateDetail: "I sat in rooms where billion-dollar decisions were made. I was 18.",
    googleDetail: "The world realized AI wasn't just about efficiency. It was about relationship.",
  },
  {
    year: 2019,
    nate: "Recorded first studio sessions. Started building audiences.",
    google: "Year in Search: 'What is...?' The world is asking deeper questions.",
    nateDetail: "Studio time with engineers who worked with Travis Scott, Don Toliver.",
  },
  {
    year: 2020,
    nate: "Pandemic. Went deeper on everything.",
    google: "Year in Search: 'How to help.' The world learns it can.",
    nateDetail: "No commute means no excuse. Built more. Read more. Made more music.",
    googleDetail: "Search queries become a mirror for collective human resilience.",
  },
  {
    year: 2021,
    nate: "First real build: a tool for tracking creative project pipelines",
    google: "LaMDA — language models start to feel alive",
    nateDetail: "Ugly. Worked. Taught me that shipping beats perfecting.",
    googleDetail: "The Lamda sentience debate. AI gets a soul, or at least a press cycle.",
  },
  {
    year: 2022,
    nate: "Recorded with Mike McNeil (Travis Scott, Don Toliver connection)",
    google: "Google Creative Studio expands. PaLM. Year in Search: togetherness.",
    nateDetail: "The session lasted 14 hours. We made something real.",
    highlight: true,
  },
  {
    year: 2023,
    nate: "Founded Bridge — AI Business Intelligence for founders",
    google: "Bard (Gemini). YouTube Creative Studio investment accelerates.",
    nateDetail: "The insight: founders don't need more data. They need signal.",
    googleDetail: "Google's creative teams start speaking the language of builders.",
    highlight: true,
  },
  {
    year: 2024,
    nate: "Founded Morális. SF Chapter Lead, Founders Basketball.",
    google: "Gemini everywhere. NotebookLM. Google Creative Fellowship announces.",
    nateDetail: "Morális: AI automation so small businesses can move like enterprises.",
    googleDetail: "The fellowship is created for exactly this kind of person.",
    highlight: true,
  },
  {
    year: 2025,
    nate: "Building toward NYC. This site is the proof.",
    google: "Google I/O: AI as creative collaborator. Year in Search: 'What's possible?'",
    nateDetail: "Every project, every session, every build has been parallel. Now it converges.",
    googleDetail: "Google asks: who belongs in our creative future?",
    highlight: true,
  },
];
