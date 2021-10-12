const DIFFICULTY = {
    easy: {
        name: "easy",
        successProbability: 1 / 2,
    },
    normal: {
        name: "normal",
        successProbability: 1 / 3,
    },
    hard: {
        name: "hard",
        successProbability: 1 / 6,
    },
};

function getAtLeastOneSuccessOdds(difficulty, numberOfDice) {
    return 1 - Math.pow(1 - difficulty.successProbability, numberOfDice);
}

function getAtLeastTwoSuccessesOdds(difficulty, numberOfDice) {
    return (
        1 -
        (Math.pow(1 - difficulty.successProbability, numberOfDice) +
            numberOfDice *
                (Math.pow(1 - difficulty.successProbability, numberOfDice - 1) * difficulty.successProbability))
    );
}

function showOneSuccessOdds(difficulty, numberOfDice) {
    const cssSelector = `#${difficulty.name}-table tr:nth-child(${2 * numberOfDice - 1}) td:nth-child(2)`;
    const cellContents = `${(getAtLeastOneSuccessOdds(difficulty, numberOfDice) * 100).toFixed(0)}%`;
    document.querySelector(cssSelector).innerHTML = cellContents;
}

function showTwoSuccessesOdds(difficulty, numberOfDice) {
    const cssSelector = `#${difficulty.name}-table tr:nth-child(${2 * numberOfDice}) td`;
    const cellContents = `${(getAtLeastTwoSuccessesOdds(difficulty, numberOfDice) * 100).toFixed(0)}%`;
    document.querySelector(cssSelector).innerHTML = cellContents;
}

window.onload = () => {
    for (const difficulty in DIFFICULTY) {
        for (let numberOfDice = 1; numberOfDice <= 6; numberOfDice++) {
            showOneSuccessOdds(DIFFICULTY[difficulty], numberOfDice);
            showTwoSuccessesOdds(DIFFICULTY[difficulty], numberOfDice);
        }
    }
};
