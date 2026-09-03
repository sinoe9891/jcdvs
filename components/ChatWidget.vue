<script setup lang="ts">
type ChatMessage = { role: "assistant" | "user"; content: string; time: string };

// ── Constants ──────────────────────────────────────────────────────────────
const SESSION_KEY = "jcdvs_chat_v1";
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 h en ms
const MAX_MESSAGES_PER_SESSION = 30;

// ── Composables ────────────────────────────────────────────────────────────
const { isOpen, close, toggle } = useChatWidget();

// ── Helpers ────────────────────────────────────────────────────────────────
function nowLabel() {
  return new Date().toLocaleTimeString("es-HN", { hour: "2-digit", minute: "2-digit" });
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content: "¡Hola! Soy El Sabio Valle. Estoy aquí para responder tus preguntas sobre mi vida, mis ideas y mi legado. ¿Qué deseas saber?",
  time: nowLabel(),
};

// ── State ──────────────────────────────────────────────────────────────────
const messages = ref<ChatMessage[]>([WELCOME]);
const input = ref("");
const sending = ref(false);
const errorMsg = ref("");
const sentCount = ref(0);
const listEl = ref<HTMLElement | null>(null);
const typingText = ref("escribiendo .");
const showBubble = ref(false);
const ctaInView = ref(false);

let typingInterval: ReturnType<typeof setInterval> | null = null;
let bubbleTimeout: ReturnType<typeof setTimeout> | null = null;
let ctaObserver: IntersectionObserver | null = null;

// ── Session persistence ────────────────────────────────────────────────────
watch(
  messages,
  (val) => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ messages: val, savedAt: Date.now() }));
    } catch {}
  },
  { deep: true }
);

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(() => {
  // Restore session from localStorage (24 h TTL)
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const session = JSON.parse(raw) as { messages: ChatMessage[]; savedAt: number };
      if (Date.now() - session.savedAt < SESSION_TTL && session.messages?.length) {
        messages.value = session.messages;
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  } catch {}

  // Show speech bubble after 1.5 s
  bubbleTimeout = setTimeout(() => {
    if (!isOpen.value) showBubble.value = true;
  }, 1500);

  // En móvil, el CTA ya ofrece acceso al chat: ocultamos el botón flotante
  // mientras esa tarjeta está visible para que no tape su contenido.
  nextTick(() => {
    const cta = document.querySelector(".chat-cta");
    if (!cta) return;

    ctaObserver = new IntersectionObserver(([entry]) => {
      ctaInView.value = window.matchMedia("(max-width: 639px)").matches && entry.isIntersecting;
    }, { threshold: 0.15 });
    ctaObserver.observe(cta);
  });
});

onUnmounted(() => {
  if (bubbleTimeout) clearTimeout(bubbleTimeout);
  ctaObserver?.disconnect();
  stopTypingAnimation();
});

// ── Typing animation ───────────────────────────────────────────────────────
function startTypingAnimation() {
  const states = ["escribiendo .", "escribiendo ..", "escribiendo ..."];
  let i = 0;
  typingText.value = states[0];
  typingInterval = setInterval(() => {
    i = (i + 1) % states.length;
    typingText.value = states[i];
  }, 420);
}

function stopTypingAnimation() {
  if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
}

// ~40 ms/char, min 1 s, max 4 s
function typingDelay(text: string) {
  return Math.min(Math.max(text.length * 40, 1000), 4000);
}

// ── Scroll ─────────────────────────────────────────────────────────────────
async function scrollToBottom() {
  await nextTick();
  listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: "smooth" });
}

// ── Bubble ─────────────────────────────────────────────────────────────────
function openFromBubble() {
  showBubble.value = false;
  toggle();
}

