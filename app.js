let lista_numeros_sorteados = [];
let verde = "text_verde";
let vermelho = "text_vermelho";
let tentativas = 1;
let numero_limite = 100;
let numero_secreto = numero_aleatorio();
let chute = null;

function numero_aleatorio(){
    let n_secreto = parseInt(Math.random()*numero_limite+1);
    let tamanho_da_lista = lista_numeros_sorteados.length;

    if (tamanho_da_lista == numero_limite){
        lista_numeros_sorteados = [];
    }
    console.log(n_secreto);
    if (lista_numeros_sorteados.includes(n_secreto)){
        return numero_aleatorio();
    }else{
        lista_numeros_sorteados.push(n_secreto);
        console.log(lista_numeros_sorteados);
        return n_secreto;
    }
}

function mensagem_inicial(){
    seletor_de_texto(".titulo_principal", "O Jogo do Número Secreto");
    seletor_de_texto('.texto__paragrafo', `escolha um numero entre 1 e ${numero_limite}`);
}

function seletor_de_texto(tag,texto,cor=null, collor_remove) {
    let campo = document.querySelector(`${tag}`)
    campo.innerHTML = `${texto}`
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
    if (cor != null){
        campo.classList.remove(collor_remove);
        campo.classList.add(cor);
    }else{
        campo.classList.remove(verde);
        campo.classList.remove(vermelho);
    }
}

function limpar_campo(){
   chute = document.querySelector(".container__input")
   chute.value = '';
}

function new_game(){
    numero_secreto = numero_aleatorio();
    limpar_campo();
    tentativas =1;
    mensagem_inicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
}

function verificar_chute(){
    chute = document.querySelector(".container__input").value;
    if (chute == numero_secreto){
        seletor_de_texto(".titulo_principal","Acertou",verde,vermelho);
        seletor_de_texto(".texto__paragrafo",`O número secreto realmente é: ${numero_secreto} e você acertou na ${tentativas}º tentativa`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else{ tentativas++;
            let maxmin = chute>numero_secreto? "Menor":"Maior"
            seletor_de_texto(".titulo_principal","ERROU",vermelho,verde);
            seletor_de_texto(".texto__paragrafo", `O número secreto é ${maxmin} do que: ${chute}`);
            limpar_campo();
    }
}

mensagem_inicial();

