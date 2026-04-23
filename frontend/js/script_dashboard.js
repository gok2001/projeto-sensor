const URL = 'http://10.110.12.10:1880/getLeituraUltimosDez';

let chartTemp, chart;

async function carregarDados() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        atualizarTemp(data);
        atualizarUmid(data);
        atualizarTabela(data);
        atualizarGraficoTemp(data);
        atualizarGraficoUmid(data);

    } catch (erro) {
        console.error(erro);
    }
}

function atualizarTemp(data) {
    const valor = data[0].temperatura;
    const fill = document.getElementById("tempFill");

    fill.style.height = (valor / 50) * 100 + '%';
    document.getElementById("temp").textContent = valor + "°C";

    if (valor < 15) {
        fill.style.background = "#3B82F6";
    } else if (valor < 25) {
        fill.style.background = "#22C55E";
    } else if (valor < 35) {
        fill.style.background = "#F59E0B";
    } else {
        fill.style.background = "#EF4444";
    }
}

function atualizarUmid(data) {
    const valor = data[0].umidade;
    const fill = document.getElementById("umidFill");

    fill.style.height = valor + '%';
    document.getElementById("umid").textContent = valor + "%";

    if (valor < 30) {
        fill.style.background = "#FB923C";
    } else if (valor < 60) {
        fill.style.background = "#14B8A6";
    } else {
        fill.style.background = "#60A5FA";
    } 
}

function atualizarTabela(data) {
    const tbody = document.getElementById("tabela-body");
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.temperatura}</td>
            <td>${item.umidade}</td>
        `;

        tbody.appendChild(tr);
    });
}

function formatarDataHora(datahora) {
    return new Date(datahora).toLocaleString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function atualizarGraficoTemp(data) {
    const ctx = document.getElementById("grafico-temp");

    const valores = data.map(d => d.temperatura).reverse();
    const labels = data.map(d => formatarDataHora(d.datahora)).reverse();

    if (chartTemp) {
        chartTemp.data.labels = labels;
        chartTemp.data.datasets[0].data = valores;
        chartTemp.update();
        return;
    }

    chartTemp = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Temperatura",
                data: valores,
                borderColor: "#FF5A5F",
                tension: 0.3
            }]
        }
    });
}

/* GRÁFICO UMID */
function atualizarGraficoUmid(data) {
    const ctx = document.getElementById("grafico-umid");

    const valores = data.map(d => d.umidade).reverse();
    const labels = data.map(d => formatarDataHora(d.datahora)).reverse();

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = valores;
        chart.update();
        return;
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Umidade",
                data: valores,
                borderColor: "#4DA3FF",
                tension: 0.3
            }]
        }
    });
}

carregarDados();
setInterval(carregarDados, 30000);