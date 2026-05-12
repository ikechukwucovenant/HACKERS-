let usedGuesses = [];

// SMART COM GUESS SYSTEM
function getAIGuess() {

    let guess;

    do {
        guess = generateCode();
    } while (usedGuesses.includes(guess));

    usedGuesses.push(guess);

    return guess;
}

// RESET AI MEMORY (called when game resets)
function resetAI() {
    usedGuesses = [];
}