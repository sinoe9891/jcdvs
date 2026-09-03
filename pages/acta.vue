<script setup lang="ts">
useHead({
  title: "Acta de Independencia de Centroamérica — José Cecilio del Valle",
  meta: [
    { name: "description", content: "Texto completo del Acta de Independencia de Centroamérica, firmada el 15 de septiembre de 1821 y redactada por José Cecilio del Valle." },
    { property: "og:title", content: "Acta de Independencia de Centroamérica (1821)" },
    { property: "og:description", content: "Lee el documento histórico redactado por El Sabio Valle que proclamó la libertad de Centroamérica." },
    { property: "og:image", content: "/acta-portada.png" },
  ],
});

const signatarios = [
  { nombre: "Gabino Gaínza", cargo: "Jefe Político Superior", destacado: false },
  { nombre: "José Cecilio del Valle", cargo: "Redactor del Acta · Auditor de Guerra", destacado: true },
  { nombre: "Mariano de Beltranena", cargo: "Diputación Provincial", destacado: false },
  { nombre: "José Mariano Calderón", cargo: "Vocal", destacado: false },
  { nombre: "Mariano de Aycinena", cargo: "Vocal · Marqués de Aycinena", destacado: false },
  { nombre: "Pedro Molina", cargo: "Vocal", destacado: false },
  { nombre: "Miguel Larreynaga", cargo: "Síndico · Asesor", destacado: false },
  { nombre: "Antonio Rivera Cabezas", cargo: "Regidor", destacado: false },
  { nombre: "Isidoro Ortiz de Letona", cargo: "Vocal", destacado: false },
  { nombre: "Florencio Castillo", cargo: "Vocal", destacado: false },
  { nombre: "Manuel Montúfar", cargo: "Vocal", destacado: false },
  { nombre: "Juan Vicente Villacorta", cargo: "Vocal", destacado: false },
  { nombre: "Domingo Diéguez", cargo: "Regidor", destacado: false },
];

