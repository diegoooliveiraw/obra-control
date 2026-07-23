const obras = JSON.parse(localStorage.getItem("obras")) || [];

const pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];

const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const container = document.getElementById("detalhes-obra");

inicializar();

function inicializar() {
    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const obraId =
        Number(
            parametros.get("id")
        );

    carregarDetalhes(obraId);
}

function carregarDetalhes(obraId) {
    const obra =
        obras.find(function (item) {
            return item.id === obraId;
        });

    if (!obra) {
        container.innerHTML = `
            <h2>
                Obra não encontrada.
            </h2>
        `;

        return;
    }

    const progresso =
        calcularProgressoObra(
            obra.id,
            pavimentos,
            servicos
        );

    registrarHistoricoMensal(
        obra.id,
        progresso
    );

    const status =
        obterStatusProgresso(
            progresso
        );

    const pavimentosDaObra =
        pavimentos.filter(function (pavimento) {
            return pavimento.obraId === obra.id;
        });

    const quantidadeServicos =
        servicos.filter(function (servico) {
            return pavimentosDaObra.some(function (pavimento) {
                return pavimento.id === servico.pavimentoId;
            });
        }).length;

    container.innerHTML = `
        <div class="details-card">
            <h2>
                🏢 ${obra.nome}
            </h2>

            <p>
                Cliente:
                <strong>
                    ${obra.cliente}
                </strong>
            </p>

            <p>
                Início:
                <strong>
                    ${obra.inicio}
                </strong>
            </p>

            <p>
                Previsão:
                <strong>
                    ${obra.previsao}
                </strong>
            </p>

            <hr>

            <h3>
                Progresso
            </h3>

            <div class="progress-bar">
                <div 
                    class="progress-fill"
                    style="width:${progresso}%">

                    ${progresso}%
                </div>
            </div>

            <span class="tree-badge ${status.classe}">
                ${status.icone}
                ${status.texto}
            </span>

            <div class="summary-grid">
                <div>
                    <h4>
                        🏗 Pavimentos
                    </h4>

                    <strong>
                        ${pavimentosDaObra.length}
                    </strong>
                </div>

                <div>
                    <h4>
                        📋 Serviços
                    </h4>

                    <strong>
                        ${quantidadeServicos}
                    </strong>
                </div>
            </div>

            <div id="historico">

            </div>
        </div>
    `;

    carregarHistorico(obra.id);
}

function carregarHistorico(obraId) {
    const area = document.getElementById("historico");

    const registros =
        historico.filter(function (item) {
            return item.obraId === obraId;
        });

    if (registros.length === 0) {
        area.innerHTML = `
            <div class="history-card">
                <h3>
                    📈 Histórico de Evolução
                </h3>

                <p>
                    Nenhum histórico registrado.
                </p>
            </div>
        `;

        return;
    }

    let html = `
        <div class="history-card">
            <h3>
                📈 Histórico de Evolução
            </h3>

            <div class="timeline">
    `;

    registros.forEach(function (item) {
        const partes =
            item.mes.split("-");

        const ano = partes[0];

        const mes = partes[1];

        const nomesMeses = [
            "",
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        html += `
            <div class="timeline-item">
                <div class="timeline-dot">

                </div>

                <div class="timeline-content">
                    <h4>
                        ${nomesMeses[Number(mes)]}/${ano}
                    </h4>

                    <span>
                        Progresso:
                        <strong>
                            ${item.progresso}%
                        </strong>
                    </span>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    area.innerHTML = html;
}