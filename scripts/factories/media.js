/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function mediaCardFactory(media, photographerName, index) {
    const { image, likes, title, video, alt } = media;

    const picture = `assets/media/${photographerName}/${image}`;
    const preview = `assets/media/${photographerName}/${video}`;
    const totalLikes = document.querySelector(".total-likes");
    
    // to create a new media card
    const card = document.createElement( "article" );
    card.classList.add("card");
    return { getMediaCard }


    function getMediaCard() {
        createMedia();
        createCardContent();
        return (card)
    }


    function createMedia() {
        if (Object.prototype.hasOwnProperty.call(media, "image")) { // if (media has key "image") is true
            const img = document.createElement( "img" );
            img.setAttribute("src", picture);
            img.setAttribute("title", title);
            // eslint-disable-next-line no-undef
            img.setAttribute("index", index);
            img.setAttribute("alt", alt);
            img.tabIndex = 0;
            img.classList.add("media");
            img.addEventListener("click", openLightbox);
            img.addEventListener("keydown", openLightboxWithKeyboard);

            allMedia.push(img) // for modal focus
            card.appendChild(img);
            return (img);
        }

        if (Object.prototype.hasOwnProperty.call(media, "video")) { // when (media has key "video") is true
            // eslint-disable-next-line no-case-declarations
            const cardVideo = document.createElement( "video" );
            // eslint-disable-next-line no-case-declarations
            const sourceVideo = document.createElement( "source" );
            sourceVideo.setAttribute("src", preview);
            sourceVideo.setAttribute("type", "video/mp4");
            sourceVideo.setAttribute("title", title);
            sourceVideo.classList.add("media");

            cardVideo.setAttribute("index", index); // should be on cardVideo and not sourceVideo
            cardVideo.tabIndex = 0;
            cardVideo.appendChild(sourceVideo);
            cardVideo.addEventListener("click", openLightbox);
            cardVideo.addEventListener("keydown", openLightboxWithKeyboard);

            allMedia.push(cardVideo) // for modal focus
            card.appendChild(cardVideo);
            return (cardVideo);
        }
    }


    function createCardContent() {
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        
        const h2 = document.createElement( "h2" );
        h2.textContent = title;

        const mediaLikes = document.createElement( "p" );
        mediaLikes.classList.add("likes");
        mediaLikes.setAttribute("count", likes);
        mediaLikes.tabIndex = 0;
        mediaLikes.textContent = likes;
        likesCount.push(mediaLikes); // for modal focus
        mediaLikes.addEventListener("click", addLike);
        mediaLikes.addEventListener("keydown", addLikeWithKeyboard);

        totalLikesCount += (parseInt(mediaLikes.getAttribute("count")));
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;

        card.appendChild(cardContent);
        cardContent.append(h2, mediaLikes);
        return (cardContent);
    }

    
    // like function
    function addLike(event) {
        let currentLikesCount = event.target.getAttribute("count");
        let newCount = parseInt(currentLikesCount) + 1;
        totalLikesCount ++;
        event.target.setAttribute("count", newCount);
        event.target.textContent = newCount;
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;
    }
    

    function addLikeWithKeyboard(event) {
        if (event.key == "Enter") {
            addLike(event);
        }
    }
}

class MediaFactory {
    constructor(data, photographerName, index) {
        if (Object.prototype.hasOwnProperty.call(data, "image")) {
            return new ImageMedia(data, photographerName, index);
        } else if (Object.prototype.hasOwnProperty.call(data, "video")) {
            return new VideoMedia(data, photographerName, index);
        } else {
            throw "Unknown format";
        }
    }
}

class ImageMedia {
    constructor(data, photographerName, index) {
        this._image = data.image;
        this._likes = data.likes;
        this._title = data.title;
        this._alt = data.alt;
        this._photographerName = photographerName;
        this._index = index;
    }

    getMedia() {
        const img = document.createElement( "img" );
        img.setAttribute("src", `assets/media/${this._photographerName}/${this._image}`);
        img.setAttribute("title", this._title);
        // eslint-disable-next-line no-undef
        img.setAttribute("index", this._index);
        img.setAttribute("alt", this._alt);
        img.tabIndex = 0;
        img.classList.add("media");
        img.addEventListener("click", openLightbox);
        img.addEventListener("keydown", openLightboxWithKeyboard);

        allMedia.push(img) // for modal focus
        return (img);
    }

    getContent() {
        const totalLikes = document.querySelector(".total-likes");
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        
        const h2 = document.createElement( "h2" );
        h2.textContent = this._title;

        const mediaLikes = document.createElement( "p" );
        mediaLikes.classList.add("likes");
        mediaLikes.setAttribute("count", this._likes);
        mediaLikes.tabIndex = 0;
        mediaLikes.textContent = this._likes;

        likesCount.push(mediaLikes); // for modal focus
        
        mediaLikes.addEventListener("click", addLike);
        mediaLikes.addEventListener("keydown", addLikeWithKeyboard);

        totalLikesCount += (parseInt(mediaLikes.getAttribute("count")));
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;

        cardContent.append(h2, mediaLikes);
        return (cardContent);
    }

    getMediaCard() {
        const card = document.createElement( "article" );
        card.classList.add("card");

        const media = this.getMedia();
        const content = this.getContent();
    
        card.append(media, content);
        return (card);
    }
}



class VideoMedia {
    constructor(data, photographerName, index) {
        this._video = data.video;
        this._likes = data.likes;
        this._title = data.title;
        this._alt = data.alt;
        this._photographerName = photographerName;
        this._index = index;
    }

    getMedia() {
        const video = document.createElement( "video" );
        // eslint-disable-next-line no-case-declarations
        const sourceVideo = document.createElement( "source" );
        sourceVideo.setAttribute("src", `assets/media/${this._photographerName}/${this._video}`);
        sourceVideo.setAttribute("type", "video/mp4");
        sourceVideo.setAttribute("title", this._title);
        sourceVideo.classList.add("media");

        video.setAttribute("index", this._index); // should be on cardVideo and not sourceVideo
        video.tabIndex = 0;
        video.appendChild(sourceVideo);
        video.addEventListener("click", openLightbox);
        video.addEventListener("keydown", openLightboxWithKeyboard);

        allMedia.push(video) // for modal focus
        return (video);
    }

    getContent() {
        const totalLikes = document.querySelector(".total-likes");
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        
        const h2 = document.createElement( "h2" );
        h2.textContent = this._title;

        const mediaLikes = document.createElement( "p" );
        mediaLikes.classList.add("likes");
        mediaLikes.setAttribute("count", this._likes);
        mediaLikes.tabIndex = 0;
        mediaLikes.textContent = this._likes;
        likesCount.push(mediaLikes); // for modal focus
        mediaLikes.addEventListener("click", addLike);
        mediaLikes.addEventListener("keydown", addLikeWithKeyboard);

        totalLikesCount += (parseInt(mediaLikes.getAttribute("count")));
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;

        cardContent.append(h2, mediaLikes);
        return (cardContent);
    }

    getMediaCard() {
        const card = document.createElement( "article" );
        card.classList.add("card");

        const media = this.getMedia();
        const content = this.getContent();
    
        card.append(media, content);
        return (card);
    }
}