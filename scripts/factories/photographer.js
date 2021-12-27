function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const description = document.createElement( 'p' );
        const priceContainer = document.createElement( 'p' );
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        description.textContent = tagline;
        priceContainer.textContent = price;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(description);
        article.appendChild(priceContainer);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}