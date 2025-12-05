const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function preguntarRAG(pregunta) {
  const doc = fs.readFileSync("manual.txt", "utf8");

  const resp = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Usa este documento de la empresa para responder." },
      { role: "user", content: pregunta + "\n\nContexto: " + doc }
    ]
  });

  console.log("Respuesta:", resp.choices[0].message.content);
}

preguntarRAG("¿Cómo reporto un incidente de seguridad?");
