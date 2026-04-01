/**
 * lib/music-tracks.ts — Audio track metadata
 *
 * Referenced by AudioPlayer and AudioEngineer section.
 * Files should be placed at /public/audio/*.mp3
 * IMPORTANT: All tracks must be added manually — no placeholders shipped.
 */

export interface MusicTrack {
  id: string;
  title: string;
  description: string;
  src: string;           // relative path from /public/
  duration: number;      // seconds (approximate)
  act: 1 | 2 | 3;       // which act of the narrative this track accompanies
  bpm?: number;
  credits?: string;
  startAt?: number;      // seek to this position (seconds) on every load
}

export const tracks: MusicTrack[] = [
  {
    id: "track-03",
    title: "Love Songs 4 U",
    description: "Written, Performed, and co-composed by Nathan Khane Morales",
    src: "/audio/Love Songs 4 U.mp3",
    duration: 240,
    act: 3,
    credits: "Written, Performed, and co-composed by Nathan Khane Morales",
    startAt: 35,
  },
  {
    id: "track-02",
    title: "wastin' time with u",
    description: "Written, Recorded, and Engineered by Nathan Khane Morales",
    src: "/audio/wastin' time with u DEMO (Master).mp3",
    duration: 210,
    act: 2,
    credits: "Written, Recorded, and Engineered by Nathan Khane Morales",
  },
  {
    id: "track-01",
    title: "Cruise Freestyle",
    description: "Performed and Co-produced by Nathan Khane Morales",
    src: "/audio/Booze Cruise Freestyle.mp3",
    duration: 180,
    act: 1,
    credits: "Performed and Co-produced by Nathan Khane Morales",
  },
];

export const defaultTrack = tracks[0];
