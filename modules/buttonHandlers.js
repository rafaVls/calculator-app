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
                this.equalsHandler();
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
            smallTextElement.textContent += `${bigTextElement.textContent} + `;
            if (!this.afterEquals) {
                this.value += +bigText;
            }
            bigTextElement.textContent = "0";
        }
        this.afterEquals = false;
        this.operatorPressed = "+";
    }

    equalsHandler() {
        switch (this.operatorPressed) {
            case "+":
                this.value += +bigTextElement.textContent;
                break;
            default:
                break;
        }

        bigTextElement.textContent = this.value;
        smallTextElement.textContent = "";
        this.afterEquals = true;
    }
}

export { ButtonClickHandler };