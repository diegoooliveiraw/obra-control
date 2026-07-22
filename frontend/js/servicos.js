let obras = JSON.parse(localStorage.getItem("obras")) || [];
let pavimentos = JSON.parse(localStorage.getItem("pavimentos")) || [];
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

function inicializar() {
    console.log("Módulo de Serviços iniciado.");
}

inicializar();