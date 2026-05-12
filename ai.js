let used = [];

function generateCode() {
    let digits = [];

    while (digits.length < 4) {
        let n = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(n)) digits.push(n);
    }

    return digits.join("");
}

function getAIGuess() {

    let guess;

    do {
        guess = generateCode();
    } while (used.includes(guess));

    used.push(guess);

    return guess;
}