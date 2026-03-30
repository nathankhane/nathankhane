"use client";

/**
 * InspirationsCanvas — 2D infinite pan/zoom canvas
 *
 * Architecture:
 *   TransformWrapper (react-zoom-pan-pinch) — handles all pan/zoom/touch
 *     └── TransformComponent
 *           └── 4000×3000 inner container
 *                 └── InspirationTile × 12 (absolutely positioned)
 *   RecenterButton   — fixed viewport chrome, resets transform via ref
 *   FirstVisitHint   — one-time "Drag to explore" pill
 *   InspirationModal — Phase 3: wired up but not yet rendered
 *
 * Coordinate system:
 *   Tile position (0, 0) maps to CSS (CANVAS_CENTER_X, CANVAS_CENTER_Y).
 *   centerOnInit: true causes the library to center the 4000×3000 container
 *   in the viewport, which places the (0,0) cluster in view on load.
 */

import { useRef, useState, useCallback } from "react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import rawTiles from "@/data/inspirations.json";
import type { InspirationTile as InspirationTileData } from "@/types/inspirations";
import InspirationTile from "./InspirationTile";
import RecenterButton from "./RecenterButton";
import FirstVisitHint from "./FirstVisitHint";
import InspirationModal from "./InspirationModal";

// ── Canvas constants ───────────────────────────────────────────────────────

const CANVAS_WIDTH = 4000;
const CANVAS_HEIGHT = 3000;
const CANVAS_CENTER_X = CANVAS_WIDTH / 2;   // 2000
const CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;  // 1500

const tiles = rawTiles as InspirationTileData[];

/**
 * Sort tiles by Euclidean distance from (0,0) so the stagger animation
 * fans outward from the center cluster. Closest tile = shortest delay.
 */
const tilesWithDelay = [...tiles]
  .sort((a, b) => {
    const da = Math.hypot(a.display.position.x, a.display.position.y);
    const db = Math.hypot(b.display.position.x, b.display.position.y);
    return da - db;
  })
  .map((tile, i) => ({ ...tile, staggerDelay: i * 0.06 }));

// ── Component ──────────────────────────────────────────────────────────────

export default function InspirationsCanvas() {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const dismissHintRef = useRef<(() => void) | null>(null);

  // Phase 3: selectedTile state wired to InspirationModal
  const [selectedTile, setSelectedTile] = useState<InspirationTileData | null>(null);

  const handleRecenter = useCallback(() => {
    transformRef.current?.resetTransform(600);
  }, []);

  /** Dismiss the first-visit hint on any intentional canvas interaction */
  const handleInteraction = useCallback(() => {
    dismissHintRef.current?.();
  }, []);

  const handleSelectTile = useCallback((tile: InspirationTileData) => {
    dismissHintRef.current?.();
    setSelectedTile(tile);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-ink">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.3}
        maxScale={2.0}
        centerOnInit
        limitToBounds={false}
        smooth
        wheel={{ step: 0.05, smoothStep: 0.001 }}
        panning={{ velocityDisabled: false }}
        velocityAnimation={{ sensitivity: 1, animationTime: 400, equalToMove: true }}
        doubleClick={{ step: 0.5 }}
        onPanningStart={handleInteraction}
        onPinchingStart={handleInteraction}
        onWheelStart={handleInteraction}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            willChange: "transform",
          }}
        >
          {/* Inner canvas — all tiles positioned absolutely within */}
          <div
            style={{
              position: "relative",
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
            }}
          >
            {tilesWithDelay.map((tile) => (
              <InspirationTile
                key={tile.id}
                tile={tile}
                staggerDelay={tile.staggerDelay}
                canvasOrigin={{ x: CANVAS_CENTER_X, y: CANVAS_CENTER_Y }}
                onSelect={handleSelectTile}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* ── Viewport-fixed UI chrome (outside TransformWrapper) ── */}
      <RecenterButton onRecenter={handleRecenter} />

      <FirstVisitHint
        onMountDismiss={(fn) => {
          dismissHintRef.current = fn;
        }}
      />

      {/* Tile detail modal */}
      {selectedTile && (
        <InspirationModal
          tile={selectedTile}
          onClose={() => setSelectedTile(null)}
        />
      )}
    </div>
  );
}
