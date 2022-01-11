const gallery = document.querySelector(".section-gallery");


async function init() {
    // Récupère les datas des photographes
    const currentPhotographerId = location.search.slice(4); // location search allows to get the url parameter, slice allow to keep only the id number
    const { photographers } = await getPhotographers(); // collect every key/value from the key photographers
    const { media } = await getMedia(); // collect every key/value from the key media
    const currentPhotographerData = photographers.filter((photograph) => photograph.id == currentPhotographerId); // filter allows to collect every key and value from every array including key: photograph.id with value corresponding to the const photographerId or filter allows to collect all data from array when the array has the same photographId as the current photographer id
    const { name } = currentPhotographerData[0];
    const photographerMediaData = media.filter((media) => media.photographerId == currentPhotographerId);
    const sortOptions = document.querySelector(".current_value");
    displayPhotographerData(currentPhotographerData[0]);
    sortMedia(photographerMediaData);
    

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
};


async function getPhotographers() {
    // import data from json
    const response = await fetch("data/photographers.json"); 
    // convert json to js object
    const result = await response.json();
    return ({
        photographers: [...result.photographers] // .photographers allow to select every data from key photographers from json file
    }) 
}


async function getMedia() {
    const response = await fetch("data/photographers.json"); // import data from json
    const result = await response.json(); // convert json to js object
    return ({
        media: [...result.media] // .media allow to select every data from key media from json file
    }) 
}


async function displayPhotographerData(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const photographHeader = document.querySelector(".photograph-header");
    const photographData = document.createElement( "div" );
    photographData.classList.add("photograph-data");
    photographHeader.appendChild(photographData);
    const h2 = document.createElement( "h2" );
    h2.textContent = name;
    const modalLabel = document.querySelector(".modal_label");
    modalLabel.innerHTML = `Contactez-moi <br>${name}`;
    photographData.appendChild(h2);
    const h3 = document.createElement( "h3" );
    h3.textContent = `${city}, ${country}`;
    photographData.appendChild(h3);
    const slogan = document.createElement( "p" );
    slogan.textContent = tagline;
    photographData.appendChild(slogan);
    const img = document.createElement( "img" );
    img.setAttribute("src", picture)
    img.classList.add("photograph-portrait")
    photographHeader.appendChild(img);
    const main = document.querySelector("main");
    const extraBox = document.createElement( "div" );
    extraBox.classList.add("photographer-extras");
    main.appendChild(extraBox);
    const p = document.createElement( "p" );
    p.classList.add("price");
    p.textContent = `${price}€ / jour`;
    extraBox.appendChild(p);
};


