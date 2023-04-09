/**
 * install import
 */
const prompt = require("prompt-sync")();

/**
 * @summary global variables
 * @constant
 * @type {numeric}
 * @default
 */
const ROWS = 3;
const COLS = 3;

/**
 * @summary Declares how many times each symbol should appear
 * @constant
 * @type {object} 
 * @default
 */
const SYMBOLS_COUNT = {
    A : 3,
    B : 4,
    C : 6,
    D : 8,
}

/**
 * @summary Declares the value of each symbols
 * @constant
 * @type {object} 
 * @default
 */
const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}



/**
 * @summary Ask user for deposit amount
 * @desc Ask user the amount then validates it
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

/**
 * @summary Ask user how which line to bet on
 * @desc ask the user for the line number then validates it 
 * @returns {number} 
 */
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

/**
 * @summary Ask the user how much amount to bet on the line(s)
 * @desc Ask the amount then validates it
 * @param {number} balance - The deposited amount
 * @param {number} lines - Lines to bet on
 * @returns {number} - The bet amount per line
 */
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

/**
 * 
 * @returns {object}
 */
const spin = () => {
    const symbols = [];
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
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {

    let balance = deposit();
    while (true){
        console.log("You have a balance of $" + balance);
        const lines = getNumberOfLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran ot of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)?")

        if (playAgain != "y") {
            console.log("Thank you for playing!, see you next time");
            break;
        }
    }
}

game();
