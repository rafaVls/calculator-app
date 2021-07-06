/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param possibleNaN A numeric value.
 */
function checkIfNaN(possibleNaN) {
    return possibleNaN !== possibleNaN;
}

export { checkIfNaN };