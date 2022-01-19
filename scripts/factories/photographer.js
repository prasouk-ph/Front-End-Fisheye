/* eslint-disable no-unused-vars */
function photographerFactory(data, type) {
    const { name, portrait, city, country, tagline, price, id, alt } = data;

    const picture = `assets/photographers/${portrait}`;

    if (type === "thumbnail") {
        return { name, picture, getUserCardDOM }
    }

    if (type === "full") {
        return { name, picture, getPhotographerData }
    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const headerCard = document.createElement( 'div' );
        headerCard.classList.add("card-header")
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", alt);
        const cardContent = document.createElement( 'div' );
        cardContent.classList.add("card-content")
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const slogan = document.createElement( 'p' );
        slogan.classList.add("slogan");
        const priceContainer = document.createElement( 'p' );
        const link = document.createElement( 'a' );
        link.setAttribute("target", "_self")
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

    function getPhotographerData() {
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
        photographData.appendChild(extraBox);
        const p = document.createElement( "p" );
        p.classList.add("price");
        p.textContent = `${price}€ / jour`;
        extraBox.appendChild(p);
        return (photographData);
    }
}