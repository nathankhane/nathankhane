"use client";
import dynamic from "next/dynamic";

// ssr: false must live in a Client Component — GSAP ScrollTrigger uses window/document
const HeroScrollCanvas = dynamic(
  () => import("@/components/sections/HeroScrollCanvas"),
  { ssr: false }
);

export default HeroScrollCanvas;
