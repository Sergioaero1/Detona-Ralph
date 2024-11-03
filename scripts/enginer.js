const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLetf: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTime: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.value.currentTime--;
    state.view.timeLetf.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0) {
        clearInterval(state.value.actions.countDownTime);  // esse...
        clearInterval(state.value.actions.timeId);         // ...e essecomando deveria limpar após zerar o conometro, porem ele zera em -12. debugar:
        alert(`GAME OVER JOGADOOOOR / SEU SCORE FOI: ${state.value.result}`);


    }
}

function playSound(audioName) {
    let audio = new Audio(`/audios/${audioName}.m4a`);
    audio.volume = 0.02;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id
}

//function moveEnemy()
//{
    //state.value.timeId = setInterval(randomSquare, state.value.//gameVelocity);
//}
function addListenerHitBox() {
    state.view.square.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.value.hitPosition) {
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("hit");
            }
        });
    })
}

function initialize() {
    //moveEnemy();
    addListenerHitBox();
}

initialize();