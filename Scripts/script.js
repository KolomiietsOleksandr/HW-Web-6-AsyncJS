document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputField");
    const output = document.getElementById("output");

    let timeoutId;

    function reverseString(str) {
        return str.split("").reverse().join("");
    }

    function updateOutput() {
        const inputValue = inputField.value;
        const reversedValue = reverseString(inputValue);
        output.textContent = `Reversed: ${reversedValue}`;
    }

    inputField.addEventListener("input", function () {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(updateOutput, 1000);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dateButtonsContainer = document.querySelector(".date-buttons");
    const imageElement = document.getElementById("image");
    const descriptionElement = document.getElementById("description");
    const errorMessageElement = document.getElementById("errorMessage");
    const completionMessageElement = document.getElementById("completionMessage");

    for (let day = 1; day <= 30; day++) {
        const button = document.createElement("button");
        button.textContent = `Sep ${day}`;
        button.dataset.day = day;
        dateButtonsContainer.appendChild(button);

        button.addEventListener("click", () => {
            const selectedDay = button.dataset.day;

            imageElement.src = "";
            descriptionElement.textContent = "";
            errorMessageElement.textContent = "";
            completionMessageElement.textContent = "";

            const apiKey = "4iZ6ktLmS5fntPwpbmhoyN2fH1JmkgOjQaY7Z0mK";
            const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2023-09-${selectedDay}`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.media_type === "image") {
                        imageElement.src = data.hdurl;
                    } else if (data.media_type === "video") {
                        alert("This date has a video, not an image.");
                        imageElement.src = "";
                    }
                    descriptionElement.textContent = data.explanation;
                })
                .catch((error) => {
                    errorMessageElement.textContent = `Error: future data`;
                })
                .finally(() => {
                    completionMessageElement.textContent = "Request completed.";
                });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const validRequestButton = document.getElementById("validRequest");
    const errorRequestButton = document.getElementById("errorRequest");
    const output = document.getElementById("outputGit");
    const errorOutput = document.getElementById("errorOutput");

    validRequestButton.addEventListener("click", () => {
        makeGitHubRequest("KolomiietsOleksandr");
    });

    errorRequestButton.addEventListener("click", () => {
        makeGitHubRequest("nonexistent-username");
    });

    function makeGitHubRequest(username) {
        const xhr = new XMLHttpRequest();
        const url = `https://api.github.com/users/${username}`;

        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                outputGit.textContent = `GitHub Username: ${response.login}`;
                errorOutput.textContent = "";
            } else {
                outputGit.textContent = "";
                errorOutput.textContent = `Error: ${xhr.status} - ${xhr.statusText}`;
            }
        };

        xhr.onerror = function () {
            outputGit.textContent = "";
            errorOutput.textContent = "Network error occurred.";
        };

        xhr.send();
    }
});
