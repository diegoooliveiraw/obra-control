const servicosService = {
    listar() {
        return getServicos();
    },

    criar(servico) {
        const servicos = getServicos();

        servicos.push(servico);

        saveServicos(servicos);

        return servico;
    }
};