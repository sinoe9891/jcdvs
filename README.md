# José Cecilio del Valle — Sitio Web

Sitio biográfico dedicado a José Cecilio del Valle ("El Sabio Valle"), con un
asistente virtual (chatbot) que conversa en su nombre, construido con Nuxt 3.

## Requisitos

- Node.js 18 o superior
- Una API key de OpenAI (para el chatbot) — https://platform.openai.com/api-keys

## Instalación local

```bash
npm install
cp .env.example .env
# abrí .env y pegá tu OPENAI_API_KEY
npm run dev
```

El sitio queda disponible en `http://localhost:3000`.

## Desplegar en Vercel (paso a paso)

1. **Subí el proyecto a GitHub** (creá un repositorio nuevo y subí estos archivos).
2. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (podés usar tu cuenta de GitHub).
3. Click en **"Add New… → Project"** e importá el repositorio que acabás de subir.
4. Vercel detecta automáticamente que es un proyecto Nuxt — no hace falta tocar nada
   en la configuración de build.
5. Antes de darle a "Deploy", abrí la sección **"Environment Variables"** y agregá:
   - `OPENAI_API_KEY` → pegá ahí tu clave de OpenAI. **Esto es lo único que necesitás
     pegar para que el chatbot funcione.**
   - (Opcional) `MONGODB_URI` → solo si querés guardar los mensajes del formulario
     de contacto en una base de datos.
6. Click en **"Deploy"**. En unos minutos tenés el sitio en línea en una URL tipo
   `tu-proyecto.vercel.app`.
7. Si más adelante querés un dominio propio, se configura desde
   **Project Settings → Domains** dentro de Vercel.

Ese es todo el proceso — no se requiere ninguna otra configuración manual.

## Reemplazar el retrato

La imagen que se usa como avatar del chatbot y en el sitio está en:

```
/public/jose-cecilio-del-valle.png
```

Podés reemplazarla por cualquier retrato histórico de dominio público (por
ejemplo de Wikimedia Commons) sin tocar el código — solo sobrescribí ese
archivo con el mismo nombre.

## Ajustar la personalidad del chatbot

El texto que define cómo responde el asistente está en:

```
/server/utils/chatSystemPrompt.ts
```

Podés editarlo libremente para ajustar tono, longitud de respuestas o agregar
más datos históricos.

## Costos a tener en cuenta

- **Hosting en Vercel:** el plan gratuito (Hobby) suele ser suficiente para un
  sitio de este tamaño.
- **API de OpenAI:** se factura aparte, por consumo de tokens (según cuánto se
  use el chatbot). No está incluido en ningún costo fijo — revisá tu uso en
  https://platform.openai.com/usage. El proyecto incluye un límite básico de
  mensajes por minuto y un tope de tokens por respuesta para evitar picos de
  consumo inesperados, pero no reemplaza definir un presupuesto/alerta en tu
  cuenta de OpenAI.

## Buenas prácticas ya implementadas

- ✅ **SEO:** metaetiquetas, Open Graph, `sitemap.xml`, `robots.txt`, datos
  estructurados `schema.org/Person`.
- ✅ **GEO:** contenido jerarquizado y verificable para que asistentes de IA
  puedan citar correctamente al personaje.
- ✅ **Rendimiento:** `@nuxt/image` para imágenes optimizadas, carga diferida.
- ✅ **Responsivo:** diseño mobile-first con Tailwind CSS.
- ✅ **Compatibilidad cross-browser:** CSS y JS estándar, sin dependencias que
  rompan en Safari/iOS.
- ✅ **Seguridad:** cabeceras HTTP básicas, formulario de contacto con
  honeypot anti-spam, la API key de OpenAI nunca se expone al cliente.
- ✅ **Accesibilidad:** HTML semántico, foco de teclado visible, respeta
  `prefers-reduced-motion`.

## Estructura del proyecto

```
app.vue                        Layout raíz (header, página, footer, chat)
components/
  TheHeader.vue                Barra de navegación
  TheFooter.vue                Pie de página
  ChatWidget.vue                Widget flotante del chatbot (con avatar)
composables/
  useChatWidget.ts             Estado compartido para abrir/cerrar el chat
pages/
  index.vue                    Página principal (todas las secciones)
server/
  api/chat.post.ts             Endpoint que llama a la API de OpenAI
  api/contact.post.ts          Endpoint del formulario de contacto
  utils/chatSystemPrompt.ts    Personalidad y conocimiento del chatbot
public/
  jose-cecilio-del-valle.png   Retrato usado como avatar
  robots.txt / sitemap.xml
```
