const obrasService = {

    listar() {
        return obraRepository.listar();
    },

    criar(obra) {
        const obras =
            obraRepository.listar();

        obras.push(obra);

        obraRepository.salvar(obras);

        return obra;
    },

    buscarPorId(id) {
        return obraRepository
            .listar()
            .find(function (obra) {

                return obra.id === id;
            });
    },

    atualizar(obras) {
        obraRepository.salvar(obras);
    },

    remover(id) {
        const obras =
            obraRepository.listar();

        const novasObras =
            obras.filter(function (obra) {
                return obra.id !== id;
            });

        obraRepository.salvar(novasObras);
    }
};