<script setup lang="ts">
const open = ref(false);
const links = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Biografía", href: "/#biografia" },
  { label: "Pensamiento", href: "/#pensamiento" },
  { label: "Legado", href: "/#legado" },
  { label: "Contacto", href: "/#contacto" },
];
</script>

<template>
  <header class="sticky top-0 z-40 bg-ink text-parchment border-b border-gold/30">
    <div class="max-w-content mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <NuxtLink to="/#inicio" class="flex flex-col leading-none">
        <span class="font-serif text-lg sm:text-xl text-goldLight tracking-wide">José Cecilio del Valle</span>
        <span class="text-[10px] sm:text-xs tracking-[0.2em] text-parchment/70">EL SABIO VALLE</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8 text-sm">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="text-parchment/85 hover:text-goldLight transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button
        class="md:hidden text-parchment"
        aria-label="Abrir menú"
        @click="open = !open"
      >
        <svg v-if="!open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <nav v-if="open" class="md:hidden border-t border-gold/20 bg-ink px-5 py-4 flex flex-col gap-4 text-sm">
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        class="text-parchment/85 hover:text-goldLight"
        @click="open = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
