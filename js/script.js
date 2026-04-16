async function carregarDados() {
    try {
        const url = 'http://10.110.12.7:1880/getSensor';
        const response = await fetch(url);
        const data = await response.json();

        atualizarTemp(data);
        atualizarUmid(data);
        atualizarTabela(data);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

function atualizarTemp(data) {
    const p = document.querySelector('#temperatura p');
    p.innerHTML = '';

    p.innerHTML = `${data[0].temperatura} °C`;
}

function atualizarUmid(data) {
    const p = document.querySelector('#umidade p');
    p.innerHTML = '';

    p.innerHTML = `${data[0].Umidade} %`;
}

function atualizarTabela(data) {
    const tbody = document.querySelector('#tabela-simples tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const linhaTabela = `
            <tr>
                <td>${item.temperatura}</td>
                <td>${item.Umidade}</td>
            </tr>
        `;
        tbody.innerHTML += linhaTabela;
    });
}

carregarDados();
