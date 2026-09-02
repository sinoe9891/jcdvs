<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-ink text-parchment/80">
    <div class="max-w-content mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
      <div>
        <p class="font-serif text-lg text-goldLight">José Cecilio del Valle</p>
        <p class="text-xs tracking-[0.2em] text-parchment/60 mb-3">EL SABIO VALLE</p>
        <p class="text-parchment/70 max-w-xs">
          Su vida, sus ideas y su legado viven en cada generación que cree en la razón,
          la virtud y el trabajo.
        </p>
      </div>

      <div>
        <p class="text-goldLight mb-3">Enlaces</p>
        <ul class="space-y-2 text-parchment/70">
          <li><a href="#inicio" class="hover:text-goldLight">Inicio</a></li>
          <li><a href="#biografia" class="hover:text-goldLight">Biografía</a></li>
          <li><a href="#pensamiento" class="hover:text-goldLight">Pensamiento</a></li>
          <li><a href="#legado" class="hover:text-goldLight">Legado</a></li>
          <li><a href="#contacto" class="hover:text-goldLight">Contacto</a></li>
        </ul>
      </div>

      <div>
        <p class="text-goldLight mb-3">Contacto</p>
        <ul class="space-y-2 text-parchment/70">
          <li>Choluteca, Honduras</li>
          <li>info@josececiliodelvalle.hn</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-parchment/10 py-5 text-center text-xs text-parchment/50">
      © {{ year }} José Cecilio del Valle — El Sabio Valle. Sitio educativo sin fines de lucro.
    </div>
  </footer>
</template>
