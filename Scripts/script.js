document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputField");
    const output = document.getElementById("output");

    let timeoutId; // To store the timer ID

    // Function to reverse a string
    function reverseString(str) {
        return str.split("").reverse().join("");
    }

    // Function to update the output
    function updateOutput() {
        const inputValue = inputField.value;
        const reversedValue = reverseString(inputValue);
        output.textContent = `Reversed: ${reversedValue}`;
    }

    // Event listener for input changes
    inputField.addEventListener("input", function () {
        // Clear the previous timer, if any
        clearTimeout(timeoutId);

        // Start a new timer
        timeoutId = setTimeout(updateOutput, 1000); // 1000 milliseconds (1 second) delay
    });
});
