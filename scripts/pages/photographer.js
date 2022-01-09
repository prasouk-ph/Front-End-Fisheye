const gallery = document.querySelector(".section-gallery");

async function init() {
    // Récupère les datas des photographes        
    const currentPhotographerId = location.search.slice(4); // location search allows to get the url parameter, slice allow to keep only the id number
    const { photographers } = await getPhotographers(); // collect every key/value from the key photographers
    const { media } = await getMedia(); // collect every key/value from the key media
    const currentPhotographerData = photographers.filter((photograph) => photograph.id == currentPhotographerId); // filter allows to collect every key and value from every array including key: photograph.id with value corresponding to the const photographerId or filter allows to collect all data from array when the array has the same photographId as the current photographer id
    const { name } = currentPhotographerData[0];
    const photographerMediaData = media.filter((media) => media.photographerId == currentPhotographerId);
    const sortOptions = document.querySelector("#criterion");
    sortOptions.addEventListener("change", sortMedia);
    displayPhotographerData(currentPhotographerData[0]);
    sortMedia(photographerMediaData);
    const allMedia = Array.from(document.querySelectorAll(".media"));
    let actualIndex;
    allMedia.forEach(media => media.addEventListener("click", openLightbox))
    const mediaVideos = document.querySelectorAll("video");
    mediaVideos.forEach(media => media.addEventListener("click", openLightbox))

    
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
            case (sortOptions.value == "title"):
                sortByTitle(photographerMediaData);
                break
            case (sortOptions.value == "date"):
                sortByDate(photographerMediaData);
                break
            case (sortOptions.value == "popularity"):
                sortByPopularity(photographerMediaData);
                break
        }
        displayMedia(photographerMediaData, name);
    }
    

    function openLightbox(event) {
        const main = document.querySelector("#main");
        const lightbox = document.createElement( 'div' );
        lightbox.classList.add("lightbox");
        main.after(lightbox);
        const lightboxCloseButton = document.createElement( 'img' );
        lightboxCloseButton.classList.add("lightbox__close");
        lightboxCloseButton.setAttribute("src", "assets/icons/close.svg");
        const lightboxNextButton = document.createElement( 'button' );
        lightboxNextButton.classList.add("lightbox__next");
        lightboxNextButton.textContent = String.fromCharCode(10095); // unicode for next sign
        const lightboxPreviousButton = document.createElement( 'button' );
        lightboxPreviousButton.classList.add("lightbox__prev");
        lightboxPreviousButton.textContent = String.fromCharCode(10094); // unicode for previous sign
        const lightboxContainer = document.createElement( 'div' );
        lightboxContainer.classList.add("lightbox__container");
        lightbox.append(lightboxCloseButton, lightboxNextButton, lightboxPreviousButton, lightboxContainer);
        actualIndex = event.target.getAttribute("index");
        // event
        lightboxCloseButton.addEventListener("click", closeLightbox);
        lightboxNextButton.addEventListener("click", nextMedia);
        lightboxPreviousButton.addEventListener("click", previousMedia);
        document.addEventListener("keydown", keyboardAccess);

        // Appearance
        lightbox.style.display = "flex";
        displayMediaInLightbox(event.target.tagName);


        function closeLightbox() {
            lightbox.style.display = "none";
            lightbox.remove();
        }
        

        function nextMedia() {
            actualIndex++;
            if (actualIndex > allMedia.length - 1) {
                actualIndex = 0;
            }
            displayMediaInLightbox();
        }


        function previousMedia() {
            actualIndex--;
            if (actualIndex < 0) {
                actualIndex = allMedia.length - 1;
            }
            displayMediaInLightbox();
        }

        function keyboardAccess(event) {
            if (event.key == 'Escape') {
                closeLightbox();
            }
            if (event.key == 'ArrowLeft') {
                previousMedia();
            }
            if (event.key == 'ArrowRight') {
                nextMedia();
            }
        }


        function displayMediaInLightbox() {
            lightboxContainer.innerHTML = '';
            console.log(allMedia[actualIndex]);
            if (allMedia[actualIndex].tagName == "IMG") {
                let actualMedia = document.createElement( 'img' );
                actualMedia.setAttribute("src", allMedia[actualIndex].src);
                lightboxContainer.appendChild(actualMedia);
            }
            if (allMedia[actualIndex].tagName == "SOURCE") {
                console.log(allMedia[actualIndex]);
                let actualMedia = document.createElement( 'video' );
                actualMedia.setAttribute("src", allMedia[actualIndex].src);
                actualMedia.setAttribute("type", 'video/mp4');
                actualMedia.setAttribute("controls", 'controls');
                lightboxContainer.appendChild(actualMedia);
            }
            const mediaTitle = document.createElement( 'h2' );
            const titleAttr = allMedia[actualIndex].getAttribute("title")
            mediaTitle.classList.add("media-title");
            mediaTitle.textContent = titleAttr;
            lightboxContainer.appendChild(mediaTitle);
        }
    }  
};


