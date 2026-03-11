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
}

// TODO: Add actual audio files to /public/audio/ before launch
// Session recordings from Mike McNeil sessions (2022)
export const tracks: MusicTrack[] = [
  {
    id: "track-01",
    title: "Valentine / Signal",
    description: "The origin. Born on Valentine's Day, 2000.",
    src: "/audio/track-01.mp3",
    duration: 210,
    act: 1,
    credits: "Produced by Nathan Khane Morales",
  },
  {
    id: "track-02",
    title: "Studio Session (ft. Mike McNeil)",
    description: "Where sound engineering met systems thinking.",
    src: "/audio/track-02.mp3",
    duration: 195,
    act: 2,
    credits: "Recorded with Mike McNeil",
  },
  {
    id: "track-03",
    title: "Bridge",
    description: "The future. Architecture as art.",
    src: "/audio/track-03.mp3",
    duration: 180,
    act: 3,
    credits: "Produced by Nathan Khane Morales",
  },
];

export const defaultTrack = tracks[0];
