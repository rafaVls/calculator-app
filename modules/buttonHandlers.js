const screenTextElement = document.getElementById("screen-text");

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

class OperatorButtonHandler {
    constructor(operatorButton) {
        this.operatorButton = operatorButton;
        this.operatorText = operatorButton.textContent;
    }

    handleOperator() {
        const screenText = screenTextElement.textContent;

        switch (this.operatorText) {
            case ".":
                break;
            case "+":
                break;
            case "-":
                break;
            case "x":
                break;
            case "/":
                break;
            case "=":
                break;
            default:
                break;
        }
    }
}

export { numberButtonHandler, deleteButtonHandler, resetButtonHandler, OperatorButtonHandler };