#!/usr/bin/env node
/**
 * Capture a screenshot of the Bridge hero section (bridgenow.ai).
 * Saves to public/images/bridge-screenshot.png for use in SystemsArchitect.
 * Run: node scripts/capture-bridge-screenshot.mjs
 * Requires: npm install -D playwright && npx playwright install chromium
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");
const outPath = join(outDir, "bridge-screenshot.png");

async function main() {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Match the design: desktop viewport for the hero
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto("https://bridgenow.ai", {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Full viewport screenshot of the bridge section (hero)
  await page.screenshot({
    path: outPath,
    fullPage: false,
  });

  await browser.close();
  console.log("Screenshot saved:", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
