let obras = [];

const formulario = document.getElementById("obra-form");

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

    console.log(obras);

    formulario.reset();
});