function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function formValidate(event) {
    let firstName = document.querySelector("#firstname");
    let lastName = document.querySelector("#lastname");
    let message = document.querySelector("#message");
    event.preventDefault();
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(message.value);
    closeModal();
}