import { handleSymbol } from "./helpers.js";

const bigTextElement = document.getElementById("big-text");
const smallTextElement = document.getElementById("small-text");

class ButtonClickHandler {
    constructor() {
        this.value = 0;
        this.afterEquals = false;
        this.operatorPressed = null;
    }

    numberHandler(numberButton) {
        const buttonText = numberButton.textContent;

        // If the "equals" button has been pressed, this.value
        // will be displayed to bigTextElement, and we need to 
        // reset calculator before starting a new operation
        if (bigTextElement.textContent === "0" || this.afterEquals) {
            this.afterEquals && this.resetHandler();
            bigTextElement.textContent = buttonText;
        } else {
            bigTextElement.textContent += buttonText;
        }
    }

    deleteHandler() {
        this.afterEquals && this.resetHandler();
        const bigText = bigTextElement.textContent;

        if (bigText !== "0" && bigText.length !== 1) {
            bigTextElement.textContent = bigText.slice(0, -1);
        } else if (bigText.length === 1) {
            bigTextElement.textContent = "0";
        }
    }

    resetHandler() {
        this.value = 0;
        this.afterEquals = false;
        this.operatorPressed = null;
        bigTextElement.textContent = "0";
        smallTextElement.textContent = "";
    }

    operatorsHandler(operatorText) {
        const bigText = bigTextElement.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(bigText);
                break;
            case "+":
                this.plusHandler(bigText, true);
                break;
            case "-":
                this.minusHandler(bigText, true);
                break;
            case "x":
                break;
            case "/":
                break;
            case "=":
                this.equalsHandler();
                break;
            default:
                break;
        }
        console.log(this.value);
    }

    dotHandler(bigText) {
        this.afterEquals && this.resetHandler();
        if (!bigText.includes(".")) {
            bigTextElement.textContent += ".";
        }
    }

    plusHandler(bigText, includeSymbol = false) {
        this.operate(bigText, "+", includeSymbol);
    }

    minusHandler(bigText, includeSymbol = false) {
        this.operate(bigText, "-", includeSymbol);
    }

    equalsHandler() {
        this.operatorsHandler(this.operatorPressed)

        bigTextElement.textContent = this.value;
        smallTextElement.textContent = "";
        this.operatorPressed = null;
        this.afterEquals = true;
    }

    operate(bigText, operationSymbol, includeSymbol = false) {
        if (bigText !== "0" && bigText !== "0.") {
            includeSymbol && handleSymbol(operationSymbol, smallTextElement, bigTextElement);
            if (!this.afterEquals || this.operatorPressed) {
                if (this.operatorPressed === operationSymbol) {
                    switch (operationSymbol) {
                        case "+":
                            this.value += +bigText;
                            break;
                        case "-":
                            this.value -= +bigText;
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (this.operatorPressed) {
                        case "+":
                            this.plusHandler(bigText);
                            break;
                        case "-":
                            this.minusHandler(bigText);
                            break;
                        default:
                            this.value = +bigText;
                            break;
                    }
                }
            }
            bigTextElement.textContent = "0";
        }

        this.afterEquals = false;
        this.operatorPressed = operationSymbol;
        handleSymbol(this.operatorPressed, smallTextElement);
    }
}

export { ButtonClickHandler };