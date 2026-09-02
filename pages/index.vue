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
  { year: "1780", text: "Nace el 22 de noviembre en Choluteca, en la Capitanía General de Guatemala.", img: "/elementos-44.png" },
  { year: "1802", text: "Estudia en la Universidad de San Carlos, en Guatemala; destaca por su disciplina y amor al conocimiento.", img: "/elementos-45.png" },
  { year: "1821", text: "Redacta el Acta de Independencia de Centroamérica el 15 de septiembre.", img: "/elementos-46.png" },
  { year: "1834", text: "Fallece el 2 de marzo en Guatemala, poco después de ser electo presidente de la Federación Centroamericana.", img: "/elementos-47.png" },
];

const ideas = [
  {
    title: "Economía Política",
    text: "Defendió el trabajo como origen de toda riqueza y estudió a fondo a Adam Smith, David Ricardo y Jeremy Bentham.",
    img: "/ideas-49.png",
  },
  {
    title: "Libre Comercio",
    text: "Sostuvo que el comercio de bienes básicos debía ser libre, como motor de prosperidad para los pueblos.",
    img: "/ideas-50.png",
  },
  {
    title: "Educación",
    text: "Creía que la educación forma ciudadanos libres, responsables y capaces de construir repúblicas sólidas.",
    img: "/ideas-51.png",
  },
  {
    title: "Unidad Centroamericana",
    text: "Visionó una Centroamérica unida y próspera, aprovechando su riqueza natural y el talento de su gente.",
    img: "/ideas-52.png",
  },
];

