const obrasService = {

    listar() {
        return getObras();
    },

    criar(obra) {
        const obras = getObras();

        obras.push(obra);

        saveObras(obras);

        return obra;
    },

    buscarPorId(id) {
        return getObras().find(function (obra) {
            return obra.id === id;
        });
    },

    atualizar(obras) {
        saveObras(obras);
    },

    remover(id) {
        const obras = getObras();

        const novasObras = obras.filter(function (obra) {
            return obra.id !== id;
        });

        saveObras(novasObras);
    }
};