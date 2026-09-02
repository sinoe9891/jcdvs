<script setup lang="ts">
const { open: openChat } = useChatWidget();

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "José Cecilio del Valle",
        alternateName: "El Sabio Valle",
        birthDate: "1780-11-22",
        birthPlace: "Choluteca, Honduras",
        deathDate: "1834-03-02",
        deathPlace: "Guatemala",
        description:
          "Filósofo, político, abogado y periodista hondureño, redactor principal del Acta de Independencia de Centroamérica de 1821.",
      }),
    },
  ],
});

const timeline = [
  { year: "1780", text: "Nace el 22 de noviembre en Choluteca, en la Capitanía General de Guatemala." },
  { year: "1802", text: "Estudia en la Universidad de San Carlos, en Guatemala; destaca por su disciplina y amor al conocimiento." },
  { year: "1821", text: "Redacta el Acta de Independencia de Centroamérica el 15 de septiembre." },
  { year: "1834", text: "Fallece el 2 de marzo en Guatemala, poco después de ser electo presidente de la Federación Centroamericana." },
];

const ideas = [
  {
    title: "Economía Política",
    text: "Defendió el trabajo como origen de toda riqueza y estudió a fondo a Adam Smith, David Ricardo y Jeremy Bentham.",
  },
  {
    title: "Libre Comercio",
    text: "Sostuvo que el comercio de bienes básicos debía ser libre, como motor de prosperidad para los pueblos.",
  },
  {
    title: "Educación",
    text: "Creía que la educación forma ciudadanos libres, responsables y capaces de construir repúblicas sólidas.",
  },
  {
    title: "Unidad Centroamericana",
    text: "Visionó una Centroamérica unida y próspera, aprovechando su riqueza natural y el talento de su gente.",
  },
];

const form = reactive({ name: "", email: "", message: "", honey: "" });
const status = ref<"idle" | "sending" | "sent" | "error">("idle");

