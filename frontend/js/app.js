const obras = JSON.parse(localStorage.getItem("obras")) || [];
const pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const totalObras = document.getElementById("total-obras");
const totalPavimentos = document.getElementById("total-pavimentos");
const totalServicos = document.getElementById("total-servicos");
const totalConcluidos = document.getElementById("total-concluidos");
const totalAndamento = document.getElementById("total-andamento");
const totalPlanejamento = document.getElementById("total-planejamento");
const progressoGeral = document.querySelector(".progress-fill");
const statusGeral = document.getElementById("status-geral");

inicializar();

function inicializar() {
    atualizarIndicadores();
}

function atualizarIndicadores() {

    totalObras.textContent = obras.length;

    totalPavimentos.textContent = pavimentos.length;

    totalServicos.textContent = servicos.length;

    const indicadores =
        calcularIndicadoresServicos(servicos);

    totalConcluidos.textContent =
        indicadores.concluidos;

    totalAndamento.textContent =
        indicadores.andamento;

    totalPlanejamento.textContent =
        indicadores.planejamento;

    const progresso = calcularProgressoDashboard();

    const status = obterStatusProgresso(progresso);

    progressoGeral.style.width = `${progresso}%`;

    progressoGeral.textContent = `${progresso}%`;

    statusGeral.innerHTML = `
        <span class="tree-badge ${status.classe}">
            ${status.icone}
            ${status.texto}
        </span>
    `;
}

function calcularProgressoDashboard() {
    if (obras.length === 0) {
        return 0;
    }

    let soma = 0;

    obras.forEach(function (obra) {
        soma += calcularProgressoObra(
            obra.id,
            pavimentos,
            servicos
        );
    });

    return Math.round(
        soma / obras.length
    );
}