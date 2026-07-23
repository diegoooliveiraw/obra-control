let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const formulario = document.getElementById("pavimento-form");
const selectObra = document.getElementById("obra");
const listaObras = document.getElementById("lista-obras");

inicializar();

function inicializar() {
    carregarObras();
    renderizarArvore();

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        cadastrarPavimento();
    });
}

function carregarObras() {
    selectObra.innerHTML = "";

    if (obras.length === 0) {
        selectObra.innerHTML = '<option value="">Nenhuma obra cadastrada</option>';
        return;
    }

    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione uma obra";
    selectObra.appendChild(optionPadrao);

    obras.forEach(function (obra) {
        const option = document.createElement("option");
        option.value = obra.id;
        option.textContent = obra.nome;

        selectObra.appendChild(option);
    });
}

function cadastrarPavimento() {

    if (!selectObra.value || !document.getElementById("nome").value.trim()) {
        alert("Selecione uma obra e informe o nome do pavimento.");
        return;
    }

    const pavimento = {
        id: Date.now(),
        obraId: Number(selectObra.value),
        nome: document.getElementById("nome").value.trim(),
        descricao: document.getElementById("descricao").value.trim()
    };

    pavimentos.push(pavimento);

    salvarPavimentos();

    renderizarArvore();

    formulario.reset();
}

function salvarPavimentos() {
    localStorage.setItem("pavimentos", JSON.stringify(pavimentos));
}

function renderizarArvore() {

    listaObras.innerHTML = "";

    obras.forEach(function (obra) {

        const pavimentosDaObra = pavimentos.filter(function (pavimento) {
            return pavimento.obraId === obra.id;
        });

        const quantidade = pavimentosDaObra.length;
        
        const progresso = calcularProgressoObra(
            obra.id,
            pavimentos,
            servicos
        );

        const card = document.createElement("div");
        card.className = "tree-item";

        card.innerHTML = `
            <div class="tree-header">

                <div class="tree-info">
                    <h4>🏢 ${obra.nome}</h4>

                    <span class="tree-badge">
                        ${quantidade} pavimento(s)
                    </span>

                    <small>Status: Em andamento</small>
                </div>

                <div class="progress-container">

                    <div class="progress-text">
                        Progresso Geral
                    </div>

                    <div class="progress-bar">
                        <div
                            class="progress-fill"
                            style="width: ${progresso}%;">
                        </div>
                    </div>

                    <div class="progress-text">
                        ${progresso}%
                    </div>

                </div>

            </div>
        `;

        const lista = document.createElement("ul");
        lista.className = "tree-list";

        if (pavimentosDaObra.length === 0) {

            const item = document.createElement("li");
            item.textContent = "Nenhum pavimento cadastrado.";

            lista.appendChild(item);

        } else {

            pavimentosDaObra.forEach(function (pavimento) {
                const item = document.createElement("li");

                const progresso = calcularProgressoPavimento(
                    pavimento.id,
                    servicos
                );

                const status = obterStatusProgresso(
                    progresso
                );

                item.innerHTML = `
                    🏗 ${pavimento.nome}

                    <span class="tree-badge">
                        ${progresso}%
                    </span>

                    <span class="tree-badge ${status.classe}">
                        ${status.icone}
                        ${status.texto}
                    </span>
                `;

                lista.appendChild(item);
            });
        }

        card.appendChild(lista);

        listaObras.appendChild(card);
    });
}