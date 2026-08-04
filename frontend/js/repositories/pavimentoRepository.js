const pavimentoRepository = {

    listar() {
        return getPavimentos();
    },

    salvar(pavimentos) {
        savePavimentos(pavimentos);
    },

    buscarPorId(id) {
        return getPavimentos().find(function (pavimento) {
            return pavimento.id === id;
        });
    }
};