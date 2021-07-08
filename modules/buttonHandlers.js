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
    constructor() {
        this.value = 0;
        this.operatorPressed = false;
    }

    handleOperator(operatorButton) {
        const screenText = screenTextElement.textContent;
        const operatorText = operatorButton.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(screenText);
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
                console.log(this.value)
                break;
            default:
                break;
        }
    }

    dotHandler(screenText) {
        if (!screenText.includes(".")) {
            screenTextElement.textContent += ".";
        }
    }
}

export { numberButtonHandler, deleteButtonHandler, resetButtonHandler, OperatorButtonHandler };