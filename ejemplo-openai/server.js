const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(cors());        
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({
        error: "El campo 'message' es obligatorio y debe ser un string."
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Eres un asistente útil y conciso." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.2
    });

    const reply = response.choices?.[0]?.message?.content || "Sin respuesta.";

    res.json({ reply });
  } catch (error) {
    console.error("ERROR en /chat:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
