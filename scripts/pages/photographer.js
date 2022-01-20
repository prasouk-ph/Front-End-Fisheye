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
    const currentPhotographerId = searchParams.get("id");
    const { photographers, media } = await getData(); // collect every key/value from the keys photographers and media
    const photographerData = photographers.filter((photograph) => photograph.id == currentPhotographerId); // filter allows to collect every key and value from every array including key: photograph.id with value corresponding to the const photographerId or filter allows to collect all data from array when the array has the same photographId as the current photographer id
    if (photographerData.length == 0) {
        return console.log("ID inexistant !");
    }
    const photographerMedias = media.filter((media) => media.photographerId == currentPhotographerId);
    photographer = {data: [...photographerData], medias: [...photographerMedias]};
    displayPhotographerData(photographer.data[0]);
    sortMedia(photographer.medias); // contain display photographer medias
}


async function displayPhotographerData(photographerData) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographerData, "full");
    const photographerDOM = photographerModel.getPhotographerData();
    photographHeader.appendChild(photographerDOM);
}


async function displayPhotographerMedias(medias, photographerName) {
    // to generate new section tag that will contains card
    const cardContainer = document.createElement( "div" );
    cardContainer.classList.add("card-container");
    gallery.appendChild(cardContainer);
    // to generate total likes count
    const totalLikes = document.createElement( "p" );
    totalLikes.classList.add("likes", "total-likes");
    totalLikes.setAttribute("count", totalLikesCount);
    totalLikes.textContent = totalLikesCount;
    document.querySelector(".photographer-extras").appendChild(totalLikes);

    // to create media card
    let index = 0;
    medias.forEach(media => {
        const mediaModel = mediaCardFactory(media, photographerName, index);
        const mediaCard = mediaModel.getMediaCard();
        cardContainer.appendChild(mediaCard);
        index++;
    })
}


init()