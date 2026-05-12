let playerSecret = "";
let comSecret = "";

let turn = "player";

let playerBoardText = "";
let comBoardText = "";

// START GAME
function startGame() {
    let code = document.getElementById("playerCode").value;

    if (code.length !== 4) {
        alert("Enter 4 digits");
        return;
    }

    playerSecret = code;
    comSecret = generateCode();

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("turnText").innerText = "Player Turn";
}

// PLAYER GUESS
function playerGuess() {

    if (turn !== "player") return;

    let guess = document.getElementById("guessInput").value;

    if (guess.length !== 4) {
        alert("Enter 4 digits");
        return;
    }

    let result = checkGuess(guess, comSecret);

    playerBoardText += guess + " → " + result.dead + "D " + result.injured + "I\n";
    document.getElementById("playerBoard").innerText = playerBoardText;

    document.getElementById("result").innerText =
        result.dead + " Dead, " + result.injured + " Injured";

    if (result.dead === 4) {
        endGame("PLAYER WINS!");
        return;
    }

    turn = "com";
    document.getElementById("turnText").innerText = "COM Turn";

    setTimeout(comGuess, 800);
}

// COMPUTER TURN
function comGuess() {

    let guess = generateCode(); // simple AI (upgrade later in ai.js)

    let result = checkGuess(guess, playerSecret);

    comBoardText += guess + " → " + result.dead + "D " + result.injured + "I\n";
    document.getElementById("comBoard").innerText = comBoardText;

    if (result.dead === 4) {
        endGame("COM WINS!");
        return;
    }

    turn = "player";
    document.getElementById("turnText").innerText = "Player Turn";
}

// CHECK DEAD & INJURED
function checkGuess(guess, secret) {
    let dead = 0;
    let injured = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            dead++;
        } else if (secret.includes(guess[i])) {
            injured++;
        }
    }

    return { dead, injured };
}

// GENERATE UNIQUE 4 DIGIT CODE
function generateCode() {
    let digits = [];

    while (digits.length < 4) {
        let n = Math.floor(Math.random() * 10).toString();

        if (!digits.includes(n)) {
            digits.push(n);
        }
    }

    return digits.join("");
}

// END GAME
function endGame(text) {

    alert(text);

    // optional score system (safe check)
    if (text.includes("PLAYER")) {
        if (typeof addWin === "function") addWin();
    }

    resetGame();
}

// RESET GAME
function resetGame() {

    playerBoardText = "";
    comBoardText = "";

    playerSecret = "";
    comSecret = "";

    turn = "player";

    document.getElementById("playerBoard").innerText = "";
    document.getElementById("comBoard").innerText = "";
    document.getElementById("result").innerText = "";

    document.getElementById("setup").style.display = "block";
    document.getElementById("game").style.display = "none";
}