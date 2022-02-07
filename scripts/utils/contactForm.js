/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const firstName = document.querySelector("#firstname");
const firstNameError = document.querySelector("#firstname-format");
const lastName = document.querySelector("#lastname");
const lastNameError = document.querySelector("#lastname-format");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-format");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-format");
const buttonClose = document.querySelector(".modal_button");
const form = document.querySelector(".modal-form");


function displayModal() {
    // to prevent opening when sort menu is open
    const sortMenu = document.querySelector(".button_sort");
    let result = sortMenu.getAttribute("aria-expanded");
    if (result == "true") {
        return
    }

	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    document.addEventListener("keydown", keyboardAccess);

    // focus management
    buttonClose.focus();
    currentValue.tabIndex = -1;
    options.tabIndex = -1;
    optionPopularity.tabIndex = -1;
    optionDate.tabIndex = -1;
    optionTitle.tabIndex = -1;
    logoLink.tabIndex = -1;
    contactButton.tabIndex = -1;
    allMedia.forEach(media => media.tabIndex = -1);
    mediaVideos.forEach(media => media.tabIndex = -1);
    likesCount.forEach(media => media.tabIndex = -1);
}


function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
    document.removeEventListener("keydown", keyboardAccess);

    // focus management
    currentValue.tabIndex = 0;
    optionPopularity.tabIndex = 0;
    optionDate.tabIndex = 0;
    optionTitle.tabIndex = 0;
    logoLink.tabIndex = 0;
    contactButton.tabIndex = 0;
    allMedia.forEach(media => media.tabIndex = 0);
    mediaVideos.forEach(media => media.tabIndex = 0);
    likesCount.forEach(media => media.tabIndex = 0);
}


function formValidate(event) {
    event.preventDefault();
    firstCheck();
    lastCheck();
    emailCheck();
    messageCheck(); 

    if (
    firstCheck() &&
    lastCheck() &&
    emailCheck() &&
    messageCheck() 
    ) {
    console.log(`Prénom : ${firstName.value}`);
    console.log(`Nom : ${lastName.value}`);
    console.log(`Message : ${message.value}`);

    form.reset();
    closeModal();
    }
}


// event
firstName.addEventListener("input", firstCheck);
lastName.addEventListener("input", lastCheck);
email.addEventListener("input", emailCheck);
message.addEventListener("input", messageCheck);


// input conditions
function firstCheck() {
    let value = firstName.value;
    // regex interpretation: start with any letter, after the first letter can contains 0 or 1 "-" , should finish with a letter
    let letters = /^[A-Za-zÀ-ÿ]+(-{0,1})[A-Za-zÀ-ÿ]+$/;
    let input = document.querySelector("#firstname-input");

    if (value.length < 2 || letters.test(value) == false) {
        inputIsNotvalid(input, "Veuillez entrer 2 caractères ou plus");
        firstNameError.setAttribute("aria-hidden", "false");
        return false;
    } else {
        inputValid(input);
        firstNameError.setAttribute("aria-hidden", "true");
        return true;
    }
}


function lastCheck() {
    let value = lastName.value;
    let letters = /^[A-Za-zÀ-ÿ]+(-{0,1})[A-Za-zÀ-ÿ]+$/;
    let input = document.querySelector("#lastname-input");

    if (value.length < 2 || letters.test(value) == false) {
        inputIsNotvalid(input, "Veuillez entrer 2 caractères ou plus");
        lastNameError.setAttribute("aria-hidden", "false");
        return false;
    } else {
        inputValid(input);
        lastNameError.setAttribute("aria-hidden", "true");
        return true;
    }
}


function emailCheck() {
    let value = email.value;
	let regex = /^[A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]+$/;
    let input = document.querySelector("#email-input");
    if (regex.test(value) == false) {
        inputIsNotvalid(input, "Veuillez entrer un email valide");
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
        messageError.setAttribute("aria-hidden", "false");
        return false;
    } else {
        inputValid(input);
        messageError.setAttribute("aria-hidden", "true");
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
    switch (true) {
        case (event.key == "Escape"):
            closeModal();
            break
        case (event.key == "Enter" && event.target.className.includes("modal_button")):
            closeModal();
            break
    }
}
