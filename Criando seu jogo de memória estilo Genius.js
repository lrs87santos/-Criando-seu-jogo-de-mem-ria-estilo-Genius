<!-- Leonardo Santos -->
<!-- Projeto Jogo Genius da Digital Innovation One-->

<!DOCTYPE html>

<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Genius</title>
</head>

<body>

    <header>
        <h1>Jogo Genius</h1>
    </header>

    <div class="main-game">

        <div class="genius">
            <div class="blue"></div>
            <div class="yellow"></div>
            <div class="red"></div>
            <div class="green"></div>
        </div>

    </div>

    <!-- Logica do jogo -->
    <script type="text/javascript" src="script.js"></script>

    <!-- Sons incluidos no jogo -->
    <audio src="sons/explosao.mp3" preload="auto" id="somExplosao"></audio>

</body>
</html>

body {
    margin: 0;
    background-color: rgb(208, 255, 239);
    background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
}

h1{
    text-align: right;
    text-transform: uppercase;
    font-weight: bolder;
    color: blue;
    font-size:xx-large;
    padding: 5px;
}

.main-game {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.genius {
    display: grid;
    grid-template-areas: 'verde vermelho'
    'amarelo azul';
    grid-gap: 10px;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    border-radius: 100%;
    width: 500px;
    height: 500px;
    padding: 5px;
    margin-top: 2px;
}

.blue {
    grid-area: azul;
    background-color: blue;
    border-bottom-right-radius: 100%;
}

.red {
    grid-area: vermelho;
    background-color: red;
    border-top-right-radius: 100%;
}

.yellow {
    grid-area: amarelo;
    background-color: yellow;
    border-bottom-left-radius: 100%;
}

.green {
    grid-area: verde;
    background-color: green;
    border-top-left-radius: 100%;
}

.selected {
    opacity: 0.8;
}

let order = []; // ordens aleatorias da sequencia de cores
let clickedOrder = [];
let score = 0;

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Cria Ordem aleatória da sequencia de cores
let shuffleOrder = () => {
    // Sorteia um número de 0 a 3
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// Checa se os botões clicados são os mesmos da ordem gerada 
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou!! Iniciando próximo nível`);
        nextLevel();
    }
}

// Função para o click do player
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250)
}

// Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if (color == 1){
        return red;
    } else if (color == 2){
        return yellow;
    } else if (color == 3){
        return blue;
    }
}

// Função para o próximo nivel
let nextLevel = () => {
    score++;

    shuffleOrder();
}

// Função de Game Over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Bem vindo ao Genesis! Iniciando novo jogo')
    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();