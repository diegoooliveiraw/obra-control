let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];

const formulario = document.getElementById("pavimento-form");
const selectObra = document.getElementById("obra");

carregarObras();

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    cadastrarPavimento();
});

function carregarObras() {
    if (obras.length === 0) {
        selectObra.innerHTML = '<option value="">Nenhuma obra cadastrada</option>';
        return;
    }

    obras.forEach(function (obra) {
        const option = document.createElement("option");
        option.value = obra.id;
        option.textContent = obra.nome;

        selectObra.appendChild(option);
    });
}

function cadastrarPavimento() {
    if (
        !selectObra.value ||
        !document.getElementById("nome").value.trim()
    ) {
        alert("Selecione uma obra e informe o nome do pavimento.");
        return;
    }

    const pavimento = {
        id: Date.now(),
        obraId: Number(document.getElementById("obra").value),
        nome: document.getElementById("nome").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        status: document.getElementById("status").value
    };

    pavimentos.push(pavimento);

    salvarPavimentos();

    console.log(pavimentos);

    formulario.reset();
}

function salvarPavimentos() {
    localStorage.setItem("pavimentos", JSON.stringify(pavimentos));
}