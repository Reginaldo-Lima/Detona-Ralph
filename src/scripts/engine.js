const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        gameOverModal: document.querySelector("#game-over-modal"),
        gameOverScore: document.querySelector("#game-over-score"),
        btnNewGame: document.querySelector("#btn-new-game"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        currentLives: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        
    }
}

function countLives() {
    state.values.currentLives--;
    state.view.lives.textContent = state.values.currentLives;
}

function countDown() {
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
        clear();
        gameOver();
    } else {
        state.values.currentTime--;
    }
}

function clear () {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timeId);
}

function gameOver() {
    state.view.gameOverScore.textContent = state.values.result;
    state.view.gameOverModal.style.opacity = 1;
    state.view.gameOverModal.style.zIndex = 1;
    
    countLives();
    addListenerNewGame();
    
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function addListenerNewGame() {

    state.view.btnNewGame.addEventListener('click', () => {
        state.view.gameOverModal.style.opacity = 0;
        state.view.gameOverModal.style.zIndex = -1;
        location.reload();
    });
}

function inittialize() {
    addListenerHitBox();
}

inittialize();

setInterval