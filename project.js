/**
 * install import
 */
const prompt = require("prompt-sync")();

/**
 * @desc global variables
 * @property
 */
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}



/**
 * 
 * @returns 
 */
const deposit = () => {
    while (true) {

        const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
        if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return depositAmount;
        }
    }
}

const getNumberOfLines = () => {
    while (true) {

        const numberOfLines = parseFloat(prompt("Enter the number of lines to bet on (1-3): "));

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        const bet = parseFloat(prompt("Enter the total bet per line: "));

        if (isNaN(bet) || bet <= 0 || bet > balance / lines ) {
            console.log("Insufficient balance, try again.");
        } else {
            return bet;
        }
    }
}

const spin = () => {
    const symbols = []; // all symbols according to their count
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){

        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); // remove one element
        }
    }
    return reels;
}
spin();
// let balance = deposit();
// console.log(balance);
// const numberOfLines = getNumberOfLines();
// console.log(numberOfLines);
// const bet = getBet(balance, numberOfLines);
// console.log(bet);