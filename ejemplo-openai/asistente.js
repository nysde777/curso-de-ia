const readline = require("readline");
const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function chatInterno() {
  rl.question("Empleado: ", async (msg) => {
    const resp = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: msg }]
    });
    console.log("Asistente:", resp.choices[0].message.content);
    chatInterno();
  });
}

chatInterno();
