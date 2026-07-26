let obras = getObras();

const breadcrumb = document.getElementById("breadcrumb");
const formulario = document.getElementById("obra-form");
const tabelaObras = document.getElementById("tabela-obras");

inicializar();

function inicializar() {
    renderizarBreadcrumb();

    renderizarObras();

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        cadastrarObra();
    });
}

function renderizarBreadcrumb() {
    if (!breadcrumb) {
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

            <strong class="breadcrumb-current">
                🏢 Obras
            </strong>
        </div>
    `;
}

function cadastrarObra() {
    const obra = {
        id: Date.now(),

        nome: document.getElementById("nome").value,

        cliente: document.getElementById("cliente").value,

        endereco: document.getElementById("endereco").value,

        inicio: document.getElementById("inicio").value,

        previsao: document.getElementById("previsao").value,

        status: document.getElementById("status").value
    };

    obras.push(obra);

    salvarObras();

    renderizarObras();

    formulario.reset();
}

function salvarObras() {
    saveObras(obras);
}

function renderizarObras() {
    tabelaObras.innerHTML = "";

    obras.forEach(function (obra) {
        const linha =
            document.createElement("tr");

        linha.innerHTML = `
            <td>
                ${obra.nome}
            </td>

            <td>
                ${obra.cliente}
            </td>

            <td>
                ${obra.inicio}
            </td>

            <td>
                ${obra.previsao}
            </td>

            <td>

                <span class="status">

                    ${obra.status}

                </span>

            </td>

            <td>
                <a href="detalhes-obra.html?obraId=${obra.id}" class="btn-view btn-sm">
                    <span class="btn-icon">
                        👁
                    </span>

                    Ver detalhes
                </a>
            </td>
        `;

        tabelaObras.appendChild(linha);
    });
}