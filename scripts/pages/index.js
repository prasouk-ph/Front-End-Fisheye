    async function getPhotographers() {
        const response = await fetch('./data/photographers.json'); // import data from json
        const result = await response.json(); // convert json to js object
        console.log(result);
        return ({
            photographers: [...result.photographers]}) // .photographers allow to select data from key photographers of json file
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

    function photographerFactory(data) {
        const { name, portrait, city, country, tagline, price, id } = data;
    
        const picture = `assets/photographers/${portrait}`;
    
        function getUserCardDOM() {
            const article = document.createElement( 'article' );
            const headerCard = document.createElement( 'div' );
            headerCard.classList.add("card-header")
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture)
            const cardContent = document.createElement( 'div' );
            cardContent.classList.add("card-content")
            const h2 = document.createElement( 'h2' );
            const h3 = document.createElement( 'h3' );
            const slogan = document.createElement( 'p' );
            slogan.classList.add("slogan");
            const priceContainer = document.createElement( 'p' );
            const link = document.createElement( 'a' );
            h2.textContent = name;
            h3.textContent = `${city}, ${country}`;
            slogan.textContent = tagline;
            priceContainer.textContent = `${price}€/jour`;
            link.href = `photographer.html?id=${id}`;
            article.appendChild(headerCard);
            article.appendChild(cardContent);
            headerCard.appendChild(link);
            link.appendChild(img);
            link.appendChild(h2);
            cardContent.appendChild(h3);
            cardContent.appendChild(slogan);
            cardContent.appendChild(priceContainer);
            return (article);
        }
        return { name, picture, getUserCardDOM }
    }
    
    init();