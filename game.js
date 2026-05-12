let playerSecret = "";
let comSecret = "";
let turn = "player";

let playerBoard = "";
let comBoard = "";

function startGame() {

    let code = document.getElementById("playerCode").value;

    if (code.length !== 4) {
        alert("Enter 4 digits");
        return;
    }

    playerSecret = code;
    comSecret = generateCode();

    document.getElementById("setupScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

function makeGuess() {

    if (turn !== "player") return;

    let guess = document.getElementById("guessInput").value;

    let res = checkGuess(guess, comSecret);

    playerBoard += guess + " → " + res.dead + "D " + res.injured + "I\n";
    document.getElementById("playerBoard").innerText = playerBoard;

    document.getElementById("result").innerText =
        res.dead + " Dead, " + res.injured + " Injured";

    if (res.dead === 4) {
        endGame("PLAYER WINS");
        return;
    }

    turn = "com";
    setTimeout(comMove, 600);
}

function comMove() {

    let guess = getAIGuess();

    let res = checkGuess(guess, playerSecret);

    comBoard += guess + " → " + res.dead + "D " + res.injured + "I\n";
    document.getElementById("comBoard").innerText = comBoard;

    if (res.dead === 4) {
        endGame("COM WINS");
        return;
    }

    turn = "player";
}

function checkGuess(g, s) {

    let dead = 0;
    let injured = 0;

    for (let i = 0; i < 4; i++) {
        if (g[i] === s[i]) dead++;
        else if (s.includes(g[i])) injured++;
    }

    return { dead, injured };
}

function generateCode() {

    let digits = [];

    while (digits.length < 4) {
        let n = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(n)) digits.push(n);
    }

    return digits.join("");
}

function endGame(text) {

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "block";

    document.getElementById("winText").innerText = text;
}