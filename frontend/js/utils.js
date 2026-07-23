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

function calcularProgressoPavimento(pavimentoId, servicos) {
    const servicosDoPavimento = servicos.filter(function (servico) {
        return servico.pavimentoId === pavimentoId;
    });

    if (servicosDoPavimento.length === 0) {
        return 0;
    }

    let soma = 0;

    servicosDoPavimento.forEach(function (servico) {
        soma += servico.progresso;
    });

    return Math.round(soma / servicosDoPavimento.length);
}

function calcularProgressoObra(obraId, pavimentos, servicos) {
    const pavimentosDaObra = pavimentos.filter(function (pavimento) {
        return pavimento.obraId === obraId;
    });

    if (pavimentosDaObra.length === 0) {
        return 0;
    }
    let soma = 0;

    pavimentosDaObra.forEach(function (pavimento) {
        soma += calcularProgressoPavimento(
            pavimento.id,
            servicos
        );
    });

    return Math.round(soma / pavimentosDaObra.length);
}