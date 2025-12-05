const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function resumenDocumento(archivo) {
  const texto = fs.readFileSync(archivo, "utf8");

  const respuesta = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Resume el siguiente documento de manera clara y concisa para empleados." },
      { role: "user", content: texto }
    ]
  });

  console.log("Resumen:\n", respuesta.choices[0].message.content);
}

resumenDocumento("manual.txt");
