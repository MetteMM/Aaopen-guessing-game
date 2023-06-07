const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
let secretNumber;
let numAttempts;
let askLimit = () => {
    rl.question("How many turns would you like? ", answer => {
        numAttempts = answer;
        askRange();
    })
}

let askGuess = () => {
    if (numAttempts > 0) {
        rl.question("Enter a guess: ", answer => {
            let num = Number(answer);
            numAttempts--;

            if (checkGuess(num) === false) {
            askGuess();

            } else {
            console.log("You win!")
            rl.close();
            }
        })

    } else if (numAttempts === 0) {
        console.log("Sorry, you lose.");
        console.log("The correct answer was " + secretNumber);
        rl.close();
    }
}

const randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function askRange() {
    rl.question('Pick a minimum number: ', minNum => {
        rl.question('Pick a maximum number: ', maxNum => {
        console.log("I am thinking about a number between " + minNum + " and " + maxNum + "...");
        secretNumber = randomInRange(Number(minNum), Number(maxNum));
        askGuess();
        })
    })
    return;
}

let checkGuess = (userNumber) => {
    if (userNumber > secretNumber) {
        console.log("Too high");
        return false;
    } else if (userNumber < secretNumber) {
        console.log("Too low");
        return false;
    } else if (userNumber === secretNumber) {
        console.log("Correct!");
        return true;
    }
}
askLimit();
