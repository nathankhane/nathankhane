"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function AudioArtifact() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const initAudio = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!canvas || !analyser || !dataArray) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, W, H);

    const barCount = dataArray.length;
    const barW = (W / barCount) * 0.7;
    const gap = (W / barCount) * 0.3;

    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i] / 255;
      const barH = Math.max(2, value * H * 0.85);
      const x = i * (barW + gap);
      const y = H - barH;

      const gradient = ctx.createLinearGradient(x, y, x, H);
      gradient.addColorStop(0, `rgba(236,72,153,${0.4 + value * 0.6})`);
      gradient.addColorStop(0.5, `rgba(66,133,244,${0.5 + value * 0.5})`);
      gradient.addColorStop(1, `rgba(66,133,244,0.2)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // Idle animation when paused — low-amplitude shimmer so canvas is never dead
  const drawIdle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const barCount = 128;
    const barW = (W / barCount) * 0.7;
    const gap = (W / barCount) * 0.3;
    const t = Date.now() / 1000;

    for (let i = 0; i < barCount; i++) {
      const value = 0.04 + 0.06 * Math.sin(t * 1.2 + i * 0.25) + 0.03 * Math.sin(t * 2.5 + i * 0.1);
      const barH = Math.max(2, value * H);
      const x = i * (barW + gap);
      const y = H - barH;

      ctx.fillStyle = `rgba(66,133,244,0.18)`;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 1);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(drawIdle);
  }, []);

  // Start/stop canvas loop based on play state
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (isPlaying && analyserRef.current) {
      draw();
    } else {
      drawIdle();
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, draw, drawIdle]);

  // Start idle animation on mount
  useEffect(() => {
    rafRef.current = requestAnimationFrame(drawIdle);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawIdle]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    initAudio();
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      await audioRef.current.play();
    }
  }, [isPlaying, initAudio]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/The_Business_Is_Poetry_Thesis.m4a"
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration((e.target as HTMLAudioElement).duration);
          setIsReady(true);
        }}
        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-mono text-google-blue/60 tracking-[0.25em] uppercase mb-1">
          Artifact II — Audio
        </p>
        <h2 className="text-xl font-display text-cream font-semibold">The Khane Protocol</h2>
        <p className="text-xs font-mono text-cream/40 mt-1">
          The Business Is Poetry Thesis · NotebookLM
        </p>
      </div>

      {/* Visualizer canvas */}
      <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] mb-6">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
        {/* Overlay label */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          {isPlaying && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-pink-500"
              aria-hidden="true"
            />
          )}
          <span className="text-[9px] font-mono text-cream/20 tracking-widest uppercase">
            {isPlaying ? "live" : "paused"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Seek bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-cream/40 w-10 text-right shrink-0">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            disabled={!isReady}
            className="flex-1 h-px appearance-none bg-white/10 rounded-full cursor-pointer accent-google-blue disabled:opacity-30"
            aria-label="Seek"
          />
          <span className="text-[10px] font-mono text-cream/40 w-10 shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        {/* Play/pause */}
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className="w-12 h-12 rounded-full border border-google-blue/40 flex items-center justify-center text-cream hover:border-google-blue hover:bg-google-blue/10 transition-all duration-200 disabled:opacity-30"
            style={isPlaying ? { boxShadow: "0 0 16px rgba(66,133,244,0.3)" } : {}}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
