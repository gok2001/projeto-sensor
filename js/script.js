async function carregarTabela() {
    try {
        const response = await fetch('http://10.110.12.7:1880/getSensor');
        const data = await response.json();
        
        atualizarTabela(data);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

function atualizarTabela(data) {
    const tbody = document.querySelector('#tabela-simples tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const linha = `
            <tr>
                <td>${item.temperatura}</td>
                <td>${item.Umidade}</td>
            </tr>
        `;
        tbody.innerHTML += linha;
    });
}

carregarTabela();
