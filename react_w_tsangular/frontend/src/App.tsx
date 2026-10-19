
import { useState } from "react";

import {getStringForUrl} from "./wasmApi";

type MessageResponse = {
  message: string;
};

const API_URL = "http://localhost:8080/api/message";

function App() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getMessage() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: MessageResponse = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro desconhecido"
      );
    } finally {
      setLoading(false);
    }
  }

  async function postMessage() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      getStringForUrl(response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: MessageResponse = await response.json();

      setMessage(data.message);
      setInput("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro desconhecido"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>React + TypeScript + Go</h1>

      <section>
        <h2>GET</h2>
        <button onClick={getMessage} disabled={loading}>
          Buscar mensagem
        </button>
      </section>

      <section>
        <h2>POST</h2>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Digite uma mensagem"
        />
        <button
          onClick={postMessage}
          disabled={loading || !input.trim()}
        >
          Enviar mensagem
        </button>
      </section>

      {loading && <p>Carregando...</p>}
      {error && <p role="alert">Erro: {error}</p>}

      <h2>Resposta do servidor</h2>
      <p>{message || "Nenhuma mensagem carregada."}</p>
    </main>
  );
}

export default App;
