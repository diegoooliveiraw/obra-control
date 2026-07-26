const API_URL =
    "http://localhost:8080/api";

export async function apiRequest(endpoint, options = {}) {
    const response =
        await fetch(
            `${API_URL}${endpoint}`,
            options
        );

    return response.json();
}