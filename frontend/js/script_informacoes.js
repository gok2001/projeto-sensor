const URL = 'http://10.110.12.10:1880/getDadosCompletos';

let dados = [];
let dadosFiltrados = [];

let chart;

let paginaAtual = 1;
const limite = 20;

async function carregarDados() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        dados = data;

        preencherTabela(dados);
        atualizarGrafico(dados);

    } catch (erro) {
        console.error(erro);
    }
}

function aplicarFiltro() {
    const inicio = document.getElementById("data-inicio").value;
    const fim = document.getElementById("data-fim").value;

    const dataInicio = inicio ? new Date(inicio) : null;
    const dataFim = fim ? new Date(fim) : null;

    dadosFiltrados = dados.filter(item => {
        const dataItem = new Date(item.datahora);

        return (!dataInicio || dataItem >= dataInicio) && (!dataFim || dataItem <= dataFim);
    });

    paginaAtual = 1;

    preencherTabela(dadosFiltrados);
    atualizarGrafico(dadosFiltrados);
}

function limparFiltro() {
    dadosFiltrados = [];
    paginaAtual = 1;

    preencherTabela(dados);
    atualizarGrafico(dados);
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
    const base = dadosFiltrados.length ? dadosFiltrados : dados;

    const totalPaginas = Math.ceil(base.length / limite);
    
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        preencherTabela(base);
    }
}

function voltar() {
    const base = dadosFiltrados.length ? dadosFiltrados : dados;

    if (paginaAtual > 1) {
        paginaAtual--;
        preencherTabela(base);
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

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = temperaturas;
        chart.data.datasets[1].data = umidades;
        chart.update();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Temperatura",
                data: temperaturas,
                borderColor: "#FF5A5F",
                tension: 0.3,
                pointRadius: 0
            }, {
                label: "Umidade",
                data: umidades,
                borderColor: "#4DA3FF",
                tension: 0.3,
                pointRadius: 0
            }]
        }
    });
}

carregarDados();
setInterval(carregarDados, 30000);