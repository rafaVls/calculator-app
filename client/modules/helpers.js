/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param {number} possibleNaN A numeric value.
 */
function checkIfNaN(possibleNaN) {
    return possibleNaN !== possibleNaN;
}

/**
 * Look for and returns the element of the array which contains operationSymbol.
 * @param {string[]} mathTerms The array of math terms where we want to find the operation.
 * @param {string} operationSymbol The operation symbol that we're looking for in the array.
 * @returns String containing operationSymbol.
 */
function findOperation(mathTerms, operationSymbol) {
    return mathTerms.find(term => {
        if (typeof term === "string") {
            return term.includes(operationSymbol);
        }
    });
}

/**
 * Handles the symbol of current operation displayed on smallTextelement.
 * @param {"+" | "-" | "x" | "/"} operationSymbol The symbol string.
 * @param {HTMLElement} smallTextElement The small text part of the screen.
 * @param {HTMLElement} bigTextElement The big text part of the screen.
 */
function handleSymbol(operationSymbol, smallTextElement, bigTextElement = null) {
    const smallText = smallTextElement.textContent;

    if (bigTextElement) {
        smallTextElement.textContent += `${bigTextElement.textContent} ${operationSymbol} `
    } else {
        if (smallText !== "" && !smallText.endsWith(`${operationSymbol} `)) {
            smallTextElement.textContent = smallText.slice(0, -2);
            smallTextElement.textContent += `${operationSymbol} `
        }
    }
}

/**
 * Switch between themes 1, 2 and 3.
 * @param {string} elementID The id of the input element.
 * @param {HTMLElement} toggleElement The toggle element with the class attribute.
 */
function switchTheme(elementID, toggleElement) {
    try {
        const regExp = /[1-3]+/;
        const newTheme = `theme-${elementID.match(regExp)[0]}`;
        const currentTheme = toggleElement.classList[1];

        document.body.classList.replace(currentTheme, newTheme);
        toggleElement.classList.replace(currentTheme, newTheme);
    } catch (e) {
        if (e instanceof TypeError) {
            if (e.message.includes("match")) {
                throw new TypeError("elementID must be a string");
            } else if (e.message.includes("classList")) {
                throw new TypeError("toggleElement must be an HTMLElement")
            }
        }
    }
}

export { checkIfNaN, findOperation, handleSymbol, switchTheme };