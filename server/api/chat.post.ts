import { CHAT_SYSTEM_PROMPT } from "../utils/chatSystemPrompt";

type IncomingMessage = { role: "user" | "assistant"; content: string };

// --- Very small in-memory rate limiter -------------------------------------
// Good enough as a first line of defense against runaway token spend.
// NOTE: on serverless platforms (Vercel) each instance has its own memory,
// so this is best-effort, not a hard guarantee. For stricter control, add
// Vercel's Edge Config / KV or a proper rate-limiting service.
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Falta configurar OPENAI_API_KEY en las variables de entorno del servidor.",
    });
  }

  const ip =
    getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ||
    event.node.req.socket.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: "Demasiadas preguntas seguidas — espera un minuto antes de continuar.",
    });
  }

  const body = await readBody<{ messages: IncomingMessage[] }>(event);
  const incoming = Array.isArray(body?.messages) ? body.messages : [];

  // Keep the payload small and bounded — also caps token spend per request.
  const trimmed = incoming.slice(-12).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: String(m.content || "").slice(0, 1500),
  }));

  const response = await $fetch<any>("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.openaiApiKey}`,
      "Content-Type": "application/json",
    },
    body: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 400, // caps output token cost per response
      messages: [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...trimmed],
    },
  }).catch((err) => {
    throw createError({
      statusCode: 502,
      statusMessage: "No se pudo contactar al servicio de IA. Intenta de nuevo en un momento.",
    });
  });

  const reply =
    response?.choices?.[0]?.message?.content?.trim() ||
    "Disculpad, no logro dar forma a una respuesta en este instante.";

  return { reply };
});
