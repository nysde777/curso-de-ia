const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simula datos de ventas
const datos = [
  { mes: "Enero", ventas: 1200 },
  { mes: "Febrero", ventas: 1500 },
  { mes: "Marzo", ventas: 1100 },
    { mes: "Abril", ventas: 1700 },
    { mes: "Mayo", ventas: 1600 }
];

async function generarReporte(datos) {
  const textoDatos = JSON.stringify(datos);

  const resp = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Genera un reporte ejecutivo sobre los datos de ventas." },
      { role: "user", content: textoDatos }
    ]
  });

  console.log("Reporte generado:\n", resp.choices[0].message.content);
}

generarReporte(datos);
