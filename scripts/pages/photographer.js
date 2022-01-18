/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const gallery = document.querySelector(".section-gallery");
const sortValue = document.querySelector(".current_value");
const sortButtons = document.querySelectorAll(".button_sort");
const allMedia = Array.from(document.querySelectorAll(".media"));
const mediaVideos = Array.from(document.querySelectorAll("video"));
const likesCount = Array.from(document.querySelectorAll(".likes"));
const modal = document.querySelector("#contact_modal");
const currentValue = document.querySelector(".current_value");
const options = document.querySelector("#options");
const optionPopularity = document.querySelector("#popularity");
const optionDate = document.querySelector("#date");
const optionTitle = document.querySelector("#title");
const logoLink = document.querySelector(".logo_link");
const contactButton = document.querySelector(".contact_button");
const main = document.querySelector("#main");
const header = document.querySelector("header");
const totalLikes = document.querySelector(".total-likes");

let photographer = {};
let totalLikesCount = 0;


async function init() {
    // Récupère les datas des photographes
    const searchParams = new URLSearchParams(location.search);
    const currentPhotographerId = searchParams.get("id"); // location search allows to get the url parameter, slice allow to keep only the id number
    const { photographers, media } = await getData(); // collect every key/value from the keys photographers and media
    const photographerData = photographers.filter((photograph) => photograph.id == currentPhotographerId); // filter allows to collect every key and value from every array including key: photograph.id with value corresponding to the const photographerId or filter allows to collect all data from array when the array has the same photographId as the current photographer id
    const photographerMedias = media.filter((media) => media.photographerId == currentPhotographerId);
    photographer = {data: [...photographerData], medias: [...photographerMedias]};
    displayPhotographerData(photographer.data[0]);
    sortMedia(photographer.medias); // contain display photographer medias
}

    
async function displayPhotographerData(photographerData) {
    const { name, portrait, city, country, tagline, price, alt } = photographerData;
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
    img.setAttribute("src", picture);
    img.setAttribute("alt", alt);
    img.classList.add("photograph-portrait")
    photographHeader.appendChild(img);
    const extraBox = document.createElement( "div" );
    extraBox.classList.add("photographer-extras");
    main.appendChild(extraBox);
    const p = document.createElement( "p" );
    p.classList.add("price");
    p.textContent = `${price}€ / jour`;
    extraBox.appendChild(p);
}


async function displayPhotographerMedias(data, key) {
    // to generate new section tag
    const cardContainer = document.createElement( "div" );
    cardContainer.classList.add("card-container");
    gallery.appendChild(cardContainer);
    const totalLikes = document.createElement( "p" );
    totalLikes.classList.add("likes", "total-likes");
    totalLikes.setAttribute("count", totalLikesCount);
    totalLikes.textContent = totalLikesCount;
    document.querySelector(".photographer-extras").appendChild(totalLikes);

    let index = 0;
    data.forEach(media => {
        const { image, likes, title, video, alt } = media;
        // to create a new media card
        const card = document.createElement( "article" );
        card.classList.add("card");
        cardContainer.appendChild(card);

        // to display media ressource
        const picture = `assets/media/${key}/${image}`;
        const preview = `assets/media/${key}/${video}`;
        switch (true) { 
            case (Object.prototype.hasOwnProperty.call(media, "image")): // when (data has key "image") is true
            const img = document.createElement( "img" );
            img.setAttribute("src", picture);
            img.setAttribute("title", title);
            img.setAttribute("index", index);
            img.setAttribute("alt", alt);
            img.tabIndex = 0;
            img.classList.add("media");
            img.addEventListener("click", openLightbox);
            img.addEventListener("keydown", openLightboxWithKeyboard);
            allMedia.push(img) // for modal focus
            card.appendChild(img);
            break;
            case (Object.prototype.hasOwnProperty.call(media, "video")): // when (data has key "video") is true
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
            cardVideo.addEventListener("click", openLightbox);
            cardVideo.addEventListener("keydown", openLightboxWithKeyboard);
            allMedia.push(cardVideo) // for modal focus
            card.appendChild(cardVideo);        
            break;
        }
        index++;

        // to display card content
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);
        const h2 = document.createElement( "h2" );
        h2.textContent = title;
        cardContent.appendChild(h2);
        const mediaLikes = document.createElement( "p" );
        mediaLikes.classList.add("likes");
        mediaLikes.setAttribute("count", likes);
        mediaLikes.tabIndex = 0;
        mediaLikes.textContent = likes;
        likesCount.push(mediaLikes); // for modal focus
        totalLikesCount += (parseInt(mediaLikes.getAttribute("count")));
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;
        cardContent.appendChild(mediaLikes);
        mediaLikes.addEventListener("click", addLike);
        mediaLikes.addEventListener("keydown", addLikeWithKeyboard);
    });
}


function addLike(event) {
    const sumLikes = document.querySelector(".total-likes");
    let currentLikesCount = event.target.getAttribute("count");
    let newCount = parseInt(currentLikesCount) + 1;
    totalLikesCount ++;
    event.target.setAttribute("count", newCount);
    event.target.textContent = newCount;
    sumLikes.setAttribute("count", totalLikesCount);
    sumLikes.textContent = totalLikesCount;
}

function addLikeWithKeyboard(event) {
    if (event.key == "Enter") {
        addLike(event);
    }
}


init()