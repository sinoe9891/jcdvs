<script setup lang="ts">
type ChatMessage = { role: "assistant" | "user"; content: string; time: string };

const { isOpen, close, toggle } = useChatWidget();

const showBubble = ref(false);
let bubbleTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  bubbleTimeout = setTimeout(() => {
    if (!isOpen.value) showBubble.value = true;
  }, 1500);
});

onUnmounted(() => {
  if (bubbleTimeout) clearTimeout(bubbleTimeout);
});

function openFromBubble() {
  showBubble.value = false;
  toggle();
}

const messages = ref<ChatMessage[]>([
  {
    role: "assistant",
    content:
      "¡Hola! Soy El Sabio Valle. Estoy aquí para responder tus preguntas sobre mi vida, mis ideas y mi legado. ¿Qué deseas saber?",
    time: nowLabel(),
  },
]);

const input = ref("");
const sending = ref(false);
const errorMsg = ref("");
const listEl = ref<HTMLElement | null>(null);
const typingText = ref("escribiendo .");

let typingInterval: ReturnType<typeof setInterval> | null = null;

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

// ~40ms per character, min 1 s, max 4 s
function typingDelay(text: string) {
  return Math.min(Math.max(text.length * 40, 1000), 4000);
}

// Soft client-side guardrail against runaway usage — the real limit
// lives server-side in /server/api/chat.post.ts, this just gives fast
// feedback without a round trip.
const MAX_MESSAGES_PER_SESSION = 30;
const sentCount = ref(0);

function nowLabel() {
  return new Date().toLocaleTimeString("es-HN", { hour: "2-digit", minute: "2-digit" });
}

async function scrollToBottom() {
  await nextTick();
  listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: "smooth" });
}

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
    // fallback already set above
  }

  // Wait proportional to reply length so it feels like Valle is typing
  await new Promise((resolve) => setTimeout(resolve, typingDelay(replyText)));

  stopTypingAnimation();
  sending.value = false;
  messages.value.push({ role: "assistant", content: replyText, time: nowLabel() });
  scrollToBottom();
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 font-sans">
    <!-- Launcher + speech bubble -->
    <div v-if="!isOpen" class="flex flex-col items-end gap-2">
      <Transition name="bubble">
        <div
          v-if="showBubble"
          class="relative bg-parchment text-ink text-sm px-4 py-3 shadow-lg border border-gold/40 cursor-pointer select-none"
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
      v-else
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
</style>