async function getPhotographers() {
    // import data from json
    const response = await fetch('data/photographers.json'); 
    // convert json to js object
    const result = await response.json();
    return ({
        photographers: [...result.photographers] // .photographers allow to select every data from key photographers from json file
    }) 
}


async function getMedia() {
    const response = await fetch('data/photographers.json'); // import data from json
    const result = await response.json(); // convert json to js object
    return ({
        media: [...result.media] // .media allow to select every data from key media from json file
    }) 
}


async function displayPhotographerData(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const photographHeader = document.querySelector(".photograph-header");
    const photographData = document.createElement( 'div' );
    photographData.classList.add("photograph-data");
    photographHeader.appendChild(photographData);
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const modalLabel = document.querySelector(".modal_label");
    modalLabel.innerHTML = `Contactez-moi <br>${name}`;
    photographData.appendChild(h2);
    const h3 = document.createElement( 'h3' );
    h3.textContent = `${city}, ${country}`;
    photographData.appendChild(h3);
    const slogan = document.createElement( 'p' );
    slogan.textContent = tagline;
    photographData.appendChild(slogan);
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture)
    img.classList.add("photograph-portrait")
    photographHeader.appendChild(img);
    const main = document.querySelector("main");
    const extraBox = document.createElement( 'div' );
    extraBox.classList.add("photographer-extras");
    main.appendChild(extraBox);
    const p = document.createElement( 'p' );
    p.classList.add("price");
    p.textContent = `${price}€ / jour`;
    extraBox.appendChild(p);
};


async function displayMedia(data, key) {
    // to generate new section tag
    const cardContainer = document.createElement( 'div' );
    cardContainer.classList.add("card-container");
    gallery.appendChild(cardContainer);
    let totalLikesCount = 0;
    const totalLikes = document.createElement( 'p' );
    totalLikes.classList.add("likes", "total-likes");
    totalLikes.setAttribute("count", totalLikesCount);
    totalLikes.textContent = totalLikesCount;
    document.querySelector(".photographer-extras").appendChild(totalLikes);

    let index = 0;
    data.forEach(media => {
        const { image, likes, title, video } = media;
        // to create a new media card
        const card = document.createElement( 'div' );
        card.classList.add("card");
        cardContainer.appendChild(card);

        // to display media ressource
        const picture = `assets/media/${key}/${image}`;
        const preview = `assets/media/${key}/${video}`;
        switch (true) { 
            case (media.hasOwnProperty('image')): // when (data has key 'image') is true
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("title", title);
            img.setAttribute("index", index);
            img.classList.add("media");
            card.appendChild(img);
            break;
            case (media.hasOwnProperty('video')): // when (data has key 'video') is true
            const cardVideo = document.createElement( 'video' );
            // cardVideo.setAttribute("controls", "controls"); // without controls can't be played
            const sourceVideo = document.createElement( 'source' );
            sourceVideo.setAttribute("src", preview);
            sourceVideo.setAttribute("type", 'video/mp4');
            sourceVideo.setAttribute("title", title);
            sourceVideo.classList.add("media");
            cardVideo.setAttribute("index", index); // should be on cardVideo and not sourceVideo
            cardVideo.appendChild(sourceVideo);
            card.appendChild(cardVideo);        
            break;
        };
        index++;

        // to display card content
        const cardContent = document.createElement( 'div' );
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        cardContent.appendChild(h2);
        const likescount = document.createElement( 'p' );
        likescount.classList.add("likes");
        likescount.setAttribute("count", likes);
        likescount.textContent = likes;
        totalLikesCount += (parseInt(likescount.getAttribute("count")));
        const totalLikes = document.querySelector(".total-likes");
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;
        likescount.addEventListener("click", addLike);
        cardContent.appendChild(likescount);


        function addLike() {
            let actualLikesCount = likescount.getAttribute("count");
            let newCount = parseInt(actualLikesCount) + 1;
            totalLikesCount ++;
            likescount.setAttribute("count", newCount);
            likescount.textContent = newCount;
            totalLikes.setAttribute("count", totalLikesCount);
            totalLikes.textContent = totalLikesCount;
        }
    });
};






init();

