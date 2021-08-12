//Bloco responsável por chamar os dados da API e escrever na variavel data
//Lista de produtos disponíveis na Loja
const produtosDisponiveis = [
    {
        "id": "a123",
        "avaiable": 15,
        "title": "camisa groww",
        "price": 500
    },
    {
        "id": "r123",
        "avaiable": 10,
        "title": "casaco groww",
        "price": 250
    },
    {
        "id": "z123",
        "avaiable": 2,
        "title": "Cadeira Gamer Groww",
        "price": 1500
    },
    {
        "id": "b123",
        "avaiable": 100,
        "title": "Lapis groww",
        "price": 20
    },
    {
        "id": "g123",
        "avaiable": 50,
        "title": "Livro groww",
        "price": 100
    },
    {
        "id": "h123",
        "avaiable": 80,
        "title": "Fone groww",
        "price": 200
    },
    {
        "id": "t123",
        "avaiable": 10,
        "title": "Computador groww",
        "price": 10
    },
    {
        "id": "m123",
        "avaiable": 0,
        "title": "Monitor groww",
        "price": 1000
    },
]

//Cartões de crédito validos
const cardsAvaiable = [
    {
        "card_holder_name": "Thiago B Guedes",
        "card_last_digits": "4444",
        "card_fist_digits": "567890",
        "card_brand": "MasterCard",
        "card_expire_date": "04/25",
    },
    {
        "card_holder_name": "Davis Z Cabral",
        "card_last_digits": "3333",
        "card_fist_digits": "123456",
        "card_brand": "AlphaCard",
        "card_expire_date": "01/20",
    },
    {
        "card_last_digits": "2222",
        "card_fist_digits": "987654",
        "card_brand": "MasterCard",
        "card_expire_date": "06/25",
    },
    {
        "card_holder_name": "Matheus M Accioly",
        "card_last_digits": "1111",
        "card_fist_digits": "654321",
        "card_brand": "Visa",
        "card_expire_date": "09/22",
    }
]


async function readApi(apiURL = '') {
    let url = 'https://safe-sierra-45694.herokuapp.com/' + apiURL;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

//Após executar a função, a variavel data receberá o objeto vindo da API.
//Se quiser verificar o modelo, acesse o arquivo data-sample.json

async function main() {

    const urlApi = ["pagamento01", "pagamento02", "pagamento03", "pagamento04"];

    for (let getUrl of urlApi) {
        const dataReturn = await readApi(getUrl);
        //execute as funções aqui
        const nomeUser = retornaNome(dataReturn);
        console.log(nomeUser);
    }
}
main();

function retornaNome(data) {
    return `Nome do usuário: ${data.customer.name}`;
}
