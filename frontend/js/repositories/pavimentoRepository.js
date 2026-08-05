const pavimentoRepository = {

    listar() {
        // Futuro:
        // return api.get("/pavimentos");
        return getPavimentos();
    },

    salvar(pavimentos) {
        // Futuro:
        // return api.post("/pavimentos", pavimentos);
        savePavimentos(pavimentos);
    },

    buscarPorId(id) {
        // Futuro:
        // return api.get(`/pavimentos/${id}`);
        return getPavimentos().find(function (pavimento) {
            return pavimento.id === id;
        });
    }
};