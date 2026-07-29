const parametros =
    new URLSearchParams(
        window.location.search
    );

const obraParametro =
    parametros.get("obraId");


const obraSelecionada =
    obraParametro
        ? Number(obraParametro)
        : null;

const breadcrumb = document.getElementById("breadcrumb");
const formulario = document.getElementById("pavimento-form");
const selectObra = document.getElementById("obra");
const listaObras = document.getElementById("lista-obras");

inicializar();

function inicializar() {
    carregarObras();
    renderizarBreadcrumb();
    renderizarArvore();

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        cadastrarPavimento();
    });
}

function carregarObras() {
    const obras = obrasService.listar();

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

    pavimentosService.criar(pavimento);

    renderizarArvore();

    formulario.reset();
}

function renderizarArvore() {
    const obras = obrasService.listar();
    const pavimentos = pavimentosService.listar();
    const servicos = servicosService.listar();

    listaObras.innerHTML = "";

    const obrasExibidas =
        obraSelecionada
            ? obras.filter(function (obra) {

                return obra.id === obraSelecionada;
            })
            : obras;

    obrasExibidas.forEach(function (obra) {

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

                const indicadores = calcularIndicadoresPavimento(
                    pavimento.id,
                    servicos
                );

                item.innerHTML = `
                    <div class="pavimento-card">
                        <div class="pavimento-header">
                            <div>
                                <h4>🏗 ${pavimento.nome}</h4>
                            </div>

                            <span class="tree-badge ${status.classe}">
                                ${status.icone}
                                ${status.texto}
                            </span>
                        </div>

                        <div class="pavimento-progress">
                            <div class="pavimento-progress-header">
                                <span>
                                    Progresso do pavimento
                                </span>

                                <strong>
                                    ${progresso}%
                                </strong>
                            </div>

                            <div class="pavimento-progress-bar">
                                <div
                                    class="pavimento-progress-fill"
                                    style="width:${progresso}%">
                                </div>
                            </div>
                        </div>

                        <div class="pavimento-indicadores">
                            <div class="indicador-card">
                                <span>
                                    📋
                                </span>

                                <strong>
                                    ${indicadores.total}
                                </strong>

                                <small>
                                    Serviços
                                </small>
                            </div>

                            <div class="indicador-card indicador-concluido">
                                <span>
                                    🟢
                                </span>

                                <strong>
                                    ${indicadores.concluidos}
                                </strong>

                                <small>
                                    Concluídos
                                </small>
                            </div>

                            <div class="indicador-card indicador-andamento">
                                <span>
                                    🟡
                                </span>

                                <strong>
                                    ${indicadores.andamento}
                                </strong>

                                <small>
                                    Em andamento
                                </small>
                            </div>

                            <div class="indicador-card indicador-planejamento">
                                <span>
                                    ⚪
                                </span>

                                <strong>
                                    ${indicadores.planejamento}
                                </strong>

                                <small>
                                    Planejamento
                                </small>
                            </div>
                        </div>
                    </div>
                `;

                lista.appendChild(item);
            });
        }

        card.appendChild(lista);

        listaObras.appendChild(card);
    });
}

function renderizarBreadcrumb() {
    const obras = obrasService.listar();
    
    if (!breadcrumb) {
        return;
    }

    if (!obraSelecionada) {
        breadcrumb.innerHTML = `
            <div class="breadcrumb">
                <a href="../index.html">
                    📊 Dashboard
                </a>

                <span class="breadcrumb-separator">
                    ›
                </span>

                <strong class="breadcrumb-current">
                    🏗 Pavimentos
                </strong>
            </div>
        `;

        return;
    }

    const obra =
        obras.find(function (item) {

            return item.id === obraSelecionada;
        });

    if (!obra) {
        return;
    }

    breadcrumb.innerHTML = `
        <div class="breadcrumb">
            <a href="../index.html">
                📊 Dashboard
            </a>

            <span class="breadcrumb-separator">
                ›
            </span>

            <a href="obras.html">
                🏢 Obras
            </a>

            <span class="breadcrumb-separator">
                ›
            </span>

            <strong>
                ${obra.nome}
            </strong>

            <span class="breadcrumb-separator">
                ›
            </span>

            <strong class="breadcrumb-current">
                🏗 Pavimentos
            </strong>
        </div>
    `;
}