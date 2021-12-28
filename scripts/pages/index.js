    async function getPhotographers() {
        // import data from json
        const response = await fetch('data/photographers.json'); 
        // convert json to js object
        const result = await response.json();
        return ({
            // .photographers allow to select data from key photographers of json file
            photographers: [...result.photographers]}) 
    }
      
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes        
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();