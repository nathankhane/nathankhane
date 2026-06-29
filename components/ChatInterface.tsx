/**
 * ChatInterface — AI agent conversation UI for AgentSidebar and artifacts
 *
 * Streams responses from the Gemini-powered /api/chat endpoint.
 * Shows typing indicator during stream. Maintains conversation history.
 * Graceful fallback if API is unavailable.
 */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What's your creative philosophy?",
  "Tell me about Bridge",
  "Why the Video Storyteller role?",
  "What kind of music do you make?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 0.15, 0.3].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-google-blue/60"
          style={{
            animation: `typing-dot 1.2s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Browser SpeechRecognition API — not in TypeScript's lib.dom.d.ts by default
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

interface ChatInterfaceProps {
  initialQuery?: string | null;
  onInitialQueryConsumed?: () => void;
}

export default function ChatInterface({ initialQuery, onInitialQueryConsumed }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastSentQueryRef = useRef<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined =
      (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
      (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from({ length: event.results.length }, (_, i) => event.results[i][0].transcript).join("");
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

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setShowSuggestions(false);
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    // Placeholder for streaming response
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

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

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content ?? parsed.delta?.text ?? "";
                if (delta) {
                  accumulated += delta;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: accumulated } : m
                    )
                  );
                }
              } catch {
                // Non-JSON line, skip
              }
            }
          }
        }
      }

      // If no content came through, show fallback
      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "I'm Nate's AI — I seem to be having trouble connecting right now. Try again in a moment, or reach out directly at the links below." }
              : m
          )
        );
        setIsUnavailable(true);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setIsUnavailable(true);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I'm temporarily offline — the API is unavailable right now. Check back soon, or connect with Nate directly via the links below." }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming]);

  // Easter Egg #13 — auto-send query that came in via Cmd+K search overlay
  useEffect(() => {
    if (!initialQuery || lastSentQueryRef.current === initialQuery) return;
    lastSentQueryRef.current = initialQuery;
    sendMessage(initialQuery);
    onInitialQueryConsumed?.();
  // sendMessage is stable via useCallback; initialQuery changing is the only trigger we want
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col h-[480px] max-h-[55vh] sm:max-h-[60vh] rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
        <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
        <span className="text-sm font-mono text-cream/70">Ask Nate&apos;s AI</span>
        {isUnavailable && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-cream/60 font-mono">offline</span>
            <button
              onClick={() => { setIsUnavailable(false); inputRef.current?.focus(); }}
              className="text-xs text-google-blue/60 hover:text-google-blue font-mono transition-colors"
              aria-label="Retry connection"
            >
              retry
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
        {/* Initial state */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-6"
          >
            <p className="text-cream/70 text-sm leading-relaxed">
              I&apos;m trained on Nate&apos;s background, projects, and creative philosophy.<br />
              Ask me anything.
            </p>
          </motion.div>
        )}

        {/* Suggested prompts */}
        <AnimatePresence>
          {showSuggestions && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"
            >
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left text-xs text-cream/70 hover:text-cream border border-white/10 hover:border-google-blue/40 rounded-xl px-3 py-2.5 transition-all duration-200 bg-surface-elevated/50"
                >
                  {prompt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat messages */}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-google-blue/15 text-cream border border-google-blue/25 rounded-br-sm"
                  : "bg-surface-elevated text-cream/90 border border-white/10 rounded-bl-sm"
              }`}
            >
              {msg.content === "" && msg.role === "assistant" ? (
                <TypingIndicator />
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </motion.div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Powered by */}
      <div className="shrink-0 flex items-center justify-center gap-1.5 py-1.5 border-t border-white/[0.06]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" fillOpacity="0.7"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" fillOpacity="0.7"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" fillOpacity="0.7"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" fillOpacity="0.7"/>
        </svg>
        <span className="text-[9px] font-mono text-cream/50 tracking-widest uppercase">
          Powered by Gemini 2.5
        </span>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Nate…"
            rows={1}
            disabled={isStreaming}
            className="flex-1 resize-none bg-transparent text-sm text-cream placeholder-cream/50 outline-none py-1.5 max-h-24 scrollbar-thin"
            style={{ lineHeight: "1.5" }}
            aria-label="Chat input"
          />
          {/* Mic button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isStreaming}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 ${
              isListening
                ? "bg-pink-500/20 border border-pink-500/60 text-pink-400"
                : "border border-white/20 text-cream/50 hover:text-cream/80 hover:border-white/40"
            }`}
            aria-label={isListening ? "Stop listening" : "Voice input"}
            style={isListening ? { boxShadow: "0 0 10px color-mix(in srgb, #ec4899 40%, transparent), 0 0 20px color-mix(in srgb, #ec4899 20%, transparent)" } : {}}
          >
            {isListening ? (
              <span className="flex gap-[2px] items-end h-4">
                {[0, 0.1, 0.2].map((d) => (
                  <span
                    key={d}
                    className="w-[2px] rounded-full bg-pink-400"
                    style={{ animation: `typing-dot 0.8s ease-in-out ${d}s infinite`, height: "10px" }}
                  />
                ))}
              </span>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          {isStreaming ? (
            <button
              onClick={handleStop}
              className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
              aria-label="Stop generation"
            >
              <span className="w-3 h-3 bg-current rounded-sm" />
            </button>
          ) : (
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="shrink-0 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center disabled:opacity-30 hover:bg-google-blue/80 transition-colors"
              aria-label="Send message"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#0A0E17">
                <path d="M1 11L11 6 1 1v3.5l7 1.5-7 1.5V11z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