const articulos = [
  {
    num: "1°",
    texto: "Que siendo la independencia del gobierno español la voluntad general del pueblo de Guatemala, y sin perjuicio de lo que determine sobre ella el Congreso que debe formarse, el señor Jefe Político la mande publicar para prevenir las consecuencias que serían temibles en el caso de que la proclamase de hecho el mismo pueblo."
  },
  {
    num: "2°",
    texto: "Que desde luego se circulen oficios a las provincias por correos extraordinarios, para que sin demora alguna, se sirvan proceder a elegir diputados o representantes suyos, y éstos concurran a esta Capital a formar el Congreso que debe decidir el punto de independencia general y absoluta, y si ha de constituirse en nación separada, o formar parte de México u otro Estado."
  },
  {
    num: "3°",
    texto: "Que para facilitar el nombramiento de electores en los pueblos que no tienen ayuntamientos, se sirvan los ayuntamientos de los pueblos cabecera de partido agregar a los pueblos que carezcan de él."
  },
  {
    num: "4°",
    texto: "Que el número de diputados sea en proporción de uno por cada quince mil almas; a cuyo efecto se sirvan los mismos ayuntamientos hacer el censo o regulación de las almas que comprenda su jurisdicción, con la posible exactitud."
  },
  {
    num: "5°",
    texto: "Que las mismas juntas electorales de provincia que han de formarse para el nombramiento de diputados en Cortes, procedan a elegir sus representantes para el Congreso, a razón de uno por cada partido, en los mismos términos y con la misma solemnidad que previene la ley para el nombramiento de diputados en Cortes."
  },
  {
    num: "6°",
    texto: "Que en atención a la gravedad y urgencia del asunto, se sirvan verificar las elecciones de diputados de modo que el día primero de marzo del año próximo de 1822 puedan reunirse en esta Capital."
  },
  {
    num: "7°",
    texto: "Que entre tanto, no haciendo novedad en las autoridades establecidas, sigan éstas ejerciendo sus atribuciones respectivas con arreglo a la Constitución, Decretos y Leyes, hasta que el Congreso que debe formarse determine lo que sea más justo y benéfico."
  },
  {
    num: "8°",
    texto: "Que el señor Jefe Político, Brigadier Don Gabino Gaínza, continúe con el gobierno y pleno ejercicio de sus facultades políticas y militares; y que para allanar dificultades, consultar el bien general y seguridad de las autoridades establecidas, forme una Junta Provisional Consultiva compuesta de los señores individuales actuales de esta Diputación Provincial, y de los señores D. Miguel de Larreynaga, síndico de este Ilustre Ayuntamiento; D. José del Valle, auditor de guerra; Marqués de Aycinena; el Dr. D. Isidoro Ortiz de Letona; el Dr. D. José Antonio de Larrave, y D. Antonio de Rivera Cabezas."
  },
  {
    num: "9°",
    texto: "Que esta Junta Provisional sirva de consulta al mismo señor Jefe Político, quien podrá obrar según su prudencia en los casos que no den tiempo para consultas."
  },
  {
    num: "10°",
    texto: "Que una vez formada la Junta Provisional, se forme también una Junta de Gobierno que dirija los negocios del Estado bajo la autoridad suprema del señor Jefe Político."
  },
  {
    num: "11°",
    texto: "Que la Religión Católica, que hemos profesado en los siglos anteriores y profesaremos en los venideros, sea conservada pura e inalterable, manteniendo vivo el espíritu de religiosidad que ha distinguido siempre a Guatemala, respetando a los regulares seculares, conservando en sus destinos a los párrocos y no haciéndoles novedad en sus dotaciones y estipendios, mientras el Congreso regla en todo."
  },
  {
    num: "12°",
    texto: "Que se conserven y no sean perturbadas las órdenes religiosas existentes en este reino, mientras el Congreso disponga lo que sea conveniente."
  },
  {
    num: "13°",
    texto: "Que el Ilustrísimo señor Arzobispo y los señores obispos diocesanos exciten a sus diocesanos a la unión, concordia y subordinación al gobierno establecido, trabajando con el celo que les es propio en bien del Estado."
  },
  {
    num: "14°",
    texto: "Que el Ilustre Ayuntamiento de esta Capital, forme el manifiesto que debe publicarse con los motivos que han determinado esta resolución, haciendo presentes las consideraciones de justicia y necesidad que la han autorizado."
  },
  {
    num: "15°",
    texto: "Que se den gracias al señor Jefe Político por la heroica resolución con que ha manifestado su amor a la libertad y prosperidad de estas provincias."
  },
  {
    num: "16°",
    texto: "Que se proceda a la formación de una medalla conmemorativa del día quince de septiembre de 1821."
  },
  {
    num: "17°",
    texto: "Que se imprima, publique y circule el presente Acta a las autoridades de las provincias para su conocimiento y demás efectos."
  },
  {
    num: "18°",
    texto: "Que se celebre con solemnidad este fausto acontecimiento con repique general de campanas, iluminación y demás demostraciones de júbilo que el pueblo quiera hacer, así como con una misa solemne de gracias al Todopoderoso por tan singular beneficio."
  },
];
</script>

