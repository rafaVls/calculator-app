import * as handlers from "./modules/buttonHandlers.js";
import { checkIfNaN } from "./modules/helpers.js";

const screenTextElement = document.getElementById("screen-text");
const buttonElements = Array.from(document.getElementById("keypad").children);
const deleteButtonElement = buttonElements.find(button => button.textContent === "DEL");
const resetButtonElement = buttonElements.find(button => button.textContent === "RESET");
const numberButtonElements = buttonElements.filter(button => !checkIfNaN(+button.textContent));
const operatorButtonElements = buttonElements.filter(button => checkIfNaN(+button.textContent) && button.textContent.length === 1);

resetButtonElement.addEventListener("click", handlers.resetButtonHandler);
deleteButtonElement.addEventListener("click", handlers.deleteButtonHandler);
numberButtonElements.forEach(numberButton => {
    numberButton.addEventListener("click", () => handlers.numberButtonHandler(numberButton));
});
