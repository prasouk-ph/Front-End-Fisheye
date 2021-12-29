//Mettre le code JavaScript lié à la page photographer.html
let photographerId = location.search.slice(4); // location search permit to get the url parameter, slice allow to keep only the id number

async function init() {
    // Récupère les datas des photographes        
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    const currentPhotographer = photographers.filter((photograph) => photograph.id == photographerId)
    console.log(currentPhotographer);

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
        // .photographers allow to select data from key photographers of json file
        media: [...result.media]
    }) 
}