let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];

const formulario = document.getElementById("pavimento-form");
const selectObra = document.getElementById("obra");

carregarObras();

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