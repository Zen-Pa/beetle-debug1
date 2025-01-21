import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))




// import dragula from 'dragula';
// import 'dragula/dist/dragula.css';

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.createElement('div');
        gameContainer.id = 'game-container';
        document.body.appendChild(gameContainer);
    // dragula
            // var containers = [document.querySelector('#game-container')];
            // dragula(containers);

    let gameState = {
        score: 0,
        isRunning: false,
    };

    function startGame() {
        gameState.isRunning = true;
        gameState.score = 0;
        updateGame();
    }

    function updateGame() {
        if (gameState.isRunning) {
            // Game logic goes here
            gameState.score++;
            console.log(gameState.score);

         requestAnimationFrame(updateGame); // recursive call
        }
    }

    function stopGame() {
        gameState.isRunning = false;
        alert(`Game Over! Your score: ${gameState.score}`);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !gameState.isRunning) {
            startGame();
        } else if (event.key === 'Escape' && gameState.isRunning) {
            stopGame();
        }
    });


    // dragula([document.querySelector('#left'), document.querySelector('#right')]);
});