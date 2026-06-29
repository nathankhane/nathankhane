"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ARTIFACT_PROMPTS = [
  "Make the case for Nate at Google Creative",
  "What would Nate build at YouTube Studio?",
  "Tell me about Bridge and Morális",
  "How does Nate think about storytelling?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 0.15, 0.3].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-google-blue/60"
          style={{ animation: `typing-dot 1.2s ease-in-out ${delay}s infinite` }}
        />
      ))}
    </div>
  );
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}
interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

export default function ArtifactBrainFull() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setShowSuggestions(false);
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: trimmed },
          ],
        }),
        signal: abortRef.current.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value, { stream: true }).split("\n");
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content ?? parsed.delta?.text ?? "";
              if (delta) {
                accumulated += delta;
                setMessages((prev) =>
                  prev.map((m) => m.id === assistantId ? { ...m, content: accumulated } : m)
                );
              }
            } catch { /* skip non-JSON */ }
          }
        }
      }
      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) => m.id === assistantId
            ? { ...m, content: "I'm having trouble connecting right now. Try again in a moment." }
            : m)
        );
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) => m.id === assistantId
          ? { ...m, content: "Temporarily offline — check back soon." }
          : m)
      );
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming]);

  const startListening = useCallback(() => {
    const API: SpeechRecognitionConstructor | undefined =
      (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
      (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!API) return;
    const recognition = new API();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from({ length: e.results.length }, (_, i) => e.results[i][0].transcript).join("");
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-4 shrink-0">
        <p className="text-[10px] font-mono text-google-blue/60 tracking-[0.25em] uppercase mb-1">
          Artifact I — AI
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-xl leading-none select-none"
            style={{ filter: "drop-shadow(0 0 6px rgba(236,72,153,0.9)) drop-shadow(0 0 14px rgba(236,72,153,0.5))" }}
            aria-hidden="true"
          >
            🧠
          </span>
          <h2 className="text-xl font-display text-cream font-semibold">Nate&apos;s AI Brain</h2>
        </div>
        <p className="text-xs font-mono text-cream/40 mt-1 flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z" fill="url(#gemini-grad)" />
            <defs>
              <linearGradient id="gemini-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#8AB4F8" />
              </linearGradient>
            </defs>
          </svg>
          Powered by Gemini 2.5 · Trained on Nathan&apos;s voice
        </p>
      </div>

      {/* Chat box */}
      <div className="flex-1 min-h-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] shrink-0">
          <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
          <span className="text-xs font-mono text-cream/50">Ask Nate&apos;s AI</span>
          <div className="ml-auto flex items-center gap-1.5">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" fillOpacity="0.6"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" fillOpacity="0.6"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" fillOpacity="0.6"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" fillOpacity="0.6"/>
            </svg>
            <span className="text-[9px] font-mono text-cream/30 tracking-widest uppercase">Gemini 2.5</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 min-h-0">
          {messages.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cream/50 text-sm leading-relaxed text-center pt-4"
            >
              I&apos;m trained on Nate&apos;s voice, background, and philosophy.<br />Ask me anything.
            </motion.p>
          )}

          <AnimatePresence>
            {showSuggestions && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"
              >
                {ARTIFACT_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-left text-xs text-cream/60 hover:text-cream border border-white/10 hover:border-google-blue/40 rounded-xl px-3 py-2.5 transition-all duration-200 bg-surface-elevated/30"
                  >
                    {p}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-google-blue/15 text-cream border border-google-blue/25 rounded-br-sm"
                    : "bg-surface-elevated text-cream/90 border border-white/10 rounded-bl-sm"
                }`}
              >
                {msg.content === "" && msg.role === "assistant"
                  ? <TypingIndicator />
                  : <p className="whitespace-pre-wrap">{msg.content}</p>
                }
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-white/[0.06] px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
              }}
              placeholder="Ask anything about Nate…"
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent text-sm text-cream placeholder-cream/40 outline-none py-1.5 max-h-24"
              style={{ lineHeight: "1.5" }}
              aria-label="Chat input"
            />
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isStreaming}
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 ${
                isListening
                  ? "bg-pink-500/20 border border-pink-500/60 text-pink-400"
                  : "border border-white/20 text-cream/50 hover:text-cream/80 hover:border-white/40"
              }`}
              style={isListening ? { boxShadow: "0 0 10px rgba(236,72,153,0.4)" } : {}}
              aria-label={isListening ? "Stop listening" : "Voice input"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isStreaming ? (
              <button
                onClick={() => { abortRef.current?.abort(); setIsStreaming(false); }}
                className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
                aria-label="Stop"
              >
                <span className="w-3 h-3 bg-current rounded-sm" />
              </button>
            ) : (
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="shrink-0 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center disabled:opacity-30 hover:bg-google-blue/80 transition-colors"
                aria-label="Send"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="#0A0E17">
                  <path d="M1 11L11 6 1 1v3.5l7 1.5-7 1.5V11z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
