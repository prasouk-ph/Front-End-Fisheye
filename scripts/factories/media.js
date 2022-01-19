/* eslint-disable no-unused-vars */
function mediaFactory(data) {
    const { name, portrait, city, country, tagline, price, id, alt } = data;

    const picture = `assets/photographers/${portrait}`;

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
    return { name, picture, getUserCardDOM }
}