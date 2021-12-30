//Mettre le code JavaScript lié à la page photographer.html
let photographerId = location.search.slice(4); // location search allows to get the url parameter, slice allow to keep only the id number

async function init() {
    // Récupère les datas des photographes        
    const { photographers } = await getPhotographers(); // collect every key/value from the key photographers
    const { media } = await getMedia(); // collect every key/value from the key media
    // filter allows to collect every key and value from array including key: photograph.id with value corresponding to the const photographerId
    const currentPhotographerData = photographers.filter((photograph) => photograph.id == photographerId) 
    const photographerMediaData = media.filter((media) => media.photographerId == photographerId)
    displayPhotographerData(currentPhotographerData[0]);
    // displayMedia(photographerMediaData);
};

init();

async function getPhotographers() {
    // import data from json
    const response = await fetch('data/photographers.json'); 
    // convert json to js object
    const result = await response.json();
    return ({
        // .photographers allow to select data from key photographers of json file
        photographers: [...result.photographers]
    }) 
}

async function getMedia() {
    // import data from json
    const response = await fetch('data/photographers.json'); 
    // convert json to js object
    const result = await response.json();
    return ({
        // .media allow to select data from key media of json file
        media: [...result.media]
    }) 
}

async function displayPhotographerData(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    const photographHeader = document.querySelector(".photograph-header");
    const photographData = document.createElement( 'div' );
    photographData.classList.add("photograph-data")
    photographHeader.appendChild(photographData);
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
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


    // photographers.forEach((photographer) => {
    //     const photographerModel = photographerFactory(photographer);
    //     const userCardDOM = photographerModel.getUserCardDOM();
    //     photographersSection.appendChild(userCardDOM);
    // });
};