/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param {number} possibleNaN A numeric value.
 */
function checkIfNaN(possibleNaN) {
    return possibleNaN !== possibleNaN;
}

/**
 * Handles the symbol of current operation displayed on smallTextelement.
 * @param {string} operationSymbol The symbol string.
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

export { checkIfNaN, handleSymbol };