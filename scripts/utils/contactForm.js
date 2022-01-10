const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const message = document.querySelector("#message");
const buttonClose = document.querySelector(".modal_button");


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


function formValidate(event) {
    event.preventDefault();
    firstCheck();
    lastCheck();
    messageCheck(); 
    if (
    firstCheck() &&
    lastCheck() &&
    messageCheck() 
    ) {
    console.log(`Prénom : ${firstName.value}`);
    console.log(`Nom : ${lastName.value}`);
    console.log(`Message : ${message.value}`);
    closeModal();
    }
}


// event
firstName.addEventListener("input", firstCheck);
lastName.addEventListener("input", lastCheck);
message.addEventListener("input", messageCheck);
document.addEventListener("keydown", keyboardAccess);
buttonClose.addEventListener("keydown", closeWithEnter);

// input conditions
function firstCheck() {
    let value = firstName.value;
    // regex interpretation: start with any letter, after the first letter can contains 0 or 1 "-" , should finish with a letter
    let letters = /^[A-Za-zÀ-ÿ]+(-{0,1})[A-Za-zÀ-ÿ]+$/;
    let input = document.querySelector("#firstname-input");
    if (value.length < 2 || letters.test(value) == false) {
        inputIsNotvalid(input, "Veuillez entrer 2 caractères ou plus");
        return false;
    } else {
        inputValid(input);
        return true;
    }
}


function lastCheck() {
    let value = lastName.value;
    let letters = /^[A-Za-zÀ-ÿ]+(-{0,1})[A-Za-zÀ-ÿ]+$/;
    let input = document.querySelector("#lastname-input");
    if (value.length < 2 || letters.test(value) == false) {
        inputIsNotvalid(input, "Veuillez entrer 2 caractères ou plus");
        return false;
    } else {
        inputValid(input);
        return true;
    }
}


function messageCheck() {
    let value = message.value;
    let input = document.querySelector("#message-input");
    if (value.length < 2) {
        inputIsNotvalid(input, "Veuillez entrer 2 caractères ou plus");
        return false;
    } else {
        inputValid(input);
        return true;
    }
}


// error display
function inputIsNotvalid(input, error) {
    input.setAttribute("data-error-visible", "true");
    // data-error attribute creation with text value, works with formData::after in css
    input.setAttribute("data-error", error);
}


function inputValid(input) {
    input.setAttribute("data-error-visible", "false");
    // to remove the space create by the error
    input.removeAttribute("data-error");
}


function keyboardAccess(event) {
    if (event.key == "Escape") {
        closeModal();
    }
}

function closeWithEnter(event) {
    if (event.key == "Enter") {
        closeModal();
    }
}