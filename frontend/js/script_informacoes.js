const URL = 'http://10.110.12.77:1880/getSensor';

let paginaAtual = 1;
const limite = 10;

async function carregarDados() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        preencherTabela(data);
    } catch (erro) {
        console.log(erro)
    }
    fetch(`/dados?pagina=${paginaAtual}`)
        .then(res => res.json())
        .then(dados => {
            preencherTabela(dados);
            atualizarInfo();
    });
}

function preencherTabela(dados) {
    const tbody = document.getElementById('tabela-body');
    tbody.innerHTML = '';

    dados.forEach(item => {
        const linha = `
            <tr>
                <td>${item.id}</td>
                <td>${item.temperatura}</td>
                <td>${item.umidade}</td>
                <td>${item.datahora}</td>
            </tr>
        `;
        tbody.innerHTML += linha;
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

function atualizarInfo() {
    document.getElementById('pagina-info').innerText = `Página ${paginaAtual}`;
}

carregarDados();