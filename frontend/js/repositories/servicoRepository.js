const servicoRepository = {

    listar() {
        // Futuro:
        // return api.get("/servicos");
        return getServicos();
    },

    salvar(servicos) {
        // Futuro:
        // return api.post("/servicos", servicos);
        saveServicos(servicos);
    },

    buscarPorId(id) {
        // Futuro:
        // return api.get(`/servicos/${id}`);
        return getServicos().find(function (servico) {
            return servico.id === id;
        });
    }
};