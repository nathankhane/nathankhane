/**
 * app/api/chat/route.ts — Google Gemini streaming endpoint
 *
 * Streams Gemini responses for the AI agent in AgentCTA section.
 * Using Google's own model is intentional — the fellowship application
 * is itself built on Google's AI stack.
 *
 * Uses AGENT_SYSTEM_PROMPT from lib/agent-prompt.ts.
 * Rate limiting via simple in-memory counter (upgrade to Redis for production).
 * Graceful error handling — never breaks the page.
 *
 * Env var: GOOGLE_AI_API_KEY (set in Vercel + .env.local)
 * Get key at: https://aistudio.google.com/apikey
 */
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AGENT_SYSTEM_PROMPT } from "@/lib/agent-prompt";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY ?? "");

// Simple in-memory rate limiting (per-IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;        // requests per window
const RATE_WINDOW = 60_000;   // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again in a minute." },
      { status: 429 }
    );
  }

  // Validate API key is configured
  if (!process.env.GOOGLE_AI_API_KEY) {
    return NextResponse.json(
      { error: "AI agent not configured." },
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid messages");
    }
    // Limit conversation history to last 20 messages
    if (messages.length > 20) {
      messages = messages.slice(-20);
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: AGENT_SYSTEM_PROMPT,
    });

    // Gemini uses "model" instead of "assistant" for AI turns
    // History is everything except the final user message
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.content);

    // Stream as SSE — same format as Anthropic endpoint so ChatInterface needs no changes
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              const data = JSON.stringify({
                choices: [{ delta: { content: text } }],
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch {
          const errData = JSON.stringify({ error: "Stream error" });
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("[/api/chat] Gemini error:", err);
    return NextResponse.json(
      { error: "AI agent temporarily unavailable." },
      { status: 503 }
    );
  }
}
