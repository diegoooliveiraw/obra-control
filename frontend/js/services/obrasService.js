const obrasService = {

    async listar() {
        return obraRepository.listar();
    },

    async buscarPorId(id) {
        return await obraRepository.buscarPorId(id);
    },

    async criar(obra) {
        const obras =
            await obraRepository.listar();

        obras.push(obra);

        await obraRepository.salvar(obras);

        return obra;
    },

    async atualizar(obras) {
        await obraRepository.salvar(obras);
    },

    async remover(id) {
        const obras =
            await obraRepository.listar();

        const novasObras =
            obras.filter(function (obra) {
                return obra.id !== id;
            });

        await obraRepository.salvar(novasObras);
    }
};