async function submitForm() {
  if (form.honey) return; // honeypot — silently drop bots
  status.value = "sending";
  try {
    await $fetch("/api/contact", { method: "POST", body: form });
    status.value = "sent";
    form.name = form.email = form.message = "";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <main>
    <!-- HERO -->
    <section id="inicio" class="bg-clay relative overflow-hidden">
      <div class="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="font-serif text-5xl sm:text-6xl leading-[1.05] text-ink">
            José Cecilio<br />del Valle
          </h1>
          <p class="text-goldLight tracking-[0.15em] text-sm mt-3 mb-6">EL SABIO VALLE</p>
          <p class="italic text-ink/80 max-w-md border-l-2 border-gold/60 pl-4">
            "Formar la patria es formar al ciudadano; la razón, la virtud y el trabajo
            son sus más firmes cimientos."
          </p>
          <a
            href="#biografia"
            class="inline-block mt-8 bg-forest text-parchment px-6 py-3 rounded-sm hover:bg-forest2 transition-colors"
          >
            Conoce su historia
          </a>
        </div>

        <div class="flex justify-center md:justify-end">
          <NuxtImg
            src="/jose-cecilio-del-valle.png"
            alt="Retrato de José Cecilio del Valle"
            class="w-64 sm:w-80 drop-shadow-2xl"
            width="480"
            height="720"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <!-- BIOGRAFÍA -->
    <section id="biografia" class="bg-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8 text-center">
        <p class="section-label">BIOGRAFÍA</p>
        <h2 class="text-3xl sm:text-4xl mt-1">Una vida dedicada al bien común</h2>
        <div class="divider" />

        <div class="grid sm:grid-cols-4 gap-8 mt-12 text-left">
          <div v-for="item in timeline" :key="item.year">
            <div class="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center mb-4 text-gold">
              {{ item.year.slice(2) }}
            </div>
            <p class="font-serif text-xl text-ink mb-1">{{ item.year }}</p>
            <p class="text-muted text-sm">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PENSAMIENTO -->
    <section id="pensamiento" class="bg-forest text-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8 text-center">
        <p class="text-goldLight text-sm tracking-wide">PENSAMIENTO</p>
        <h2 class="text-3xl sm:text-4xl mt-1">Las ideas que transformaron una nación</h2>
        <div class="divider" />

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          <div
            v-for="idea in ideas"
            :key="idea.title"
            class="bg-parchment text-ink rounded-sm p-6 border border-gold/20"
          >
            <h3 class="font-serif text-lg mb-2">{{ idea.title }}</h3>
            <p class="text-sm text-muted">{{ idea.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEGADO -->
    <section id="legado" class="bg-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <p class="section-label">LEGADO</p>
          <h2 class="text-3xl sm:text-4xl mt-1">Su huella permanece en la historia</h2>
          <div class="divider" />
        </div>

        <div class="grid sm:grid-cols-2 gap-10">
          <div>
            <h3 class="font-serif text-xl mb-2">Redactor del Acta de Independencia de 1821</h3>
            <p class="text-muted text-sm">
              El 15 de septiembre de 1821, dio forma con su pluma a la independencia de
              Centroamérica. Su redacción reflejó claridad, visión política y un profundo
              amor por la patria.
            </p>
          </div>
          <div>
            <h3 class="font-serif text-xl mb-2">El Amigo de la Patria</h3>
            <p class="text-muted text-sm">
              Fundó y dirigió este periódico en 1820, desde donde difundió ideas ilustradas,
              defendió la libertad de expresión y promovió el progreso moral y material de
              los pueblos centroamericanos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA CHATBOT -->
    <section class="bg-parchment pb-4">
      <div class="max-w-content mx-auto px-5 sm:px-8">
        <div class="bg-forest text-parchment rounded-sm border border-gold/40 px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div class="flex items-center gap-5">
            <NuxtImg
              src="/jose-cecilio-del-valle.png"
              alt=""
              class="w-16 h-16 rounded-full object-cover border-2 border-goldLight"
              width="64"
              height="64"
            />
            <div>
              <h3 class="font-serif text-xl text-goldLight">Conversa con El Sabio Valle</h3>
              <p class="text-parchment/75 text-sm max-w-md">
                Nuestro asistente virtual responde preguntas sobre su vida, sus ideas y su
                legado, como si hablaras con él en persona.
              </p>
            </div>
          </div>
          <button
            class="bg-gold text-ink px-5 py-3 rounded-sm hover:bg-goldLight transition-colors whitespace-nowrap"
            @click="openChat"
          >
            Iniciar conversación
          </button>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="bg-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8">
        <div class="text-center mb-10">
          <p class="section-label">CONTACTO</p>
          <h2 class="text-3xl sm:text-4xl mt-1">Escríbenos</h2>
          <div class="divider" />
        </div>

        <form class="max-w-xl mx-auto grid gap-4" @submit.prevent="submitForm">
          <!-- honeypot field, hidden from real users -->
          <input v-model="form.honey" type="text" name="company" tabindex="-1" autocomplete="off" class="hidden" />

          <div class="grid sm:grid-cols-2 gap-4">
            <input
              v-model="form.name"
              required
              type="text"
              placeholder="Nombre completo"
              class="bg-parchment2 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none"
            />
            <input
              v-model="form.email"
              required
              type="email"
              placeholder="Correo electrónico"
              class="bg-parchment2 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none"
            />
          </div>
          <textarea
            v-model="form.message"
            required
            rows="4"
            placeholder="Mensaje"
            class="bg-parchment2 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none"
          />
          <button
            type="submit"
            :disabled="status === 'sending'"
            class="bg-forest text-parchment px-6 py-3 rounded-sm hover:bg-forest2 transition-colors disabled:opacity-60 justify-self-start"
          >
            {{ status === "sending" ? "Enviando…" : "Enviar mensaje" }}
          </button>
          <p v-if="status === 'sent'" class="text-forest text-sm">Gracias — tu mensaje fue enviado.</p>
          <p v-if="status === 'error'" class="text-red-700 text-sm">
            Hubo un problema al enviar tu mensaje. Intenta de nuevo.
          </p>
        </form>
      </div>
    </section>
  </main>
</template>
