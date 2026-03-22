//let titulo = document.querySelector('h1');
//ele vai procurar o h1, mas nao sabe aonde
//titulo.innerHTML = 'Jogo do Número Secreto';
//aqui você diz a ele onde inner -> vai procurar no -> HTML -> e la recebera o valor de tal coisa
// mas tem uma forma mais rapida de fazer isso ao inves de escrever codigo por codigo (evita repetição)
let lista_numeros_sorteados = [];
let numero_limite  = 10;
let numero_secreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
       if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}    // este if e else é para o texto da tela ser lido em voz alta.

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}

exibirMensagemInicial() // criei essa funçao para nao ficar repetitivo la em baixo na funçao de novo jogo

// na parte de on button em html eu coloquei um nome -> verificarChute()
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numero_secreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavra_tentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagem_tentativa = `Você descobriu o número secreto com ${tentativas} ${palavra_tentativa}!`;
        // temos que criar essa variavel pq o HTML pode acabar nao conseguindo ler a formatação e nao reconhecer
        exibirTextoNaTela('p', mensagem_tentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numero_secreto) {
            exibirTextoNaTela('p','O número secreto é menor');
        } else {
            exibirTextoNaTela ('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
    let numero_escolhido = parseInt(Math.random() * numero_limite + 1);
    let quantidade_elementos_lista = lista_numeros_sorteados.length;

    if (quantidade_elementos_lista == numero_limite) {
        lista_numeros_sorteados = [];
    }

    if (lista_numeros_sorteados.includes(numero_escolhido)) { // aqui vou ver se o numero esta incluido na lista para o numero nao se repetir. 2x seguidas
        return numeroAleatorio();
    } else {
        lista_numeros_sorteados.push(numero_escolhido); // coloco na lista para quando for na proxima vez ele (numero) n se repetir.
        console.log(lista_numeros_sorteados);
        return numero_escolhido; // se ele nao tem entao retorna ao numero q tinha sido escolhido anteriormente.
    }
    // esse return e para retornar o valor la pra cima, se nao tivesse o return esse valor nao iria pra lugar nenhum.
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numero_secreto = numeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
