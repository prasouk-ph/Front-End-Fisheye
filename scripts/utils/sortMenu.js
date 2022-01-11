const sortOptions = document.querySelector(".current_value");
const currentValue = document.querySelector(".current_value");
const options = document.querySelector(".options");
const optionPopularity = document.querySelector("#popularity");
const optionDate = document.querySelector("#date");
const optionTitle = document.querySelector("#title");
const sortButtons = document.querySelectorAll(".button_sort");
const logoLink = document.querySelector(".logo_link");
const contactButton = document.querySelector(".contact_button");
const allMedia = Array.from(document.querySelectorAll(".media"));
const mediaVideos = document.querySelectorAll("video");
const likesCount = document.querySelectorAll(".likes");

// Event
sortButtons.forEach(button => button.addEventListener("click", openDropdown))
let sortOptionsListener = new MutationObserver(mutationsReaction); // behave like event listener, detect when element change, define instructions when change detected with function in parameter
sortOptionsListener.observe(sortOptions, { childList: true } ); // define the element to observe and the type of change, childlist true detect textContent


function openDropdown(event) {
    let choice = event.target;
    document.addEventListener("click", closeDropdown);
    currentValue.textContent = choice.textContent;
    currentValue.setAttribute("aria-expanded", "true");
    optionPopularity.style.display = "flex";
    optionDate.style.display = "flex";
    optionTitle.style.display = "flex";
    options.style.display = "block";
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


function closeDropdown(event) {
    if (event.target.className.includes("current_value")) {
        options.style.display = "block";
    } else {
        document.removeEventListener("keydown", closeDropdown);
        document.removeEventListener("click", closeDropdown);
        options.style.display = "none";
        currentValue.setAttribute("aria-expanded", "false");
        logoLink.tabIndex = 0;
        contactButton.tabIndex = 0;
        allMedia.forEach(media => media.tabIndex = 0);
        mediaVideos.forEach(media => media.tabIndex  = 0);
        likesCount.forEach(likes => likes.tabIndex  = 0);
    }
    
}


function sortByTitle(array) {
    array.sort(function(x, y) {
        if (x.title < y.title) return -1;
        if (x.title > y.title) return 1;
        return 0;
    });
}


function sortByDate(array) {
    array.sort(function(x, y) {
        if (x.date < y.date) return -1;
        if (x.date > y.date) return 1;
        return 0;
    });
}


function sortByPopularity(array) {
    array.sort(function(x, y) {
        if (x.likes < y.likes) return -1;
        if (x.likes > y.likes) return 1;
        return 0;
    });
}


function sortMedia() {
    const cardContainer = document.querySelector(".card-container");
    const extraBox = document.querySelector(".photographer-extras");
    const totalLikes = document.querySelector(".total-likes");
    
    if (document.body.contains(cardContainer)) {
        gallery.removeChild(cardContainer);
        extraBox.removeChild(totalLikes);
    }

    switch (true) {
        case (sortOptions.textContent == "Titre"):
            sortByTitle(photographerMediaData);
            break
        case (sortOptions.textContent == "Date"):
            sortByDate(photographerMediaData);
            break
        case (sortOptions.textContent == "Popularité"):
            sortByPopularity(photographerMediaData);
            break
    }
    displayMedia(photographerMediaData, name);
}


function mutationsReaction(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length > 0) { // when textContent change
            sortMedia();
        }
    }
};