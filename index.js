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


async function readApi(pagamento) {
    let url = `https://safe-sierra-45694.herokuapp.com/${pagamento}`;
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
      console.log(` ***${getUrl.toUpperCase()}***`);
      cartao.executar(dataReturn)
      verificaQtdeItens(dataReturn);
      scoreAntiFraude(dataReturn);
    }
}
main();

// Larissa

function retornaNome(pagamento) {
    return pagamento.customer.name
  }
  
  function retornaBoleto(pagamento) {
    if (pagamento.boleto_url && pagamento.boleto_barcode && pagamento.boleto_expiration_date) {
      console.log(`URL do boleto: ${pagamento.boleto_url}`)
      console.log(`Codigo de barras do boleto: ${pagamento.boleto_barcode}`)
      console.log(`Data expiração do boleto: ${pagamento.boleto_expiration_date}`)
    } else {
      console.log(`Forma de pagamento: cartão.`)
    }
  }
  
  const cartao = {
    status: [],
    executar: function(pagamento) {
      console.log(`Cliente: ${retornaNome(pagamento)}`)
      cartao.nomeValido(pagamento)
      cartao.bandeira(pagamento)
      cartao.digitos(pagamento)
      cartao.verficarData(pagamento)
      cartao.verificarDataLocal(pagamento)
      retornaBoleto(pagamento)
      console.log(`Válido para compra: ${cartao.validoParaCompra()}`)
    },
    
    nomeValido: function(pagamento) {
      let situacao = false;
      for (let cartao of cardsAvaiable) {
        let titularCartao = cartao.card_holder_name
        if (titularCartao != undefined) {
          if (titularCartao == pagamento.card_holder_name) {
            situacao = true
          }
        }
      }
      this.status.push(situacao)
      return situacao
    },
  
    bandeira: function(pagamento) {
      let situacao = false
      for (let cartao of cardsAvaiable) {
        if (pagamento.card_brand != undefined && pagamento.card_brand == cartao.card_brand) {
          situacao = true
        }
      }
      this.status.push(situacao)
      return situacao
    },
    digitos: function(pagamento) {
      let situacao = false
      let cartaoAPI = `${pagamento.card_fist_digits}${pagamento.card_last_digits}`
  
      for (let cartao of cardsAvaiable) {
        let cartaoJSON = `${cartao.card_fist_digits}${cartao.card_last_digits}`
        if (cartaoAPI == cartaoJSON) {
          situacao = true
        }
      }
      this.status.push(situacao)
      return situacao
  
    },
  
    verficarData: function(pagamento) {
      let situacao = false
      let dataCartaoAPI = pagamento.card_expire_date
      for (let cartao of cardsAvaiable) {
        if (dataCartaoAPI == cartao.card_expire_date) {
          situacao = true
        }
      }
      this.status.push(situacao)
      return situacao
    },

    verificarDataLocal: function(pagamento) {
      let situacao = false
      let dataAtual = new Date() 
      dataAtual = ((dataAtual.getMonth() + 1).toString().padStart(2, '0') + "/" + dataAtual.getFullYear().toString().substring(2,4)).split("/");
      let dataExpiracao = pagamento.card_expire_date.split("/")
      if (dataAtual[0] <=dataExpiracao[0]) {
        situacao = true
      } 
      if (dataAtual[1] <= dataExpiracao[1]) {
        situacao = true
      } else {
        situacao = false
      }
      this.status.push(situacao)
      return situacao
    },
    validoParaCompra: function() {
      let old = this.status
      this.status = []
      if (old.includes(false)) {
        return false
      }
      return true
    }
 }

 //Ludmila

const verificaQtdeItens = (pagamento) => {
  let mensagem;
  for(produto of pagamento.items){
    let idComprados = produto.id;
    let qtdeComprados = produto.quantity;

    for (let i = 0; i < produtosDisponiveis.length; i++){
      let produtoDisponivel = produtosDisponiveis[i].id;
      let qtdeDisponivel = produtosDisponiveis[i].avaiable;
      if (produtoDisponivel === idComprados && qtdeDisponivel >= qtdeComprados){
        mensagem = `Produto: ${produtoDisponivel}. Quantidade: ${qtdeDisponivel}. \nQuantidade comprada: ${qtdeComprados}`;
      } else if (produtoDisponivel === idComprados && qtdeDisponivel < qtdeComprados){
        mensagem = `Produto não disponível! \nQuantidade em estoque: ${qtdeDisponivel}`;
      }
    }
    console.log(mensagem);
  }
};
 
const scoreAntiFraude = (pagamento) => {
  if (pagamento.antifraud_score >= 0 && pagamento.antifraud_score <= 49){
    console.log(`*** Status *** \nQualquer compra é permitida`);
  } else if (pagamento.antifraud_score >= 50 && pagamento.antifraud_score <= 69){
    console.log(`*** Status *** \nLimite de compra é até 20 mil`);
  } else if (pagamento.antifraud_score >= 70 && pagamento.antifraud_score <= 89){
    console.log(`*** Status *** \nLimite de compra é até 10 mil`);
  } else if (pagamento.antifraud_score > 90){
    console.log(`*** Status *** \nNão será possível processar a compra`);
  }
};

//Nathália
