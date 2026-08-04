const servicosService = {

    listar() {
        return servicoRepository.listar();
    },

    buscarPorId(id) {
        return servicoRepository.buscarPorId(id);
    },

    criar(servico) {
        const servicos = servicoRepository.listar();

        servicos.push(servico);

        servicoRepository.salvar(servicos);

        return servico;
    },

    atualizar(servicos) {
        servicoRepository.salvar(servicos);
    },

    remover(id) {
        const servicos = servicoRepository.listar();

        const novosServicos = servicos.filter(function (servico) {
            return servico.id !== id;
        });

        servicoRepository.salvar(novosServicos);
    }
};