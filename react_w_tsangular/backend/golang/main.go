
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
)

type Message struct {
	Message string `json:"message"`
}

var (
	mu      sync.RWMutex
	message = "Olá do backend Go!"
)

func messageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Permite chamadas do frontend durante o desenvolvimento.
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	switch r.Method {
		case http.MethodGet:
			mu.RLock()
			response := Message{Message: message}
			mu.RUnlock()

			json.NewEncoder(w).Encode(response)

		case http.MethodPost:
			var input Message

			if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
				http.Error(w, "JSON inválido", http.StatusBadRequest)
				return
			}

			if strings.TrimSpace(input.Message) == "" {
				http.Error(w, "A mensagem não pode ser vazia",
					   http.StatusBadRequest)
				return
			}

			mu.Lock()
			message = input.Message
			response := Message{Message: message}
			mu.Unlock()

			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(response)

		default:
			w.Header().Set("Allow", "GET, POST, OPTIONS")
			http.Error(w, "Método não permitido",
				   http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/api/message", messageHandler)

	log.Println("API Go em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
