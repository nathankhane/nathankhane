/**
 * types/inspirations.ts — Inspirations canvas data types
 *
 * Used by: data/inspirations.json, components/inspirations/*
 */

export type InspirationContentType =
  | "instagram_caption"
  | "tweet"
  | "pinterest"
  | "quote"
  | "poetry"
  | "writing_short"
  | "writing_long"
  | "stoic";

export type TileSize = "small" | "medium" | "large";

export interface InspirationTile {
  id: string;
  type: InspirationContentType;
  content: {
    /** Primary display text — truncated on tile, full in modal */
    text: string;
    /** Author, source, or essay title (writing_long uses this as the piece title) */
    attribution: string;
    /** Nathan's commentary or expanded context — shown in modal */
    context: string;
    /** Source URL for external links or embeds */
    url: string;
    /** ISO date string */
    date: string;
  };
  display: {
    size: TileSize;
    /** Canvas-space coordinates. (0, 0) = visual center of the canvas. */
    position: { x: number; y: number };
    /** Rotation in degrees. Range: -2.5 to 2.5 for organic mood-board feel. */
    rotation: number;
  };
  meta: {
    tags: string[];
    /** ISO date when this tile was added */
    addedAt: string;
    /** Featured tiles cluster near center and animate in first */
    featured: boolean;
  };
}
