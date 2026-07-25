function carregarSidebar() {
    const sidebar =
        document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }

    const estaNaPastaPages =
        window.location.pathname.includes("/pages/");

    const prefixo =
        estaNaPastaPages
            ? ""
            : "pages/";


    sidebar.innerHTML = `
        <div class="logo">
            <h2>🏗 Obra Control</h2>
        </div>

        <nav class="menu">
            <a href="${estaNaPastaPages ? "../index.html" : "index.html"}">
                <span class="menu-icon">📊</span>

                <span class="menu-text">Dashboard</span>
            </a>

            <a href="${prefixo}obras.html">
                <span class="menu-icon">🏢</span>

                <span class="menu-text">Obras</span>
            </a>

            <a href="${prefixo}pavimentos.html">
                <span class="menu-icon">🏗</span>

                <span class="menu-text">Pavimentos</span>
            </a>

            <a href="${prefixo}servicos.html">
                <span class="menu-icon">📋</span>

                <span class="menu-text">Serviços</span>
            </a>

            <a href="#">
                <span class="menu-icon">📈</span>

                <span class="menu-text">Relatórios</span>
            </a>

            <a href="#">
                <span class="menu-icon">⚙️</span>

                <span class="menu-text">Configurações</span>
            </a>
        </nav>
    `;
}