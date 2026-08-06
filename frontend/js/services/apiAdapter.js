const apiAdapter = {

    listarObras() {

        // Futuro:
        // return apiRequest("/obras");

        return getObras();
    },

    salvarObras(obras) {

        // Futuro:
        // return apiRequest("/obras", {
        //     method: "POST",
        //     body: JSON.stringify(obras)
        // });

        saveObras(obras);
    }
};