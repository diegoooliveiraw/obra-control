const obras = JSON.parse(localStorage.getItem("obras")) || [];
const pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const totalObras = document.getElementById("total-obras");
const totalPavimentos = document.getElementById("total-pavimentos");
const totalServicos = document.getElementById("total-servicos");
const totalConcluidos = document.getElementById("total-concluidos");
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

    const concluidos = servicos.filter(function (servico) {
        return servico.progresso === 100;
    });

    totalConcluidos.textContent = concluidos.length;

    const progresso = calcularProgressoGeral();

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

function calcularProgressoGeral() {
    if (pavimentos.length === 0) {
        return 0;
    }

    let soma = 0;

    pavimentos.forEach(function (pavimento) {
        const servicosDoPavimento = servicos.filter(function (servico) {
            return servico.pavimentoId === pavimento.id;
        });

        if (servicosDoPavimento.length === 0) {
            return;
        }

        let progressoPavimento = 0;

        servicosDoPavimento.forEach(function (servico) {
            progressoPavimento += servico.progresso;
        });

        progressoPavimento =
            progressoPavimento /
            servicosDoPavimento.length;

        soma += progressoPavimento;
    });

    return Math.round(
        soma / pavimentos.length
    );
}