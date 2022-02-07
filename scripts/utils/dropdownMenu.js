/* eslint-disable no-undef */
sortButtons.forEach(button => button.addEventListener("click", openDropdown))
    
let sortOptionsListener = new MutationObserver(mutationsReaction); // behave like event listener, detect when element change, define instructions when change detected with function in parameter
sortOptionsListener.observe(sortValue, { childList: true } ); // define the element to observe and the type of change, childlist true detect textContent


function mutationsReaction(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length > 0 && Object.entries(photographer).length > 0) { // when textContent change and if photographer is not empty
            sortMedia();
        } else {
            console.log("Aucune donnée trouvée")
        }
    }
}


function openDropdown(event) {
    let choice = event.target;
    document.addEventListener("click", closeDropdownOnClick);
    document.addEventListener("keydown", closeDropdownWithKeyboard);

    currentValue.textContent = choice.textContent;
    currentValue.setAttribute("aria-expanded", "true");
    optionPopularity.style.display = "flex";
    optionDate.style.display = "flex";
    optionTitle.style.display = "flex";
    options.style.display = "block";

    // focus management
    logoLink.tabIndex = -1;
    contactButton.tabIndex = -1;
    allMedia.forEach(media => media.tabIndex = -1);
    mediaVideos.forEach(media => media.tabIndex = -1);
    likesCount.forEach(likes => likes.tabIndex = -1);

    switch (true) {
        case (optionPopularity.textContent == currentValue.textContent):
            optionPopularity.style.display = "none";
            break
        case (optionDate.textContent == currentValue.textContent):
            optionDate.style.display = "none";
            break
        case (optionTitle.textContent == currentValue.textContent):
            optionTitle.style.display = "none";
            break
    }
}


function closeDropdown() {
        document.removeEventListener("keydown", closeDropdownWithKeyboard);
        document.removeEventListener("click", closeDropdownOnClick);

        options.style.display = "none";
        currentValue.setAttribute("aria-expanded", "false");

        // focus management
        logoLink.tabIndex = 0;
        contactButton.tabIndex = 0;
        allMedia.forEach(media => media.tabIndex = 0);
        mediaVideos.forEach(media => media.tabIndex  = 0);
        likesCount.forEach(likes => likes.tabIndex  = 0);
}


function closeDropdownWithKeyboard(event) {
    if (event.key == "Escape") {
        closeDropdown();
    }
}


function closeDropdownOnClick(event) {
    if (event.target.className.includes("current_value")) {
        options.style.display = "block";
    } else {
        closeDropdown();
    }
}