const URL = 'http://10.110.12.10:1880/getDadosCompletos';

let paginaAtual = 1;
const limite = 20;

async function carregarDados() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        preencherTabela(data);
        atualizarGrafico(data);

    } catch (erro) {
        console.error(erro);
    }
}

function preencherTabela(data) {
    const tbody = document.getElementById("tabela-body");
    tbody.innerHTML = "";

    const inicio = (paginaAtual - 1) * limite;
    const fim = inicio + limite;

    const dadosPaginados = data.slice(inicio, fim);

    dadosPaginados.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.temperatura}</td>
            <td>${item.umidade}</td>
            <td>${formatarDataHora(item.datahora)}</td>
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

function formatarDataHora(datahora) {
    return new Date(datahora).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function atualizarGrafico(data) {
    const ctx = document.getElementById("grafico");

    const temperaturas = data.map(d => d.temperatura).reverse();
    const umidades = data.map(d => d.umidade).reverse();
    const labels = data.map(d => formatarDataHora(d.datahora)).reverse();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Temperatura",
                data: temperaturas,
                borderColor: "#FF5A5F",
                tension: 0.3
            }, {
                label: "Umidade",
                data: umidades,
                borderColor: "#4DA3FF",
                tension: 0.3
            }]
        }
    });
}

carregarDados();
setInterval(carregarDados, 30000);