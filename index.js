const screenTextElement = document.getElementById("screen-text");
const buttonElements = Array.from(document.getElementById("keypad").children);
const deleteButtonElement = buttonElements.find(button => button.textContent === "DEL");
const resetButtonElement = buttonElements.find(button => button.textContent === "RESET");
const numberButtonElements = buttonElements.filter(button => !checkIfNaN(+button.textContent));
const operatorButtonElements = buttonElements.filter(button => checkIfNaN(+button.textContent) && button.textContent.length === 1);

resetButtonElement.addEventListener("click", resetButtonHandler);
deleteButtonElement.addEventListener("click", deleteButtonHandler);
numberButtonElements.forEach(numberButton => {
    numberButton.addEventListener("click", () => numberButtonHandler(numberButton));
});


function numberButtonHandler(numberButton) {
    if (screenTextElement.textContent === "0") {
        screenTextElement.textContent = numberButton.textContent;
    } else {
        screenTextElement.textContent += numberButton.textContent;
    }
}

function deleteButtonHandler() {
    const screenText = screenTextElement.textContent;

    if (screenText !== "0" && screenText.length !== 1) {
        screenTextElement.textContent = screenText.slice(0, -1);
    } else if (screenText.length === 1) {
        screenTextElement.textContent = "0";
    }
}

function resetButtonHandler() {
    screenTextElement.textContent = "0";
}

/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param possibleNaN A numeric value.
 */
function checkIfNaN(possibleNaN) {
    return possibleNaN !== possibleNaN;
}