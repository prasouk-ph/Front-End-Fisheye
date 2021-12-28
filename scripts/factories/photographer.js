function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const slogan = document.createElement( 'p' );
        const priceContainer = document.createElement( 'p' );
        const link = document.createElement( 'a' );
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        slogan.textContent = tagline;
        priceContainer.textContent = `${price}€/jour`;
        link.href = "photographer.html";
        link.textContent = "link"
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(slogan);
        article.appendChild(priceContainer);
        article.appendChild(link);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}