async function displayMedia(data, key) {
    // to generate new section tag
    const cardContainer = document.createElement( "div" );
    cardContainer.classList.add("card-container");
    gallery.appendChild(cardContainer);
    let totalLikesCount = 0;
    const totalLikes = document.createElement( "p" );
    totalLikes.classList.add("likes", "total-likes");
    totalLikes.setAttribute("count", totalLikesCount);
    totalLikes.textContent = totalLikesCount;
    document.querySelector(".photographer-extras").appendChild(totalLikes);

    let index = 0;
    data.forEach(media => {
        const { image, likes, title, video } = media;
        // to create a new media card
        const card = document.createElement( "article" );
        card.classList.add("card");
        cardContainer.appendChild(card);

        // to display media ressource
        const picture = `assets/media/${key}/${image}`;
        const preview = `assets/media/${key}/${video}`;
        switch (true) { 
            case (media.hasOwnProperty("image")): // when (data has key "image") is true
            const img = document.createElement( "img" );
            img.setAttribute("src", picture);
            img.setAttribute("title", title);
            img.setAttribute("index", index);
            img.tabIndex = 0;
            img.classList.add("media");
            card.appendChild(img);
            break;
            case (media.hasOwnProperty("video")): // when (data has key "video") is true
            const cardVideo = document.createElement( "video" );
            // cardVideo.setAttribute("controls", "controls"); // without controls can"t be played
            const sourceVideo = document.createElement( "source" );
            sourceVideo.setAttribute("src", preview);
            sourceVideo.setAttribute("type", "video/mp4");
            sourceVideo.setAttribute("title", title);
            sourceVideo.classList.add("media");
            cardVideo.setAttribute("index", index); // should be on cardVideo and not sourceVideo
            cardVideo.tabIndex = 0;
            cardVideo.appendChild(sourceVideo);
            card.appendChild(cardVideo);        
            break;
        };
        index++;

        // to display card content
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);
        const h2 = document.createElement( "h2" );
        h2.textContent = title;
        cardContent.appendChild(h2);
        const likescount = document.createElement( "p" );
        likescount.classList.add("likes");
        likescount.setAttribute("count", likes);
        likescount.tabIndex = 0;
        likescount.textContent = likes;
        totalLikesCount += (parseInt(likescount.getAttribute("count")));
        const totalLikes = document.querySelector(".total-likes");
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;
        likescount.addEventListener("click", addLike);
        likescount.addEventListener("keydown", addLikeWithKeyboard);
        cardContent.appendChild(likescount);

        
        function addLike() {
            let currentLikesCount = likescount.getAttribute("count");
            let newCount = parseInt(currentLikesCount) + 1;
            totalLikesCount ++;
            likescount.setAttribute("count", newCount);
            likescount.textContent = newCount;
            totalLikes.setAttribute("count", totalLikesCount);
            totalLikes.textContent = totalLikesCount;
        }

        function addLikeWithKeyboard(event) {
            if (event.key == "Enter") {
            let currentLikesCount = likescount.getAttribute("count");
            let newCount = parseInt(currentLikesCount) + 1;
            totalLikesCount ++;
            likescount.setAttribute("count", newCount);
            likescount.textContent = newCount;
            totalLikes.setAttribute("count", totalLikesCount);
            totalLikes.textContent = totalLikesCount;
            }
        }
    });

    const allMedia = Array.from(document.querySelectorAll(".media"));
    allMedia.forEach(media => media.addEventListener("click", openLightbox))
    allMedia.forEach(media => media.addEventListener("keydown", openLightboxWithKeyboard))
    const mediaVideos = document.querySelectorAll("video");
    mediaVideos.forEach(media => media.addEventListener("click", openLightbox))
    mediaVideos.forEach(media => media.addEventListener("keydown", openLightboxWithKeyboard))

    const currentValue = document.querySelector(".current_value");
    const options = document.querySelector(".options");
    const optionPopularity = document.querySelector("#popularity");
    const optionDate = document.querySelector("#date");
    const optionTitle = document.querySelector("#title");
    const sortButtons = document.querySelectorAll(".button_sort");
    const logoLink = document.querySelector(".logo_link");
    const contactButton = document.querySelector(".contact_button");
    const likesCount = document.querySelectorAll(".likes");


    function openLightboxWithKeyboard(event) {
        if (event.key == "Enter") {
            openLightbox(event);
        }
    }

    function openLightbox(event) {
        // to prevent opening when sort menu is open
        const sortMenu = document.querySelector(".button_sort");
        let result = sortMenu.getAttribute("aria-expanded");
        if (result == "true") {
            return
        }
        
        const main = document.querySelector("#main");
        const lightbox = document.createElement( "div" );
        lightbox.classList.add("lightbox");
        main.after(lightbox);
        const lightboxCloseButton = document.createElement( "img" );
        lightboxCloseButton.classList.add("lightbox__close");
        lightboxCloseButton.setAttribute("src", "assets/icons/redclose.svg");
        lightboxCloseButton.tabIndex = 0;
        const lightboxNextButton = document.createElement( "button" );
        lightboxNextButton.classList.add("lightbox__next");
        lightboxNextButton.textContent = String.fromCharCode(10095); // unicode for next sign
        const lightboxPreviousButton = document.createElement( "button" );
        lightboxPreviousButton.classList.add("lightbox__prev");
        lightboxPreviousButton.textContent = String.fromCharCode(10094); // unicode for previous sign
        const lightboxContainer = document.createElement( "div" );
        lightboxContainer.classList.add("lightbox__container");
        lightbox.append(lightboxCloseButton, lightboxNextButton, lightboxPreviousButton, lightboxContainer);
        let currentIndex = event.target.getAttribute("index");
        // event
        lightboxCloseButton.addEventListener("click", closeLightbox);
        lightboxNextButton.addEventListener("click", nextMedia);
        lightboxPreviousButton.addEventListener("click", previousMedia);
        document.addEventListener("keydown", lightboxNavigationWithKeyboard);
        // Appearance
        lightbox.style.display = "flex";
        lightboxCloseButton.focus();
        displayMediaInLightbox();
        

        function closeLightbox() {
            lightbox.remove();
            document.removeEventListener("keydown", lightboxNavigationWithKeyboard);
            currentValue.tabIndex = 0;
            optionPopularity.tabIndex = 0;
            optionDate.tabIndex = 0;
            optionTitle.tabIndex = 0;
            sortButtons.tabIndex = 0;
            logoLink.tabIndex = 0;
            contactButton.tabIndex = 0;
            allMedia.forEach(media => media.tabIndex = 0);
            mediaVideos.forEach(media => media.tabIndex = 0);
            likesCount.forEach(media => media.tabIndex = 0);
            totalLikes.tabIndex = -1
        }
        

        function nextMedia() {
            currentIndex++;
            if (currentIndex > allMedia.length - 1) {
                currentIndex = 0;
            }
            displayMediaInLightbox();
        }


        function previousMedia() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = allMedia.length - 1;
            }
            displayMediaInLightbox();
        }


        function lightboxNavigationWithKeyboard(event) {
            switch (true) {
                case (event.key == "Escape"):
                    closeLightbox();
                    break
                case (event.key == "Enter" && event.target.className.includes("lightbox__close")):
                    closeLightbox();
                    break
                case (event.key == "ArrowLeft"):
                    previousMedia();
                    break
                case (event.key == "ArrowRight"):
                    nextMedia();
                    break
            }
        }


        function displayMediaInLightbox() {
            lightboxContainer.innerHTML = "";
            if (allMedia[currentIndex].tagName == "IMG") {
                let currentMedia = document.createElement( "img" );
                currentMedia.setAttribute("src", allMedia[currentIndex].src);
                lightboxContainer.appendChild(currentMedia);
            }
            if (allMedia[currentIndex].tagName == "SOURCE") {
                let currentMedia = document.createElement( "video" );
                currentMedia.setAttribute("src", allMedia[currentIndex].src);
                currentMedia.setAttribute("type", "video/mp4");
                currentMedia.setAttribute("controls", "controls");
                lightboxContainer.appendChild(currentMedia);
            }
            const mediaTitle = document.createElement( "h2" );
            const titleAttr = allMedia[currentIndex].getAttribute("title")
            mediaTitle.classList.add("media-title");
            mediaTitle.textContent = titleAttr;
            lightboxContainer.appendChild(mediaTitle);

            currentValue.tabIndex = -1;
            options.tabIndex = -1;
            optionPopularity.tabIndex = -1;
            optionDate.tabIndex = -1;
            optionTitle.tabIndex = -1;
            sortButtons.tabIndex = -1;
            logoLink.tabIndex = -1;
            contactButton.tabIndex = -1;
            allMedia.forEach(media => media.tabIndex = -1);
            mediaVideos.forEach(media => media.tabIndex = -1);
            likesCount.forEach(media => media.tabIndex = -1);
        }
    }  
};


init();