<script setup lang="ts">
type ChatMessage = { role: "assistant" | "user"; content: string; time: string };

const { isOpen, close, toggle } = useChatWidget();

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
  scrollToBottom();

  try {
    const res = await $fetch<{ reply: string }>("/api/chat", {
      method: "POST",
      body: {
        messages: messages.value
          .filter((m) => m.role === "user" || m.role === "assistant")
          .slice(-12) // keep payload small
          .map((m) => ({ role: m.role, content: m.content })),
      },
    });
    messages.value.push({ role: "assistant", content: res.reply, time: nowLabel() });
  } catch (e) {
    messages.value.push({
      role: "assistant",
      content:
        "Disculpad, en este momento no puedo responder con claridad. Os ruego intentarlo de nuevo en unos instantes.",
      time: nowLabel(),
    });
  } finally {
    sending.value = false;
    scrollToBottom();
  }
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 font-sans">
    <!-- Launcher -->
    <button
      v-if="!isOpen"
      class="w-16 h-16 rounded-full bg-forest border-2 border-goldLight shadow-lg overflow-hidden hover:scale-105 transition-transform"
      aria-label="Abrir chat con El Sabio Valle"
      @click="toggle"
    >
      <NuxtImg
        src="/jose-cecilio-del-valle.png"
        alt=""
        class="w-full h-full object-cover"
        width="64"
        height="64"
      />
    </button>

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
          src="/jose-cecilio-del-valle.png"
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
          <div class="bg-parchment2 border border-gold/20 rounded-md rounded-bl-none px-3 py-2 text-sm text-muted">
            escribiendo…
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
