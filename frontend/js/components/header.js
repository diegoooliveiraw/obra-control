function carregarHeader() {

    const headerContainer =
        document.querySelector("#header-container");

    if (!headerContainer) {
        return;
    }

    headerContainer.innerHTML = `
        <header class="header">
            <h1>
                ${document.title.split("|")[0].trim()}
            </h1>

            <div class="user-area">
                Diego Oliveira
            </div>
        </header>
    `;
}

carregarHeader();