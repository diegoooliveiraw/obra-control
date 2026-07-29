const pavimentosService = {
    listar() {
        return getPavimentos();
    },

    criar(pavimento) {
        const pavimentos = getPavimentos();

        pavimentos.push(pavimento);

        savePavimentos(pavimentos);

        return pavimento;
    }
};