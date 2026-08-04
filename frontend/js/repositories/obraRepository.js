const obraRepository = {

    listar() {
        return getObras();
    },

    salvar(obras) {
        saveObras(obras);
    }
};