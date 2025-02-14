// grab HTML elements

const formFields = document.querySelectorAll("#collectionForm input");
const form = document.getElementById("collectionForm");

// main value field checker

function validateField(field, validator, errorMsg) {
    const errorSpan = field.nextElementSibling; // selects the immediately next span element 
    if(!validator(field.value)) {
        field.classList.add("invalid"); // adds invalid as a class in the element
        field.classList.remove("valid"); // removes valid as a class in the element
        errorSpan.textContent = errorMsg; // adds errorMsg
    } else {
        field.classList.add("valid"); // vice-versa
        field.classList.remove("invalid"); // vice-versa
        errorSpan.textContent = ""; // sets errorMsg as an empty string
    }
}


// specific validation per field
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // ensures the email follows email format
}

function isOnlyString(value) {
    return /^[A-Za-z\s]+$/.test(value); // accepts only strings
}


function isValidPostalCode(value) {
    return /^[A-Za-z0-9\s-]{3,10}$/.test(value); // Adjust regex based on country
}

function isValidPassword(value) {
    return value.length >= 6;
}

function doPasswordMatch() {
    return password.value === passwordConfirmation.value;
}


// add events listeners and trigger error message when user leaves the field
formFields.forEach(field => {
    field.addEventListener("blur", function () {
        if (field.id === "email") validateField(field, isValidEmail, "Invalid email");
        if (field.id === "country") validateField(field, isOnlyString, "Invalid country");
        if (field.id === "postalCode") validateField(field, isValidPostalCode, "Invalid postal code")
        if (field.id === "password") validateField(field, isValidPassword, "Invalid password")
        if (field.id === "passwordConfirmation") validateField(field, doPasswordMatch, "passwords must match")
    })
})

// function to prevent form submission if validation does not satisfy
form.addEventListener("submit", function (event) {
    let isValid = true;
    formFields.forEach(field => {
        if (field.classList.contains("invalid")) {
            isValid = false;
        };
    });
    if (!isValid) {
        event.preventDefault()
    } else {
        event.preventDefault();  
        window.location.href = "./high-five.html";
    }
});