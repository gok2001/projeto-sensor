async function carregarDados() {
    try {
        const url = 'http://10.110.12.50:1880/getSensor';
        const response = await fetch(url);
        const data = await response.json();

        atualizarTemp(data);
        atualizarUmid(data);
        atualizarTabela(data);
        atualizarGraficoTemp(data);
        atualizarGraficoUmid(data);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

function atualizarTemp(data) {
    let porcentagem = (data[0].temperatura / 50) * 100;
    document.getElementById("tempFill").style.height = porcentagem + '%';

    const p = document.querySelector('#temperatura p');
    p.innerHTML = '';

    p.innerHTML = `${data[0].temperatura} °C`;
}

function atualizarUmid(data) {
    const p = document.querySelector('#umidade p');
    p.innerHTML = '';

    p.innerHTML = `${data[0].umidade} %`;
}

function atualizarTabela(data) {
    const tbody = document.querySelector('#tabela-simples tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const linhaTabela = `
            <tr>
                <td>${item.temperatura}</td>
                <td>${item.umidade}</td>
            </tr>
        `;
        tbody.innerHTML += linhaTabela;
    });
}

function atualizarGraficoTemp(data) {
    const grafico = document.getElementById('grafico-temp');
    const ctx = grafico.getContext('2d');
    
    const temperaturas = data.map(item => item.temperatura);
    temperaturas.reverse();

    const dataHora = data.map(item => {
        const d = new Date(item.datahora);
        return d.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    });
    dataHora.reverse();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataHora,
            datasets: [{
                label: 'Temperatura',
                data: temperaturas,
                borderColor: '#FF5A5F',
                backgroundColor: '#FF5A5F'
            }]
        }
    });
}

function atualizarGraficoUmid(data) {
    const grafico = document.getElementById('grafico-umid');
    const ctx = grafico.getContext('2d');

    const umidades = data.map(item => item.umidade);
    umidades.reverse();

    const dataHora = data.map(item => {
        const d = new Date(item.datahora);
        return d.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    });
    dataHora.reverse();
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataHora,
            datasets: [{
                label: 'Umidade',
                data: umidades,
                borderColor: '#4DA3FF',
                backgroundColor: '#4DA3FF'
            }]
        }
    });
}

carregarDados();
