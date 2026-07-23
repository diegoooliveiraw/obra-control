let historico = JSON.parse(localStorage.getItem("historico")) || [];

function salvarHistorico() {
    localStorage.setItem("historico", JSON.stringify(historico));
}

function buscarHistoricoPorObra(obraId) {
    return historico.filter(function (registro) {
        return registro.obraId === obraId;
    });
}

function existeRegistroNoMes(obraId, mes) {
    return historico.some(function (registro) {
        return registro.obraId === obraId &&
            registro.mes === mes;
    });
}

function adicionarRegistroHistorico(registro) {
    historico.push(registro);
    salvarHistorico();
}

function registrarHistoricoMensal(obraId, progresso) {
    const hoje = new Date();

    const mes =
        `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;

    if (existeRegistroNoMes(obraId, mes)) {
        return;
    }

    adicionarRegistroHistorico({
        id: Date.now(),
        obraId: obraId,
        mes: mes,
        progresso: progresso
    });
}