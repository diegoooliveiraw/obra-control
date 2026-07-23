let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const formulario = document.getElementById("servico-form");
const selectObra = document.getElementById("obra");
const selectPavimento = document.getElementById("pavimento");
const estruturaServicos = document.getElementById("estrutura-servicos");

inicializar();

function inicializar() {
    carregarObras();
    renderizarEstrutura();

    selectObra.addEventListener("change", carregarPavimentos);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        cadastrarServico();
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

    obras.forEach(function (obra) {
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

    const pavimentosDaObra = pavimentos.filter(function (pavimento) {
        return pavimento.obraId === obraSelecionada;
    });

    pavimentosDaObra.forEach(function (pavimento) {
        const item = document.createElement("option");
        item.value = pavimento.id;
        item.textContent = pavimento.nome;
        selectPavimento.appendChild(item);
    });
}

function cadastrarServico() {

    if (
        !selectObra.value ||
        !selectPavimento.value ||
        !document.getElementById("nome").value.trim()
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const servico = {
        id: Date.now(),
        pavimentoId: Number(selectPavimento.value),
        nome: document.getElementById("nome").value.trim(),
        status: document.getElementById("status").value
    };

    servicos.push(servico);

    salvarServicos();
    renderizarEstrutura();

    formulario.reset();
    selectPavimento.innerHTML =
        '<option value="">Selecione um pavimento</option>';
}

function salvarServicos() {
    localStorage.setItem("servicos", JSON.stringify(servicos));
}

function renderizarEstrutura() {
    estruturaServicos.innerHTML = "";

    obras.forEach(function (obra) {

        const obraCard = document.createElement("div");
        obraCard.className = "tree-item";

        const progressoObra = calcularProgressoObra(obra.id);

        const tituloObra = document.createElement("h4");

        tituloObra.innerHTML = `
            🏢 ${obra.nome}

            <span class="tree-badge">
                ${progressoObra}%
            </span>
        `;

        obraCard.appendChild(tituloObra);

        const barra = document.createElement("div");

        barra.className = "progress-bar";

        barra.innerHTML = `
            <div
                class="progress-fill"
                style="width: ${progressoObra}%;">
            </div>
        `;

        obraCard.appendChild(barra);

        const listaPavimentos = document.createElement("ul");
        listaPavimentos.className = "tree-list";

        const pavimentosDaObra = pavimentos.filter(function (pavimento) {
            return pavimento.obraId === obra.id;
        });

        if (pavimentosDaObra.length === 0) {

            const item = document.createElement("li");
            item.textContent = "Nenhum pavimento cadastrado.";

            listaPavimentos.appendChild(item);

        } else {

            pavimentosDaObra.forEach(function (pavimento) {

                const itemPavimento = document.createElement("li");

                const progressoPavimento =
                    calcularProgressoPavimento(pavimento.id);


                itemPavimento.innerHTML = `
                    <strong>
                        🏗 ${pavimento.nome}
                    </strong>

                    <span class="tree-badge">
                        ${progressoPavimento}%
                    </span>
                `;

                const listaServicos = document.createElement("ul");
                listaServicos.className = "tree-list";

                const servicosDoPavimento = servicos.filter(function (servico) {
                    return servico.pavimentoId === pavimento.id;
                });

                if (servicosDoPavimento.length === 0) {

                    const item = document.createElement("li");
                    item.textContent = "Nenhum serviço cadastrado.";

                    listaServicos.appendChild(item);

                } else {

                    servicosDoPavimento.forEach(function (servico) {

                        const itemServico = document.createElement("li");

                        itemServico.innerHTML = `
                            📋 ${servico.nome}

                            <span class="tree-badge ${obterClasseStatus(servico.status)}">
                                ${servico.status}
                            </span>
                        `;

                        listaServicos.appendChild(itemServico);

                    });

                }

                itemPavimento.appendChild(listaServicos);

                listaPavimentos.appendChild(itemPavimento);

            });

        }

        obraCard.appendChild(listaPavimentos);

        estruturaServicos.appendChild(obraCard);
    });
}

function obterClasseStatus(status) {
    if (status === "Concluído") {
        return "status-concluido";
    }

    if (status === "Em andamento") {
        return "status-andamento";
    }

    return "status-planejamento";
}

function calcularProgressoPavimento(pavimentoId) {
    const servicosDoPavimento = servicos.filter(function(servico) {
        return servico.pavimentoId === pavimentoId;
    });


    if (servicosDoPavimento.length === 0) {
        return 0;
    }


    const concluidos = servicosDoPavimento.filter(function(servico) {

        return servico.status === "Concluído";

    });


    return Math.round(
        (concluidos.length / servicosDoPavimento.length) * 100
    );
}

function calcularProgressoObra(obraId) {
    const pavimentosDaObra = pavimentos.filter(function (pavimento) {
        return pavimento.obraId === obraId;
    });

    if (pavimentosDaObra.length === 0) {
        return 0;
    }

    let soma = 0;

    pavimentosDaObra.forEach(function (pavimento) {
        soma += calcularProgressoPavimento(pavimento.id);
    });

    return Math.round(soma / pavimentosDaObra.length);
}