<template>
  <div style="background:#120e06; min-height:100vh;">

    <!-- NAV DE RETORNO -->
    <div class="sticky top-0 z-50 border-b border-gold/20" style="background:rgba(18,14,6,0.95); backdrop-filter:blur(10px);">
      <div class="max-w-content mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gold/70 hover:text-gold transition-colors text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al inicio
        </NuxtLink>
        <p class="font-serif italic text-gold/50 text-xs hidden sm:block">15 de septiembre de 1821</p>
      </div>
    </div>

    <!-- HERO -->
    <section class="relative overflow-hidden pt-16 pb-12 px-5 sm:px-8">
      <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="background-image:url('/acta-portada.png');background-size:55%;background-position:center;background-repeat:no-repeat;"></div>
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <p class="text-goldLight text-[10px] tracking-[0.35em] uppercase mb-4">Documento Histórico · Centroamérica</p>
        <h1 class="font-serif text-4xl sm:text-6xl text-parchment leading-tight mb-4">
          Acta de Independencia<br />
          <em class="text-gold" style="font-size:0.75em;">de Centroamérica</em>
        </h1>
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="h-px w-12 bg-gold/40"></span>
          <p class="font-serif italic text-gold/70 text-sm">Palacio Nacional de Guatemala, 15 de septiembre de 1821</p>
          <span class="h-px w-12 bg-gold/40"></span>
        </div>
        <p class="text-parchment/60 text-sm leading-relaxed max-w-xl mx-auto">
          Redactada por <strong class="text-gold font-semibold">José Cecilio del Valle</strong>, este documento proclamó la separación
          de las provincias centroamericanas de la corona española, cambiando para siempre
          el destino de millones de personas.
        </p>
      </div>
    </section>

    <!-- PORTADA DEL ACTA -->
    <section class="pb-10 px-5 sm:px-8">
      <div class="flex justify-center">
        <NuxtImg
          src="/acta-portada.png"
          alt="Acta de Independencia de Centroamérica — 15 de septiembre de 1821"
          class="object-contain"
          width="300" height="380"
          style="max-width:260px; filter:drop-shadow(0 24px 64px rgba(201,162,39,0.5));"
        />
      </div>
    </section>

    <!-- CONTEXTO HISTÓRICO -->
    <section class="py-12 px-5 sm:px-8 border-t border-gold/10">
      <div class="max-w-3xl mx-auto">
        <p class="text-gold/60 text-[10px] tracking-[0.3em] uppercase mb-4">Contexto histórico</p>
        <div class="grid sm:grid-cols-3 gap-6 text-parchment/70 text-sm leading-relaxed">
          <div>
            <h3 class="font-serif text-parchment text-base mb-2">El clima de 1821</h3>
            <p>La revolución de independencia de México en 1820 y el restablecimiento de la Constitución de Cádiz aceleraron los movimientos independentistas en toda la región. En Guatemala, la presión popular era ya insostenible.</p>
          </div>
          <div>
            <h3 class="font-serif text-parchment text-base mb-2">El 15 de septiembre</h3>
            <p>Esa mañana, mientras el pueblo clamaba en calles y plazas, la Diputación Provincial, el Ayuntamiento, el Consulado y el Colegio de Abogados se reunieron en el Palacio de los Capitanes Generales para debatir el destino de un continente.</p>
          </div>
          <div>
            <h3 class="font-serif text-parchment text-base mb-2">La pluma de Valle</h3>
            <p>José Cecilio del Valle, auditor de guerra y el más brillante jurista de la región, fue quien redactó el Acta. Su prosa equilibrada y precisa reflejó años de reflexión política e ilustrada sobre la libertad y la soberanía.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TEXTO COMPLETO DEL ACTA -->
    <section class="py-16 px-5 sm:px-8">
      <div class="max-w-3xl mx-auto">

        <!-- Encabezado del documento -->
        <div class="text-center mb-10">
          <div class="h-px mb-8" style="background:linear-gradient(to right,transparent,rgba(201,162,39,0.4),transparent);"></div>
          <p class="text-parchment/90" style="font-family:'Pinyon Script',cursive; font-size:clamp(2rem,5vw,3rem); line-height:1.6;">
            Acta de Independencia
          </p>
          <p class="text-parchment/60 text-sm mt-2 font-serif italic">Palacio Nacional de Guatemala, Quince de Septiembre de mil ochocientos veintiuno.</p>
          <div class="h-px mt-8" style="background:linear-gradient(to right,transparent,rgba(201,162,39,0.4),transparent);"></div>
        </div>

        <!-- Preámbulo -->
        <div class="mb-10 p-6 sm:p-8 rounded-sm border border-gold/15" style="background:rgba(241,228,208,0.05);">
          <p class="text-gold/50 text-[10px] tracking-[0.25em] uppercase mb-4">Preámbulo</p>
          <p class="text-parchment/80 text-sm leading-loose italic font-serif">
            Siendo público é indudable los deseos de independencia del gobierno español que por escrito y de palabra ha manifestado el pueblo de esta Capital: reclamándola por los últimos correos los ayuntamientos constitucionales de Ciudad Real, Comitán y Tuxtla, que han convenido en proclamar y proclamar la Independencia; y siendo necesario prevenir las consecuencias que serían temibles en el caso de que la proclamase de hecho el mismo pueblo: queriendo la Diputación Provincial y el Excmo. Ayuntamiento de esta Capital conciliar la seguridad de las autoridades con los deseos del pueblo, y que reunidos en el mismo palacio la mencionada Diputación Provincial, el Excmo. Ayuntamiento, el M. Y. Claustro, el Consulado y Colegio de Abogados, los prelados regulares, gofes y funcionarios públicos, congregados todos en el mismo salón, leídos los oficios expresados, discutido y meditado detenidamente el asunto, y oído el clamor de
          </p>
          <p class="text-center text-parchment/95 mt-6 mb-2" style="font-family:'Pinyon Script',cursive; font-size:clamp(1.4rem,3.5vw,2rem); line-height:1.8;">
            "¡Viva la Independencia!"
          </p>
          <p class="text-parchment/80 text-sm leading-loose italic font-serif">
            que repetía de continuo el pueblo que se veía reunido en las calles, plazas, patios, corredores y ante-sala de este palacio, resolvieron:
          </p>
        </div>

        <!-- Artículos -->
        <div class="space-y-5">
          <p class="text-gold/50 text-[10px] tracking-[0.25em] uppercase mb-6">Artículos del Acta</p>
          <div
            v-for="art in articulos"
            :key="art.num"
            class="flex gap-4 sm:gap-6 p-5 rounded-sm border border-gold/10 hover:border-gold/25 transition-colors group"
            style="background:rgba(241,228,208,0.03);"
          >
            <div class="shrink-0">
              <span class="font-serif text-gold/80 text-lg group-hover:text-gold transition-colors" style="font-style:italic;">{{ art.num }}</span>
            </div>
            <p class="text-parchment/75 text-sm leading-relaxed">{{ art.texto }}</p>
          </div>
        </div>

        <!-- Cierre del documento -->
        <div class="mt-12 text-center">
          <div class="h-px mb-8" style="background:linear-gradient(to right,transparent,rgba(201,162,39,0.3),transparent);"></div>
          <p class="text-parchment/60 text-sm italic font-serif leading-relaxed">
            Dada en el Palacio Nacional de Guatemala a los quince días del mes de septiembre de mil ochocientos veintiuno.
          </p>
          <div class="h-px mt-8" style="background:linear-gradient(to right,transparent,rgba(201,162,39,0.3),transparent);"></div>
        </div>

      </div>
    </section>

    <!-- FIRMANTES -->
    <section class="py-16 px-5 sm:px-8 border-t border-gold/10">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-10">
          <span class="h-px flex-1" style="background:linear-gradient(to right,transparent,rgba(201,162,39,0.35));"></span>
          <p class="text-gold text-[10px] tracking-[0.35em] font-bold uppercase shrink-0">Firmantes originales</p>
          <span class="h-px flex-1" style="background:linear-gradient(to left,transparent,rgba(201,162,39,0.35));"></span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <div
            v-for="s in signatarios"
            :key="s.nombre"
            :class="['firma-card', s.destacado ? 'firma-highlight' : '']"
          >
            <span class="firma-seal">{{ s.destacado ? '✒' : '⚜' }}</span>
            <p class="firma-name">{{ s.nombre }}</p>
            <p class="firma-role">{{ s.cargo }}</p>
          </div>
        </div>

        <p class="text-parchment/25 text-xs text-center italic">
          Además de otras autoridades civiles, eclesiásticas y militares presentes en el acto solemne.
        </p>
      </div>
    </section>

    <!-- FOOTER DE PÁGINA -->
    <div class="border-t border-gold/10 py-10 px-5 text-center">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm font-serif italic">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Regresar a El Sabio Valle
      </NuxtLink>
      <p class="text-parchment/20 text-xs mt-4">
        Contenido con fines educativos · José Cecilio del Valle © 2025
      </p>
    </div>

  </div>
</template>
