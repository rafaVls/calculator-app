const screenTextElement = document.getElementById("screen-text");

class OperatorButtonHandler {
    constructor() {
        this.value = 0;
        this.operatorPressed = null;
    }

    numberButtonHandler(numberButton) {
        if (screenTextElement.textContent === "0") {
            screenTextElement.textContent = numberButton.textContent;
        } else {
            screenTextElement.textContent += numberButton.textContent;
        }
    }

    deleteButtonHandler() {
        const screenText = screenTextElement.textContent;

        if (screenText !== "0" && screenText.length !== 1) {
            screenTextElement.textContent = screenText.slice(0, -1);
        } else if (screenText.length === 1) {
            screenTextElement.textContent = "0";
        }
    }

    resetButtonHandler() {
        this.value = 0;
        this.operatorPressed = null;
        screenTextElement.textContent = "0";
    }

    handleOperator(operatorButton) {
        const screenText = screenTextElement.textContent;
        const operatorText = operatorButton.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(screenText);
                break;
            case "+":
                this.sumHandler(screenText);
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

    dotHandler(screenText) {
        if (!screenText.includes(".")) {
            screenTextElement.textContent += ".";
        }
    }

    sumHandler(screenText) {
        if (screenText !== "0") {
            if (this.operatorPressed) {
                this.value += +screenText;
                this.operatorPressed = null;
            } else {
                this.value = +screenText;
                this.operatorPressed = "+";
            }
        }
        screenTextElement.textContent = "0";
    }
}

export { OperatorButtonHandler };