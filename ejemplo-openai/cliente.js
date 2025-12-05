
async function enviarMensaje(texto) {
  const resp = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: texto })
  });
  const data = await resp.json();
  console.log("Respuesta del servidor:", data.reply);
}
enviarMensaje("Explicame que es la segunda guerra mundial");
