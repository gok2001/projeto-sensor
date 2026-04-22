const URL = 'http://10.110.12.10:1880/getDadosCompletos';

let paginaAtual = 1;
const limite = 10;

async function carregarDados() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        preencherTabela(data);

    } catch (erro) {
        console.error(erro)
    }
}

function preencherTabela(data) {
    const tbody = document.getElementById("tabela-body");
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.temperatura}</td>
            <td>${item.umidade}</td>
            <td>${item.datahora}</td>
        `;

        tbody.appendChild(tr);
    });
}

function avancar() {
    paginaAtual++;
    carregarDados();
}

function voltar() {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarDados();
    }
}

carregarDados();
setInterval(carregarDados, 2000);