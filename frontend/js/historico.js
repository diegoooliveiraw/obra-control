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