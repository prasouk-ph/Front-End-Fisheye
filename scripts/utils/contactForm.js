const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const message = document.querySelector("#message");
const buttonClose = document.querySelector(".modal_button");
const modal = document.querySelector("#contact_modal");
const currentValue = document.querySelector(".current_value");
const options = document.querySelector(".options");
const optionPopularity = document.querySelector("#popularity");
const optionDate = document.querySelector("#date");
const optionTitle = document.querySelector("#title");
const logoLink = document.querySelector(".logo_link");
const contactButton = document.querySelector(".contact_button");
const main = document.querySelector("#main");
const header = document.querySelector("header");


function displayModal() {
    // to prevent opening when sort menu is open
    const sortMenu = document.querySelector(".button_sort");
    let result = sortMenu.getAttribute("aria-expanded");
    if (result == "true") {
        return
    }
    
    const allMedia = (document.querySelectorAll(".media"));
    const mediaVideos = document.querySelectorAll("video");
    const likesCount = document.querySelectorAll(".likes");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    document.addEventListener("keydown", keyboardAccess);
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
    const allMedia = (document.querySelectorAll(".media"));
    const mediaVideos = document.querySelectorAll("video");
    const likesCount = document.querySelectorAll(".likes");
    const totalLikes = document.querySelector(".total-likes");
    document.removeEventListener("keydown", keyboardAccess);
    currentValue.tabIndex = 0;
    optionPopularity.tabIndex = 0;
    optionDate.tabIndex = 0;
    optionTitle.tabIndex = 0;
    logoLink.tabIndex = 0;
    contactButton.tabIndex = 0;
    allMedia.forEach(media => media.tabIndex = 0);
    mediaVideos.forEach(media => media.tabIndex = 0);
    likesCount.forEach(media => media.tabIndex = 0);
    totalLikes.tabIndex = -1;
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
    switch (true) {
        case (event.key == "Escape"):
            closeModal();
            break
        case (event.key == "Enter" && event.target.className.includes("modal_button")):
            closeModal();
            break
    }
}