const form = reactive({ name: "", email: "", message: "", honey: "", motivo: "", origen: "", terminos: false });
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
    <section
      id="inicio"
      class="relative overflow-hidden"
      style="background-image: url('/slider.png'); background-size: cover; background-position: center top; min-height: 88vh;"
    >
      <!-- Overlay más fuerte en móvil para legibilidad, más sutil en desktop -->
      <div class="absolute inset-0 pointer-events-none bg-parchment/60 sm:bg-parchment/30"></div>

      <!-- Degradado inferior suave para transición con la sección siguiente -->
      <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
           style="background: linear-gradient(to bottom, transparent, #F1E4D0);"></div>

      <div class="relative z-10 flex items-center" style="min-height: 88vh;">
        <div class="max-w-content mx-auto px-5 sm:px-10 py-20 sm:py-32 w-full">
          <!-- En móvil: centrado. En desktop: alineado a la izquierda, máx. 55% de ancho -->
          <div class="text-center sm:text-left sm:max-w-xl">
            <h1 class="font-serif text-5xl sm:text-7xl leading-[1.0] text-ink drop-shadow-sm">
              José<br />Cecilio<br />del Valle
            </h1>
            <div class="flex items-center gap-3 mt-4 mb-6 justify-center sm:justify-start">
              <span class="h-px w-8 bg-gold"></span>
              <p class="text-goldLight font-serif italic text-lg tracking-wide">El Sabio Valle</p>
              <span class="h-px w-8 bg-gold"></span>
            </div>
            <p class="italic text-ink/80 border-l-2 border-gold/70 pl-4 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              "Formar la patria es formar al ciudadano; la razón, la virtud y el trabajo
              son sus más firmes cimientos."
            </p>
            <div class="flex justify-center sm:justify-start">
              <a
                href="#biografia"
                class="inline-flex items-center gap-2 mt-8 bg-forest text-parchment px-7 py-3 hover:bg-forest2 transition-colors font-medium tracking-wide text-sm" style="border-radius: 10px;"
              >
                CONOCE SU HISTORIA
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BIOGRAFÍA -->
    <section id="biografia" class="bg-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8 text-center">
        <p class="section-label" v-reveal>BIOGRAFÍA</p>
        <h2 class="text-3xl sm:text-4xl mt-1" v-reveal="100">Una vida dedicada al bien común</h2>
        <NuxtImg src="/divider.png" alt="" class="mx-auto my-4 h-10 object-contain" width="200" height="40" />

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 text-left">
          <div v-for="(item, i) in timeline" :key="item.year" v-reveal="i * 120" class="transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md cursor-default">
            <NuxtImg :src="item.img" alt="" class="mb-4 h-18 object-contain mx-auto" width="72" height="72" />
            <p class="font-serif text-xl text-ink mb-1">{{ item.year }}</p>
            <p class="text-muted text-sm">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PENSAMIENTO -->
    <section id="pensamiento" class="bg-forest text-parchment py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8 text-center">
        <p class="text-goldLight text-sm tracking-wide" v-reveal>PENSAMIENTO</p>
        <h2 class="text-3xl sm:text-4xl mt-1" v-reveal="100">Las ideas que transformaron una nación</h2>
        <NuxtImg src="/divider.png" alt="" class="mx-auto my-4 h-10 object-contain" width="200" height="40" />

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          <div
            v-for="(idea, i) in ideas" v-reveal="i * 120"
            :key="idea.title"
            class="bg-parchment text-ink p-6 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(201,162,39,0.25)] cursor-default"
            style="border: 2px solid rgb(201, 162, 39); border-radius: 10px;"
          >
            <NuxtImg :src="idea.img" alt="" class="h-24 object-contain mb-4 mx-auto" width="96" height="96" />
            <h3 class="font-serif text-lg mb-2">{{ idea.title }}</h3>
            <p class="text-sm text-muted">{{ idea.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEGADO + CTA + CONTACTO: una sola caja con fondo compartido -->
    <div style="background-image: url('/fondo2.png'); background-size: cover; background-position: center; background-attachment: local; overflow: visible;">

    <!-- LEGADO -->
    <section id="legado" class="py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <p class="section-label" v-reveal>LEGADO</p>
          <h2 class="text-3xl sm:text-4xl mt-1" v-reveal="100">Su huella permanece en la historia</h2>
          <NuxtImg src="/divider.png" alt="" class="mx-auto my-4 h-10 object-contain" width="200" height="40" />
        </div>

        <div class="grid sm:grid-cols-2 gap-10 items-start">
          <div v-reveal class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg cursor-default">
            <NuxtImg src="/independencia.png" alt="Acta de Independencia" class="w-full object-contain flex-shrink-0" style="max-width:9rem; align-self:flex-start;" />
            <div>
              <h3 class="font-serif text-xl mb-2">Redactor del Acta de Independencia de 1821</h3>
              <p class="text-muted text-sm">
                El 15 de septiembre de 1821, dio forma con su pluma a la independencia de
                Centroamérica. Su redacción reflejó claridad, visión política y un profundo
                amor por la patria.
              </p>
            </div>
          </div>
          <div v-reveal="150" class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg cursor-default">
            <NuxtImg src="/el-amigo-de-patria.png" alt="El Amigo de la Patria" class="w-full object-contain flex-shrink-0" style="max-width:9rem; align-self:flex-start;" />
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
      </div>
    </section>

    <!-- CTA CHATBOT -->
    <section class="pb-4" style="overflow: visible;">
      <div class="max-w-content mx-auto px-5 sm:px-8" style="position: relative;">
        <div v-reveal class="text-parchment rounded-sm px-5 sm:px-16 py-10 sm:py-12 flex flex-col sm:flex-row items-center gap-8 sm:gap-10 justify-center text-center sm:text-left" style="background-image: url('/ideas-54.png'); background-size: contain; background-position: center; background-repeat: no-repeat; min-height: 220px; overflow: visible; position: relative; z-index: 1;">
          <div class="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start" style="position: relative;">
            <img
              :src="'/jose-cecilio-del-valle.png'"
              alt=""
              class="profile-cta" style="width: clamp(90px, 18vw, 140px); height: auto; margin-top: -40px; margin-bottom: -10px; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5)); display: block; flex-shrink: 0; object-fit: contain;"
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
            class="bg-gold text-ink px-6 py-3 hover:bg-goldLight transition-colors whitespace-nowrap font-semibold tracking-wide" style="border-radius: 10px; border: 1px solid rgb(201,162,39);"
            @click="openChat"
          >
            Iniciar conversación
          </button>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="py-20">
      <div class="max-w-content mx-auto px-5 sm:px-8">
        <div class="text-center mb-10">
          <p class="section-label" v-reveal>CONTACTO</p>
          <h2 class="text-3xl sm:text-4xl mt-1" v-reveal="100">Escríbenos</h2>
          <NuxtImg src="/divider.png" alt="" class="mx-auto my-4 h-10 object-contain" width="200" height="40" />
        </div>

        <form v-reveal="150" class="max-w-xl mx-auto grid gap-4" @submit.prevent="submitForm">
          <!-- honeypot field, hidden from real users -->
          <input v-model="form.honey" type="text" name="company" tabindex="-1" autocomplete="off" class="hidden" />

          <div class="grid sm:grid-cols-2 gap-4">
            <input
              v-model="form.name"
              required
              type="text"
              placeholder="Tu nombre completo"
              style="border-radius: 10px; border: 1px solid rgb(201,162,39); background: rgba(241,228,208,0.9); padding: 12px 16px; font-size: 0.875rem; outline: none; width: 100%;"
            />
            <input
              v-model="form.email"
              required
              type="email"
              placeholder="Correo electrónico"
              style="border-radius: 10px; border: 1px solid rgb(201,162,39); background: rgba(241,228,208,0.9); padding: 12px 16px; font-size: 0.875rem; outline: none; width: 100%;"
            />
          </div>

          <!-- Motivo de contacto -->
          <select
            v-model="form.motivo"
            style="border-radius: 10px; border: 1px solid rgb(201,162,39); background: rgba(241,228,208,0.9); padding: 12px 16px; font-size: 0.875rem; outline: none; width: 100%; cursor: pointer; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path fill=%22%23c9a227%22 d=%22M6 8L1 3h10z%22/></svg>'); background-repeat: no-repeat; background-position: right 14px center;"
          >
            <option value="" disabled selected>¿Cuál es el motivo de tu mensaje?</option>
            <option value="educativo">Proyecto educativo</option>
            <option value="investigacion">Investigación o tesis</option>
            <option value="colaboracion">Colaboración con el sitio</option>
            <option value="prensa">Prensa o medios</option>
            <option value="otro">Otro</option>
          </select>

          <!-- ¿Cómo nos conociste? -->
          <div style="border-radius: 10px; border: 1px solid rgb(201,162,39); background: rgba(241,228,208,0.9); padding: 14px 16px;">
            <p class="text-xs text-ink/60 mb-3 font-medium tracking-wide">¿Cómo llegaste a nosotros?</p>
            <div class="flex flex-wrap gap-3">
              <label v-for="op in ['Redes sociales','Google','Un amigo','Institución educativa','Otro']" :key="op" class="flex items-center gap-2 cursor-pointer text-sm text-ink/80">
                <input v-model="form.origen" type="radio" :value="op" class="accent-gold" />
                {{ op }}
              </label>
            </div>
          </div>

          <textarea
            v-model="form.message"
            required
            rows="4"
            placeholder="Cuéntanos tu mensaje o consulta..."
            style="border-radius: 10px; border: 1px solid rgb(201,162,39); background: rgba(241,228,208,0.9); padding: 12px 16px; font-size: 0.875rem; outline: none; width: 100%; resize: vertical;"
          />
          <!-- Términos y condiciones -->
          <label class="flex items-start gap-3 cursor-pointer text-sm text-ink/70">
            <input v-model="form.terminos" type="checkbox" class="accent-gold mt-0.5 flex-shrink-0" required />
            <span>Acepto los <a href="#" class="text-gold hover:underline font-medium">Términos y Condiciones</a> y la <a href="#" class="text-gold hover:underline font-medium">Política de Privacidad</a> de este sitio educativo.</span>
          </label>

          <button
            type="submit"
            :disabled="status === 'sending' || !form.terminos"
            class="bg-forest text-parchment px-8 py-3 hover:bg-forest2 transition-colors disabled:opacity-60 w-full sm:w-auto font-semibold tracking-wide" style="border-radius: 10px; border: 1px solid rgb(201,162,39);"
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
    </div>
  </main>
</template>
