function obterStatusProgresso(percentual) {
    if (percentual === 0) {

        return {
            texto: "Planejamento",
            classe: "status-planejamento",
            icone: "⚪"
        };

    }

    if (percentual === 100) {

        return {
            texto: "Concluída",
            classe: "status-concluido",
            icone: "🟢"
        };

    }

    return {
        texto: "Em andamento",
        classe: "status-andamento",
        icone: "🟡"
    };
}