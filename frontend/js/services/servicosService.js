const servicosService = {

    async listar() {
        return await servicoRepository.listar();
    },

    async buscarPorId(id) {
        return await servicoRepository.buscarPorId(id);
    },

    async criar(servico) {
        const servicos = 
            await servicoRepository.listar();

        servicos.push(servico);

        await servicoRepository.salvar(servicos);

        return servico;
    },

    async atualizar(servicos) {
        await servicoRepository.salvar(servicos);
    },

    async remover(id) {
        const servicos = 
            await servicoRepository.listar();

        const novosServicos = servicos.filter(function (servico) {
            return servico.id !== id;
        });

        await servicoRepository.salvar(novosServicos);
    }
};