const API_URL =
    "http://localhost:8080/api";

export async function apiRequest(
    endpoint,
    options = {}
) {
    try {
        const response =
            await fetch(
                `${API_URL}${endpoint}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    ...options
                }
            );

        if (!response.ok) {
            throw new Error(
                "Erro na comunicação com API."
            );
        }

        return await response.json();
    }

    catch (error) {
        console.error(
            "API ERROR:",
            error
        );

        throw error;
    }
}