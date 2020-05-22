// ALUNOS
// Mitilene Merabe
// Kayran dos Santos
// Victor Matheus Freitas

const mensagem = document.querySelector('.mensagem');
const pontuacao = document.querySelector('.pontuacao');
const buttons = document.querySelectorAll('button.padrao');
const pontuacoes = [0,0];
let erros = 0;


for ( let i = 0 ; i < buttons.length ; i++){
	buttons[i].addEventListener('click', start, false);
}
function start(e){
  //obtem escolha do usuario
  let opcaoUsuario = e.target.innerText;
  e.stopPropagation()
  jogar(opcaoUsuario.toLowerCase());
}

function jogar(opcaoUsuario){	
	
	//obtem escolha do computador por um numero aleatorio
	let opcaoComputador = Math.random();

	if (opcaoComputador < .34){
		opcaoComputador = 'pedra';
	} else if (opcaoComputador <= .67){
		opcaoComputador = 'papel';
	} else {
		opcaoComputador = 'tesoura';
	}
	
	let resultado = verificarVencedor(opcaoUsuario, opcaoComputador);

	if (resultado === 'Jogador'){
		resultado += ' venceu!';
		pontuacoes[0]++;
	}

	if (resultado === 'Computador'){
		resultado += ' venceu!';
		pontuacoes[1]++;
	}

	if (resultado === 'Empate'){
		resultado += '. Empate!'
	}

	pontuacao.innerHTML = 'Jogador: [ ' + pontuacoes[0]+ ' ] Computador: [ ' + pontuacoes[1] + ' ]';

	//Imprime as opcoes selecionadas
	ImprimeResultado('Jogador: <strong>' + opcaoUsuario + '</strong> Computador: <strong>' + opcaoComputador + '</strong><br>' + resultado);
}

function ImprimeResultado(texto){
	mensagem.innerHTML = texto;
}

function verificarVencedor(jogador, computador){
	if (jogador === computador){
		return 'Empate';
	}
	if (jogador === 'pedra'){
		if(computador === 'papel'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
	if (jogador === 'papel'){
		if (computador === 'tesoura'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
	if (jogador === 'tesoura'){
		if (computador === 'pedra'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
}

function validarPalavra(palavra){
  const validas = ['pedra', 'papel', 'tesoura'];

  return validas.includes(palavra); 
  
}


// Integração com API

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;

recognition.continuous = false;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//adiciona a pagina o evento de click para disparo da API
const recognitionEvent = function() {
	recognition.start();
	console.log('Diga algo.....');
}
document.body.addEventListener('click', recognitionEvent);

function removerEventos(){
	document.body.removeEventListener('click', recognitionEvent);
	for ( let i = 0 ; i < buttons.length ; i++){
		buttons[i].removeEventListener('click', start);
	}
	ImprimeResultado('Jogo encerrado!');
}

recognition.onresult = function(event) {
  const last = event.results.length - 1;
  //Resultado recebido do comando de voz
  const texto = event.results[last][0].transcript;
  if(!validarPalavra(texto)){
    alert(`Palavra não e valida ${texto}`)
    erros++
  } else {
	jogar(texto);
  }
  if(erros >= 3) {
  	removerEventos();
  
   }
   console.log(`Texto: ${texto}`);
   console.log(`Confidencia: ${event.results[0][0].confidence}`);
}

recognition.onspeechend = function() {
	console.log('Encerrando speech')
	recognition.stop()
}

recognition.onerror = function(event) {
	alert('Texto não reconhecido')
	console.log(`Erro no reconhecimento do texto: ${event.error}`)
}

