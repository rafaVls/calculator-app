/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param {number} possibleNaN A numeric value.
 */
function checkIfNaN(possibleNaN) {
    return possibleNaN !== possibleNaN;
}

/**
 * Switches the symbol of current operation displayed on smallTextelement to operationSymbol.
 * @param {HTMLElement} smallTextElement The small text part of the screen.
 * @param {string} operationSymbol The symbol string to switch to.
 */
function switchSymbol(smallTextElement, operationSymbol) {
    if (smallTextElement.textContent !== "" && !smallTextElement.textContent.endsWith(`${operationSymbol} `)) {
        smallTextElement.textContent = smallTextElement.textContent.slice(0, -2);
        smallTextElement.textContent += `${operationSymbol} `
    }
}

export { checkIfNaN, switchSymbol };