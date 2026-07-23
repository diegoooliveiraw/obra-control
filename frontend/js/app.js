const obras = JSON.parse(localStorage.getItem("obras")) || [];
const pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const totalObras = document.getElementById("total-obras");
const totalPavimentos = document.getElementById("total-pavimentos");
const totalServicos = document.getElementById("total-servicos");
const totalConcluidos = document.getElementById("total-concluidos");

inicializar();

function inicializar() {
    atualizarIndicadores();
}

function atualizarIndicadores() {

    totalObras.textContent = obras.length;

    totalPavimentos.textContent = pavimentos.length;

    totalServicos.textContent = servicos.length;

    const concluidos = servicos.filter(function(servico) {
        return servico.status === "Concluído";
    });

    totalConcluidos.textContent = concluidos.length;

}