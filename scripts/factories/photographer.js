function photographerFactory(data) {
    const { name, portrait, city } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h3 = document.createElement( 'h3' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h3.textContent = city;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}