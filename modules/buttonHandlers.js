const bigTextElement = document.getElementById("big-text");
const smallTextElement = document.getElementById("small-text");

class ButtonClickHandler {
    constructor() {
        this.value = 0;
        this.operatorPressed = null;
    }

    numberHandler(numberButton) {
        if (bigTextElement.textContent === "0") {
            bigTextElement.textContent = numberButton.textContent;
        } else {
            bigTextElement.textContent += numberButton.textContent;
        }
    }

    deleteHandler() {
        const bigText = bigTextElement.textContent;

        if (bigText !== "0" && bigText.length !== 1) {
            bigTextElement.textContent = bigText.slice(0, -1);
        } else if (bigText.length === 1) {
            bigTextElement.textContent = "0";
        }
    }

    resetHandler() {
        this.value = 0;
        this.operatorPressed = null;
        bigTextElement.textContent = "0";
        smallTextElement.textContent = "";
    }

    operatorsHandler(operatorButton) {
        const bigText = bigTextElement.textContent;
        const operatorText = operatorButton.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(bigText);
                break;
            case "+":
                this.plusHandler(bigText);
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

    dotHandler(bigText) {
        if (!bigText.includes(".")) {
            bigTextElement.textContent += ".";
        }
    }

    plusHandler(bigText) {
        if (bigText !== "0") {
            if (this.operatorPressed) {
                this.value += +bigText;
                this.operatorPressed = null;
            } else {
                this.value = +bigText;
                this.operatorPressed = "+";
            }
        }
        bigTextElement.textContent = "0";
        smallTextElement.textContent += `${this.value} + `;
    }
}

export { ButtonClickHandler };