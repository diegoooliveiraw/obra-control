const API_URL = "http://localhost:8080/api";

const api = {

    async request(endpoint, options = {}) {
        try {

            const response = await fetch(
                `${API_URL}${endpoint}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },

                    ...options
                }
            );

            if (!response.ok) {
                throw new Error("Erro na comunicação com a API.");
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();

        } catch (error) {
            console.error("API ERROR:", error);
            throw error;
        }
    },

    async get(endpoint) {
        return this.request(endpoint);
    },

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data)
        });

    },

    async delete(endpoint) {
        return this.request(endpoint, {
            method: "DELETE"
        });
    }
};