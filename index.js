import { ButtonClickHandler } from "./modules/buttonHandlers.js";
import { checkIfNaN } from "./modules/helpers.js";

const clickHandler = new ButtonClickHandler();

const screenTextElement = document.getElementById("screen-text");
const buttonElements = Array.from(document.getElementById("keypad").children);
const deleteButtonElement = buttonElements.find(button => button.textContent === "DEL");
const resetButtonElement = buttonElements.find(button => button.textContent === "RESET");
const numberButtonElements = buttonElements.filter(button => !checkIfNaN(+button.textContent));
const operatorButtonElements = buttonElements.filter(button => checkIfNaN(+button.textContent) && button.textContent.length === 1);

resetButtonElement.addEventListener("click", () => clickHandler.resetHandler());
deleteButtonElement.addEventListener("click", () => clickHandler.deleteHandler());
numberButtonElements.forEach(numberButton => {
    numberButton.addEventListener("click", () => clickHandler.numberHandler(numberButton));
});
operatorButtonElements.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => clickHandler.operatorsHandler(operatorButton));
});

document.addEventListener("keydown", (e) => {
    const numerics = /^[0-9]/;

    if (e.key.match(numerics)) {
        numberButtonElements.find(numberButton => numberButton.textContent === e.key).click();
    } else {
        switch (e.key) {
            case "Backspace":
                deleteButtonElement.click();
                break;
            case "Escape":
                resetButtonElement.click();
            case ".":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === ".").click();
                break;
            case "+":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === "+").click();
                break;
            case "-":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === "-").click();
                break;
            case "x":
            case "*":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === "x").click();
                break;
            case "/":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === "/").click();
                break;
            case "=":
            case "Enter":
                operatorButtonElements.find(operatorButton => operatorButton.textContent === "=").click();
                break;
            default:
                break;
        }
    }
})