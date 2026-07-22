let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];

const formulario = document.getElementById("pavimento-form");
const selectObra = document.getElementById("obra");
const listaObras = document.getElementById("lista-obras");

carregarObras();
renderizarArvore();

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
    renderizarArvore();

    console.log(pavimentos);

    formulario.reset();
}

function salvarPavimentos() {
    localStorage.setItem("pavimentos", JSON.stringify(pavimentos));
}

function renderizarArvore() {
    listaObras.innerHTML = "";

    obras.forEach(function (obra) {

        const card = document.createElement("div");
        card.className = "tree-item";

        const titulo = document.createElement("h4");
        titulo.textContent = `🏢 ${obra.nome}`;

        const lista = document.createElement("ul");
        lista.className = "tree-list";

        const pavimentosDaObra = pavimentos.filter(function (pavimento) {
            return pavimento.obraId === obra.id;
        });

        if (pavimentosDaObra.length === 0) {

            const item = document.createElement("li");
            item.textContent = "Nenhum pavimento cadastrado.";

            lista.appendChild(item);

        } else {

            pavimentosDaObra.forEach(function (pavimento) {

                const item = document.createElement("li");

                item.textContent =
                    `🏗 ${pavimento.nome} • ${pavimento.status}`;

                lista.appendChild(item);

            });

        }

        card.appendChild(titulo);
        card.appendChild(lista);

        listaObras.appendChild(card);
    });
}