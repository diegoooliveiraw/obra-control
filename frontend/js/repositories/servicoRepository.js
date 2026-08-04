const servicoRepository = {

    listar() {
        return getServicos();
    },

    salvar(servicos) {
        saveServicos(servicos);
    },

    buscarPorId(id) {
        return getServicos().find(function (servico) {
            return servico.id === id;
        });
    }
};