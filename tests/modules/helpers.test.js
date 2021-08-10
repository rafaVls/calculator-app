/**
 * @jest-environment jsdom
*/

import { expect, test, describe, beforeEach } from "@jest/globals";
import { checkIfNaN, findOperation, handleSymbol, switchTheme } from "../../client/modules/helpers";

describe("checkIfNan", () => {
    const notNumbers = ["DEL", "RESET", "+", "-", "x", "=", ".", "/"];
    test.each(notNumbers)("should return true if argument is not a number (%j)", buttonText => {
        expect(checkIfNaN(+buttonText)).toBe(true);
    });

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    test.each(numbers)("should return false if argument IS a number (%j)", number => {
        const buttonText = number.toString();
        expect(checkIfNaN(+buttonText)).toBe(false);
    })

    test('should return false if argument is null', () => {
        expect(checkIfNaN(+null)).toBe(false);
    });

    test("should return true if argument is undefined or an empty object", () => {
        // This is true because +undefined is NaN
        expect(checkIfNaN(+undefined)).toBe(true);
        expect(checkIfNaN(+{})).toBe(true);
    });
});

describe("findOperation", () => {
    const operations = [
        [["4", null, undefined, {}, [], "5 x 2 / 3"], "x", "5 x 2 / 3"],
        [["4", null, undefined, {}, [], "5 / 2 x 3"], "/", "5 / 2 x 3"],
        [["3 x 2 x 3 x 5", "3"], "x", "3 x 2 x 3 x 5"]
    ];
    test.each(operations)("should return element of the array %j containing the symbol %j",
        (operationsArray, symbol, operation) => {
            expect(findOperation(operationsArray, symbol)).toBe(operation);
        });

    test("should return undefined if the array doesn't contain the symbol", () => {
        expect(findOperation([2, null, undefined, {}, [], "5 + 2 + 3 - 5"], "x")).toBeUndefined;
    });
});

describe("handleSymbol", () => {
    document.body.innerHTML = `
    <small id="small-text"></small>
    <span id="big-text">0</span>
    `;

    const smallTextElement = document.getElementById("small-text");
    const bigTextElement = document.getElementById("big-text");

    test("should set small screen's text to big screen's plus the symbol", () => {
        smallTextElement.textContent = "5 + 10 - ";
        bigTextElement.textContent = "10";
        const operationSymbol = "+";

        let value = handleSymbol(operationSymbol, smallTextElement, bigTextElement);
        expect(smallTextElement.textContent).toBe("5 + 10 - 10 + ");
    });

    test("should switch the symbol if big screen is empty", () => {
        smallTextElement.textContent = "5 + ";
        bigTextElement.textContent = "0";
        const operationSymbols = ["-", "+", "x", "/"];

        operationSymbols.forEach(symbol => {
            handleSymbol(symbol, smallTextElement);
            expect(smallTextElement.textContent).toBe(`5 ${symbol} `);
        });

        expect(smallTextElement.textContent).toBe(`5 / `);
    });

    test("should do nothing if big screen is not provided and small screen is empty", () => {
        smallTextElement.textContent = "";
        const operationSymbol = "+";

        handleSymbol(operationSymbol, smallTextElement);
        expect(smallTextElement.textContent).toBe("");
    });

    test("should do nothing if big screen is not provided and small screen ends with operationSymbol", () => {
        smallTextElement.textContent = "5 + 10 - ";
        const operationSymbol = "-";

        handleSymbol(operationSymbol, smallTextElement);
        expect(smallTextElement.textContent).toBe("5 + 10 - ");
    });
});

describe("switchTheme", () => {
    beforeEach(() => {
        document.body.className = "theme-3";
        toggleElement.className = "toggle-circle theme-3"
    });

    document.body.innerHTML = `<div id="toggle" class="toggle-circle theme-3"></div>`;
    const toggleElement = document.getElementById("toggle");

    const themes = [
        ["theme-1", "theme-3"],
        ["theme-2", "theme-1"],
        ["theme-3", "theme-2"]
    ];

    test.each(themes)("should switch body and toggleElement's theme class to provided string %j from previous class %j",
        (correctTheme, wrongTheme) => {
            switchTheme(correctTheme, toggleElement);

            expect(document.body.classList.contains(correctTheme)).toBe(true);
            expect(document.body.classList.contains(wrongTheme)).toBe(false);
            expect(document.body.classList.length).toBe(1);

            expect(toggleElement.classList.contains(correctTheme)).toBe(true);
            expect(toggleElement.classList.contains(wrongTheme)).toBe(false);
            expect(toggleElement.classList.length).toBe(2);
        });

    const paramErrors = [
        ["theme-1", null, "toggleElement must be an HTMLElement"],
        [20, toggleElement, "elementID must be a string"],
        [null, null, "elementID must be a string"]
    ];

    test.each(paramErrors)("should evaluate %j and %j and return error %j",
        (elementIDValue, toggleElementValue, errorMessage) => {
            expect(() => {
                switchTheme(elementIDValue, toggleElementValue);
            }).toThrow(errorMessage);
        });
});