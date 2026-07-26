function getObras() {
    return JSON.parse(
        localStorage.getItem("obras")
    ) || [];
}

function saveObras(obras) {
    localStorage.setItem(
        "obras",
        JSON.stringify(obras)
    );
}

function getPavimentos() {
    return JSON.parse(
        localStorage.getItem("pavimentos")
    ) || [];
}

function savePavimentos(pavimentos) {
    localStorage.setItem(
        "pavimentos",
        JSON.stringify(pavimentos)
    );
}

function getServicos() {
    return JSON.parse(
        localStorage.getItem("servicos")
    ) || [];
}

function saveServicos(servicos) {
    localStorage.setItem(
        "servicos",
        JSON.stringify(servicos)
    );
}

function getHistorico() {
    return JSON.parse(
        localStorage.getItem("historico")
    ) || [];
}

function saveHistorico(historico) {
    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );
}