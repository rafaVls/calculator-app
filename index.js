import { ButtonClickHandler } from "./modules/buttonHandlers.js";
import { checkIfNaN, switchTheme } from "./modules/helpers.js";

/*
========== [Retrieving HTMLElements & initializing ButtonClickHandler class] ==========
*/
const clickHandler = new ButtonClickHandler();

const toggleElement = document.getElementById("toggle");
const toggleContainer = document.getElementById("toggle-container");
const themeContainer = Array.from(document.getElementById("theme-selectors").children);
const themeInputs = themeContainer.filter(childElement => childElement.hasAttribute("id"));

const buttonElements = Array.from(document.getElementById("keypad").children);
const deleteButtonElement = buttonElements.find(button => button.textContent === "DEL");
const resetButtonElement = buttonElements.find(button => button.textContent === "RESET");
const numberButtonElements = buttonElements.filter(button => !checkIfNaN(+button.textContent));
const operatorButtonElements = buttonElements.filter(button => checkIfNaN(+button.textContent) && button.textContent.length === 1);

/*
========== [Setting eventListeners for the calculator buttons] ==========
*/
resetButtonElement.addEventListener("click", () => clickHandler.resetHandler());
deleteButtonElement.addEventListener("click", () => clickHandler.deleteHandler());
numberButtonElements.forEach(numberButton => {
    numberButton.addEventListener("click", () => clickHandler.numberHandler(numberButton));
});
operatorButtonElements.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => clickHandler.operatorsHandler(operatorButton.textContent));
});
themeInputs.forEach(input => {
    input.addEventListener("change", () => switchTheme(input.id, toggleElement));
});

/*
========== [Setting eventListener for enabling keyboard usage] ==========
*/
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
                break;
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
                // At least in firefox, this button opens the search (?)
                // So we prevent that here.
                e.preventDefault();
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
});

/*
========== [Handling theme switching] ==========
*/
let theme = +toggleElement.classList[1].split("-")[1];
toggleContainer.addEventListener("click", () => {
    theme++;
    switch (theme) {
        case 2:
            toggleElement.classList.remove("theme-1");
            toggleElement.classList.add("theme-2");
            break;
        case 3:
            toggleElement.classList.remove("theme-2");
            toggleElement.classList.add("theme-3");
            break;
        case 4:
            toggleElement.classList.remove("theme-3");
            toggleElement.classList.add("theme-1");
            theme = 1;
            break;
    }
});
