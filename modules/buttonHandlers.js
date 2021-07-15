import { handleSymbol } from "./helpers.js";

const bigTextElement = document.getElementById("big-text");
const smallTextElement = document.getElementById("small-text");

class ButtonClickHandler {
    constructor() {
        this.value = 0;
        this.value2 = 0;
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
        this.value2 = 0;
        this.afterEquals = false;
        this.operatorPressed = null;
        bigTextElement.textContent = "0";
        smallTextElement.textContent = "";
    }

    operatorsHandler(operatorText, includeSymbol = true) {
        const bigText = bigTextElement.textContent;

        switch (operatorText) {
            case ".":
                this.dotHandler(bigText);
                break;
            case "+":
                this.operate(bigText, "+", includeSymbol);
                break;
            case "-":
                this.operate(bigText, "-", includeSymbol);
                break;
            case "x":
                this.operate(bigText, "x", includeSymbol);
                break;
            case "/":
                this.operate(bigText, "/", includeSymbol);
                break;
            case "=":
                this.equalsHandler();
                break;
            default:
                this.value = +bigText;
                break;
        }
        console.log(this.value, this.value2);
    }

    dotHandler(bigText) {
        this.afterEquals && this.resetHandler();
        if (!bigText.includes(".")) {
            bigTextElement.textContent += ".";
        }
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
                        // these 2 need fixing, it's a thinker
                        case "x":
                            // this.value *= +bigText;
                            break;
                        case "/":
                            this.value /= +bigText;
                            break;
                        default:
                            throw new SyntaxError("Operation type not recognized");
                    }
                } else {
                    if (operationSymbol === "x") {
                        this.value2 = this.value;
                    } else if ((operationSymbol === "+" || operationSymbol === "-") && this.operatorPressed === "x") {
                        const mathTerms = smallTextElement.textContent.split(operationSymbol);
                        const multiplicationTerms = mathTerms[mathTerms.length - 2].split(this.operatorPressed);

                        this.value = 1;
                        multiplicationTerms.forEach(term => {
                            this.value *= +term;
                        });

                        if (operationSymbol === "+") {
                            this.value = this.value2 + this.value;
                        } else if (operationSymbol === "-") {
                            this.value = this.value2 - this.value;
                        }
                    }
                    this.operatorsHandler(this.operatorPressed, false);
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