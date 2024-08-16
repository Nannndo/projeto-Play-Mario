const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('../src/soung/audio_theme.mp3');
const audioGameover = new Audio('../src/soung/audio_gameover.mp3'); // Corrigido o caminho do arquivo

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none'; // Correção para definir o display como 'none'

    // Audio
    audioStart.addEventListener('canplaythrough', () => {
        console.log('Áudio pronto para reprodução.');
    });
    audioStart.play();
}

const restartGame = () => {
    gameOver.style.display = 'none'; // Correção para definir o display como 'none'
    pipe.style.left = ''; // Correção para limpar a posição
    mario.src = '../src/img/mario.gif';
    mario.style.width = '150px'; // Correção para definir o width
    mario.style.bottom = '0'; // Correção para definir o bottom

    start.style.display = 'none'; // Correção para definir o display como 'none'

    audioGameover.pause();
    audioGameover.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;
}

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
}

const loop = () => {
    const intervalId = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation'); // Corrigido para remover a classe sem o ponto
            pipe.style.left = `${pipePosition}px`; // Correção para definir o valor de left
            pipe.classList.add('pipe-animation');
            
            mario.classList.remove('jump');
            mario.style.bottom = `${marioPosition}px`; // Correção para definir o valor de bottom

            mario.src = '../src/img/game-over.png'; // Correção do caminho da imagem
            mario.style.width = '80px'; // Correção para definir o width
            mario.style.marginLeft = '50px'; // Correção para definir o margin-left

            function stopAudioStart() {
                audioStart.pause();
            }
            stopAudioStart();
            audioGameover.play();

            setTimeout(() => {
                audioGameover.pause();
            }, 7000);

            gameOver.style.display = 'flex'; // Correção para definir o display como 'flex'

            clearInterval(intervalId); // Correção para limpar o intervalo corretamente
        }
    }, 10);
}

loop();

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump();
    }
});

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});