/**
 * ChatInterface — AI agent conversation UI for AgentCTA section
 *
 * Streams responses from /api/chat endpoint (Anthropic Claude).
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
  "Why the Writer/AI Prompt Artist role?",
  "What kind of music do you make?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 0.15, 0.3].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-gold/60"
          style={{
            animation: `typing-dot 1.2s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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
    <div className="flex flex-col h-[480px] max-h-[60vh] rounded-2xl border border-white/10 bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-sm font-mono text-cream/70">Ask Nate&apos;s AI</span>
        {isUnavailable && (
          <span className="ml-auto text-xs text-cream/30 font-mono">offline</span>
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
            <p className="text-cream/40 text-sm leading-relaxed">
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
                  className="text-left text-xs text-cream/50 hover:text-cream border border-white/10 hover:border-gold/40 rounded-xl px-3 py-2.5 transition-all duration-200 bg-surface-elevated/50"
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
                  ? "bg-gold/20 text-cream border border-gold/20 rounded-br-sm"
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
            className="flex-1 resize-none bg-transparent text-sm text-cream placeholder-cream/30 outline-none py-1.5 max-h-24 scrollbar-thin"
            style={{ lineHeight: "1.5" }}
            aria-label="Chat input"
          />
          {isStreaming ? (
            <button
              onClick={handleStop}
              className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/50 hover:text-cream transition-colors"
              aria-label="Stop generation"
            >
              <span className="w-3 h-3 bg-current rounded-sm" />
            </button>
          ) : (
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="shrink-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center disabled:opacity-30 hover:bg-gold/80 transition-colors"
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
