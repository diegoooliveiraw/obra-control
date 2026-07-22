let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const formulario = document.getElementById("servico-form");
const selectObra = document.getElementById("obra");
const selectPavimento = document.getElementById("pavimento");

inicializar();

function inicializar() {

    carregarObras();

    selectObra.addEventListener("change", carregarPavimentos);

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Na próxima etapa faremos o salvamento do serviço.");
    });

}

function carregarObras() {

    selectObra.innerHTML = "";

    if (obras.length === 0) {

        selectObra.innerHTML =
            '<option value="">Nenhuma obra cadastrada</option>';

        return;

    }

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecione uma obra";

    selectObra.appendChild(option);

    obras.forEach(function(obra) {

        const item = document.createElement("option");

        item.value = obra.id;
        item.textContent = obra.nome;

        selectObra.appendChild(item);

    });

}

function carregarPavimentos() {

    selectPavimento.innerHTML = "";

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecione um pavimento";

    selectPavimento.appendChild(option);

    const obraSelecionada = Number(selectObra.value);

    const pavimentosDaObra = pavimentos.filter(function(pavimento) {
        return pavimento.obraId === obraSelecionada;
    });

    pavimentosDaObra.forEach(function(pavimento) {

        const item = document.createElement("option");

        item.value = pavimento.id;
        item.textContent = pavimento.nome;

        selectPavimento.appendChild(item);

    });

}