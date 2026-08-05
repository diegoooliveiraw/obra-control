const obraRepository = {

    listar() {
        // Futuro:
        // return api.get("/obras");
        return getObras();
    },

    salvar(obras) {
        // Futuro:
        // return api.post("/obras", obras);
        saveObras(obras);
    },

    buscarPorId(id) {
        // Futuro:
        // return api.get(`/obras/${id}`);
        return getObras().find(function (obra) {
            return obra.id === id;
        });
    }
};