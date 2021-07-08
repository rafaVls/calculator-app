const screenTextElement = document.getElementById("screen-text");

class ButtonClickHandler {
    constructor() {
        this.value = 0;
        this.operatorPressed = null;
    }

    numberHandler(numberButton) {
        if (screenTextElement.textContent === "0") {
            screenTextElement.textContent = numberButton.textContent;
        } else {
            screenTextElement.textContent += numberButton.textContent;
        }
    }

    deleteHandler() {
        const screenText = screenTextElement.textContent;

        if (screenText !== "0" && screenText.length !== 1) {
            screenTextElement.textContent = screenText.slice(0, -1);
        } else if (screenText.length === 1) {
            screenTextElement.textContent = "0";
        }
    }

    resetHandler() {
        this.value = 0;
        this.operatorPressed = null;
        screenTextElement.textContent = "0";
    }

    operatorsHandler(operatorButton) {
        const screenText = screenTextElement.textContent;
        const operatorText = operatorButton.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(screenText);
                break;
            case "+":
                this.plusHandler(screenText);
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

    plusHandler(screenText) {
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

export { ButtonClickHandler };