// ── Send ───────────────────────────────────────────────────────────────────
async function send() {
  const text = input.value.trim();
  if (!text || sending.value) return;

  if (sentCount.value >= MAX_MESSAGES_PER_SESSION) {
    errorMsg.value = "Hemos conversado bastante por ahora — vuelve más tarde para continuar.";
    return;
  }

  errorMsg.value = "";
  messages.value.push({ role: "user", content: text, time: nowLabel() });
  input.value = "";
  sending.value = true;
  sentCount.value++;
  startTypingAnimation();
  scrollToBottom();

  let replyText = "Disculpad, en este momento no puedo responder con claridad. Os ruego intentarlo de nuevo en unos instantes.";

  try {
    const res = await $fetch<{ reply: string }>("/api/chat", {
      method: "POST",
      body: {
        messages: messages.value
          .filter((m) => m.role === "user" || m.role === "assistant")
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content })),
      },
    });
    replyText = res.reply;
  } catch (e) {
    // fallback already set
  }

  await new Promise((resolve) => setTimeout(resolve, typingDelay(replyText)));

  stopTypingAnimation();
  sending.value = false;
  messages.value.push({ role: "assistant", content: replyText, time: nowLabel() });
  scrollToBottom();
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-[100000] font-sans">
    <!-- Launcher + speech bubble -->
    <div v-if="!isOpen && !ctaInView" class="flex flex-col items-end gap-2 chat-float">
      <Transition name="bubble">
        <div
          v-if="showBubble"
          class="chat-bubble relative bg-parchment text-ink text-sm px-4 py-3 shadow-lg border border-gold/40 cursor-pointer select-none"
          style="border-radius: 18px 18px 4px 18px; max-width: 210px;"
          @click="openFromBubble"
        >
          <p class="font-serif leading-snug">¿Tienes alguna pregunta sobre mí?</p>
          <button
            class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-ink text-xs flex items-center justify-center leading-none hover:bg-goldLight"
            aria-label="Cerrar"
            @click.stop="showBubble = false"
          >×</button>
          <span class="bubble-tail"></span>
        </div>
      </Transition>
      <button
        class="w-16 h-16 rounded-full bg-forest border-2 border-goldLight shadow-lg overflow-hidden hover:scale-105 transition-transform"
        aria-label="Abrir chat con El Sabio Valle"
        @click="toggle"
      >
        <NuxtImg
          src="/perfi.png"
          alt=""
          class="w-full h-full object-cover"
          width="64"
          height="64"
        />
      </button>
    </div>

    <!-- Chat panel -->
    <div
      v-if="isOpen"
      class="w-[92vw] max-w-sm h-[32rem] bg-parchment rounded-md shadow-2xl border border-gold/30 flex flex-col overflow-hidden"
      role="dialog"
      aria-label="Chat con José Cecilio del Valle"
    >
      <!-- Header -->
      <div class="bg-forest text-parchment px-4 py-3 flex items-center gap-3">
        <NuxtImg
          src="/perfi.png"
          alt="Retrato de José Cecilio del Valle"
          class="w-10 h-10 rounded-full object-cover border-2 border-goldLight"
          width="40"
          height="40"
        />
        <div class="flex-1 leading-tight">
          <p class="font-serif text-sm text-goldLight">Asistente Virtual</p>
          <p class="text-xs text-parchment/75">El Sabio Valle</p>
        </div>
        <button aria-label="Minimizar chat" class="text-parchment/70 hover:text-parchment" @click="close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      <!-- Messages -->
      <div ref="listEl" class="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-parchment">
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="flex"
          :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded-md px-3 py-2 text-sm leading-snug"
            :class="
              m.role === 'user'
                ? 'bg-gold text-ink rounded-br-none'
                : 'bg-parchment2 text-ink border border-gold/20 rounded-bl-none'
            "
          >
            <p>{{ m.content }}</p>
            <p class="text-[10px] text-muted mt-1">{{ m.time }}</p>
          </div>
        </div>

        <div v-if="sending" class="flex justify-start">
          <div class="bg-parchment2 border border-gold/20 rounded-md rounded-bl-none px-3 py-2 text-sm text-muted font-mono tracking-wide">
            {{ typingText }}
          </div>
        </div>

        <p v-if="errorMsg" class="text-xs text-red-700">{{ errorMsg }}</p>
      </div>

      <!-- Input -->
      <form class="border-t border-gold/20 bg-parchment p-3 flex gap-2" @submit.prevent="send">
        <input
          v-model="input"
          type="text"
          placeholder="Escribe tu pregunta…"
          class="flex-1 bg-white border border-gold/30 rounded-full px-4 py-2 text-sm focus:outline-none"
          :disabled="sending"
        />
        <button
          type="submit"
          class="w-10 h-10 rounded-full bg-forest text-goldLight flex items-center justify-center hover:bg-forest2 disabled:opacity-50"
          :disabled="sending || !input.trim()"
          aria-label="Enviar mensaje"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* ── Floating launcher ─────────────────────────── */
.chat-float {
  animation: chatFloat 3s ease-in-out infinite;
}
.chat-float:hover {
  animation: chatFloat 3s ease-in-out infinite, chatWiggle 0.4s ease-in-out;
}
@keyframes chatFloat {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-7px); }
}
@keyframes chatWiggle {
  0%,100% { transform: rotate(0deg) translateY(var(--float-y, 0px)); }
  25%     { transform: rotate(-4deg); }
  75%     { transform: rotate(4deg); }
}
.bubble-enter-active { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.bubble-leave-active { animation: popOut 0.2s ease-in forwards; }
@keyframes popIn  { from{opacity:0;transform:scale(0.6) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes popOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.7)} }
.bubble-tail {
  position:absolute; bottom:-10px; right:18px;
  width:0; height:0;
  border-left:10px solid transparent;
  border-right:4px solid transparent;
  border-top:10px solid #f1e4d0;
  filter: drop-shadow(0 1px 0 rgba(201,162,39,0.25));
}

@media (max-width: 639px) {
  .chat-bubble {
    display: none;
  }
}
</style>
