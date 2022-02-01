/* eslint-disable no-unused-vars */
class Photographer {
    constructor(data, type) {
        this._name = data.name;
        this._portrait = `assets/photographers/${data.portrait}`;
        this._city = data.city;
        this._country = data.country;
        this._slogan = data.tagline;
        this._price = data.price;
        this._id = data.id;
        this._alt = data.alt;
    

        if (type === "thumbnail") {
            return new PhotographerCard(data);
        }
    
        if (type === "full") {
            return new PhotographerFullPage(data);
        }        
    }


    getPhotographerCard() {
        const article = document.createElement( 'article' );

        const headerCard = document.createElement( 'div' );
        headerCard.classList.add("card-header")
        const img = document.createElement( 'img' );
        img.setAttribute("src", this._portrait);
        img.setAttribute("alt", this._alt);

        const cardContent = document.createElement( 'div' );
        cardContent.classList.add("card-content")
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const slogan = document.createElement( 'p' );
        slogan.classList.add("slogan");
        const priceContainer = document.createElement( 'p' );
        const link = document.createElement( 'a' );
        link.setAttribute("target", "_self")
        h2.textContent = this._name;
        h3.textContent = `${this._city}, ${this._country}`;
        slogan.textContent = this._tagline;
        priceContainer.textContent = `${this._price}€/jour`;
        link.href = `photographer.html?id=${this._id}`;

        article.append(headerCard, cardContent);
        headerCard.appendChild(link);
        link.append(img, h2);
        cardContent.append(h3, slogan, priceContainer);
        return (article);
    }

    
    getPhotographerInfo() {
        const photographerInfo = document.createElement( "div" );
        photographerInfo.classList.add("photograph-data");

        const h2 = document.createElement( "h2" );
        h2.textContent = this._name;

        const modalLabel = document.querySelector(".modal_label");
        modalLabel.innerHTML = `Contactez-moi <br>${this._name}`;

        const h3 = document.createElement( "h3" );
        h3.textContent = `${this._city}, ${this._country}`;

        const slogan = document.createElement( "p" );
        slogan.textContent = this._tagline;
        
        const extraBox = document.createElement( "div" );
        extraBox.classList.add("photographer-extras");

        const p = document.createElement( "p" );
        p.classList.add("price");
        p.textContent = `${this._price}€ / jour`;

        photographerInfo.append(h2, h3, slogan, extraBox);
        extraBox.appendChild(p);
        return (photographerInfo);
    }

    
    getPhotographerPicture() {
        const img = document.createElement( "img" );
        img.setAttribute("src", this._portrait);
        img.setAttribute("alt", this._alt);
        img.classList.add("photograph-portrait")
        return (img);
    }
}


class PhotographerCard {
    constructor(data) {
        this._name = data.name;
        this._portrait = `assets/photographers/${data.portrait}`;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._id = data.id;
        this._alt = data.alt;
    }

    
    getCard() {
        const card = document.createElement( 'article' );

        const headerCard = document.createElement( 'div' );
        headerCard.classList.add("card-header")
        const img = document.createElement( 'img' );
        img.setAttribute("src", this._portrait);
        img.setAttribute("alt", this._alt);

        const cardContent = document.createElement( 'div' );
        cardContent.classList.add("card-content")

        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const slogan = document.createElement( 'p' );
        
        slogan.classList.add("slogan");
        const priceContainer = document.createElement( 'p' );
        const link = document.createElement( 'a' );
        link.setAttribute("target", "_self")
        
        h2.textContent = this._name;
        h3.textContent = `${this._city}, ${this._country}`;
        slogan.textContent = this._tagline;
        priceContainer.textContent = `${this._price}€/jour`;
        link.href = `photographer.html?id=${this._id}`;

        card.append(headerCard, cardContent);
        headerCard.appendChild(link);
        link.append(img, h2);
        cardContent.append(h3, slogan, priceContainer);
        return (card);
    }
}


class PhotographerFullPage {
    constructor(data) {
        this._name = data.name;
        this._portrait = `assets/photographers/${data.portrait}`;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._id = data.id;
        this._alt = data.alt;
    }

    
    getPhotographerInfo() {
        const photographerInfo = document.createElement( "div" );
        photographerInfo.classList.add("photograph-data");

        const h2 = document.createElement( "h2" );
        h2.textContent = this._name;

        const modalLabel = document.querySelector(".modal_label");
        modalLabel.innerHTML = `Contactez-moi <br>${this._name}`;
        
        const h3 = document.createElement( "h3" );
        h3.textContent = `${this._city}, ${this._country}`;
        
        const slogan = document.createElement( "p" );
        slogan.textContent = this._tagline;
        
        const extraBox = document.createElement( "div" );
        extraBox.classList.add("photographer-extras");
        
        const p = document.createElement( "p" );
        p.classList.add("price");
        p.textContent = `${this._price}€ / jour`;

        photographerInfo.append(h2, h3, slogan, extraBox);
        extraBox.appendChild(p);
        return (photographerInfo);
    }

    
    getPhotographerPicture() {
        const img = document.createElement( "img" );
        img.setAttribute("src", this._portrait);
        img.setAttribute("alt", this._alt);
        img.classList.add("photograph-portrait")
        return (img);
    }
}