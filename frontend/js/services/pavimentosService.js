const pavimentosService = {

    async listar() {
        return await pavimentoRepository.listar();
    },

    async buscarPorId(id) {
        return await pavimentoRepository.buscarPorId(id);
    },

    async criar(pavimento) {
        const pavimentos =
            await pavimentoRepository.listar();

        pavimentos.push(pavimento);

        await pavimentoRepository.salvar(pavimentos);

        return pavimento;
    },

    async atualizar(pavimentos) {
        await pavimentoRepository.salvar(pavimentos);
    },

    async remover(id) {
        const pavimentos =
            await pavimentoRepository.listar();

        const novosPavimentos = pavimentos.filter(function (pavimento) {
            return pavimento.id !== id;
        });

        await pavimentoRepository.salvar(novosPavimentos);
    }
};