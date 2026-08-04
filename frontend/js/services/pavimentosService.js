const pavimentosService = {

    listar() {
        return getPavimentos();
    },

    buscarPorId(id) {
        return getPavimentos().find(function (pavimento) {
            return pavimento.id === id;
        });
    },

    criar(pavimento) {
        const pavimentos = getPavimentos();

        pavimentos.push(pavimento);

        savePavimentos(pavimentos);

        return pavimento;
    },

    atualizar(pavimentos) {
        savePavimentos(pavimentos);
    },

    remover(id) {
        const pavimentos = getPavimentos();

        const novosPavimentos = pavimentos.filter(function (pavimento) {
            return pavimento.id !== id;
        });

        savePavimentos(novosPavimentos);
    }
};