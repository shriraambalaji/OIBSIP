const tempInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.querySelector(".convert-btn");
const resultCard = document.querySelector(".result-card");
const resultValue = document.querySelector(".result-value");

// Convert Button Click
convertBtn.addEventListener("click", convertTemperature);

// Press Enter Support
tempInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convertTemperature();
    }
});

// Allow only numbers, decimal point, and minus sign
tempInput.addEventListener("input", () => {
    tempInput.value = tempInput.value.replace(/[^0-9.-]/g, "");
});

function convertTemperature() {

    const value = parseFloat(tempInput.value);

    if (isNaN(value)) {
        showError("Enter a valid temperature");
        return;
    }

    // Absolute Zero Validation
    if (
        (fromUnit.value === "Celsius" && value < -273.15) ||
        (fromUnit.value === "Fahrenheit" && value < -459.67) ||
        (fromUnit.value === "Kelvin" && value < 0)
    ) {
        showError("Below Absolute Zero!");
        return;
    }

    let celsius;

    // Convert Input → Celsius
    switch (fromUnit.value) {

        case "Celsius":
            celsius = value;
            break;

        case "Fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "Kelvin":
            celsius = value - 273.15;
            break;
    }

    let result;

    // Convert Celsius → Target Unit
    switch (toUnit.value) {

        case "Celsius":
            result = celsius;
            break;

        case "Fahrenheit":
            result = (celsius * 9 / 5) + 32;
            break;

        case "Kelvin":
            result = celsius + 273.15;
            break;
    }

    // Remove unnecessary trailing zeros
    result = parseFloat(result.toFixed(2));

    let unitSymbol = "";

    switch (toUnit.value) {

        case "Celsius":
            unitSymbol = "°C";
            break;

        case "Fahrenheit":
            unitSymbol = "°F";
            break;

        case "Kelvin":
            unitSymbol = "K";
            break;
    }

    resultValue.textContent = `${result} ${unitSymbol}`;

    updateTemperatureTheme(result, toUnit.value);

    animateResult();
}

function updateTemperatureTheme(temp, unit) {

    let celsius;

    switch (unit) {

        case "Celsius":
            celsius = temp;
            break;

        case "Fahrenheit":
            celsius = (temp - 32) * 5 / 9;
            break;

        case "Kelvin":
            celsius = temp - 273.15;
            break;
    }

    resultCard.classList.remove("cold", "warm", "hot");

    if (celsius < 10) {

        resultCard.classList.add("cold");

    } else if (celsius < 30) {

        resultCard.classList.add("warm");

    } else {

        resultCard.classList.add("hot");
    }
}

function animateResult() {

    resultCard.style.opacity = "0";
    resultCard.style.transform = "translateY(15px)";

    setTimeout(() => {

        resultCard.style.opacity = "1";
        resultCard.style.transform = "translateY(0)";

    }, 150);
}

function showError(message) {

    resultValue.textContent = message;

    resultCard.classList.remove("cold", "warm", "hot");

    resultCard.classList.add("hot");

    resultCard.classList.add("shake");

    setTimeout(() => {
        resultCard.classList.remove("shake");
    }, 500);
}