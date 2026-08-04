const servicosService = {

    listar() {
        return getServicos();
    },

    buscarPorId(id) {
        return getServicos().find(function (servico) {
            return servico.id === id;
        });
    },

    criar(servico) {
        const servicos = getServicos();

        servicos.push(servico);

        saveServicos(servicos);

        return servico;
    },

    atualizar(servicos) {
        saveServicos(servicos);
    },

    remover(id) {
        const servicos = getServicos();

        const novosServicos = servicos.filter(function (servico) {
            return servico.id !== id;
        });

        saveServicos(novosServicos);
    }
};