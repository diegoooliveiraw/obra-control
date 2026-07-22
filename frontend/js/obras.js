let obras = [];

const formulario = document.getElementById("obra-form");
const tabelaObras = document.getElementById("tabela-obras");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const obra = {
        id: obras.length + 1,
        nome: document.getElementById("nome").value,
        cliente: document.getElementById("cliente").value,
        endereco: document.getElementById("endereco").value,
        inicio: document.getElementById("inicio").value,
        previsao: document.getElementById("previsao").value,
        status: document.getElementById("status").value
    };

    obras.push(obra);

    renderizarObras();

    formulario.reset();
});


function renderizarObras() {
    tabelaObras.innerHTML = "";

    obras.forEach(function(obra) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${obra.nome}</td>
            <td>${obra.cliente}</td>
            <td>${obra.inicio}</td>
            <td>${obra.previsao}</td>
            <td>
                <span class="status">
                    ${obra.status}
                </span>
            </td>
        `;

        tabelaObras.appendChild(linha);
    });
}