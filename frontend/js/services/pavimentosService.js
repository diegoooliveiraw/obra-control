const pavimentosService = {

    listar() {
        return pavimentoRepository.listar();
    },

    buscarPorId(id) {
        return pavimentoRepository.buscarPorId(id);
    },

    criar(pavimento) {
        const pavimentos = pavimentoRepository.listar();

        pavimentos.push(pavimento);

        pavimentoRepository.salvar(pavimentos);

        return pavimento;
    },

    atualizar(pavimentos) {
        pavimentoRepository.salvar(pavimentos);
    },

    remover(id) {
        const pavimentos = pavimentoRepository.listar();

        const novosPavimentos = pavimentos.filter(function (pavimento) {
            return pavimento.id !== id;
        });

        pavimentoRepository.salvar(novosPavimentos);
    }
};