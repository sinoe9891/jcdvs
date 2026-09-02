// Handles the contact form. Works out of the box (just logs the message),
// so the site is fully functional without a database configured.
//
// To persist messages, plug in MongoDB or Firebase here:
//
//   MongoDB (Atlas):
//     1. npm install mongodb
//     2. Set MONGODB_URI in your environment (see .env.example)
//     3. Uncomment the MongoDB block below
//
//   Firebase (Firestore):
//     1. npm install firebase-admin
//     2. Set your Firebase service account credentials as env vars
//     3. Replace the block below with a Firestore `add()` call
//
// import { MongoClient } from "mongodb";

type ContactBody = {
  name: string;
  email: string;
  message: string;
  honey?: string; // honeypot field — should always be empty
};

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event);

  // Honeypot: if this hidden field was filled, it's almost certainly a bot.
  // Pretend success so the bot doesn't learn anything, but don't store it.
  if (body?.honey) {
    return { ok: true };
  }

  if (!body?.name || !body?.email || !body?.message) {
    throw createError({ statusCode: 400, statusMessage: "Faltan campos requeridos." });
  }

  const config = useRuntimeConfig();

  // --- Optional MongoDB persistence -----------------------------------
  // if (config.mongodbUri) {
  //   const client = new MongoClient(config.mongodbUri);
  //   await client.connect();
  //   await client.db("jcdv").collection("contactos").insertOne({
  //     name: body.name,
  //     email: body.email,
  //     message: body.message,
  //     createdAt: new Date(),
  //   });
  //   await client.close();
  // }

  // Fallback: log server-side so nothing is silently lost during setup.
  console.log("[contacto] nuevo mensaje:", {
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return { ok: true };
});
