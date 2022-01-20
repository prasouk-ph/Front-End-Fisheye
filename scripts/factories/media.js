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
        switch (true) { 
            case (Object.prototype.hasOwnProperty.call(media, "image")): // when (media has key "image") is true
            // eslint-disable-next-line no-case-declarations
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
            // break;
            case (Object.prototype.hasOwnProperty.call(media, "video")): // when (data has key "video") is true
            // eslint-disable-next-line no-case-declarations
            const cardVideo = document.createElement( "video" );
            // cardVideo.setAttribute("controls", "controls"); // without controls can"t be played
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
            // break;
        }
    }


    function createCardContent() {
        const cardContent = document.createElement( "div" );
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);
        const h2 = document.createElement( "h2" );
        h2.textContent = title;
        cardContent.appendChild(h2);
        const mediaLikes = document.createElement( "p" );
        mediaLikes.classList.add("likes");
        mediaLikes.setAttribute("count", likes);
        mediaLikes.tabIndex = 0;
        mediaLikes.textContent = likes;
        likesCount.push(mediaLikes); // for modal focus
        totalLikesCount += (parseInt(mediaLikes.getAttribute("count")));
        totalLikes.setAttribute("count", totalLikesCount);
        totalLikes.textContent = totalLikesCount;
        cardContent.appendChild(mediaLikes);
        mediaLikes.addEventListener("click", addLike);
        mediaLikes.addEventListener("keydown", addLikeWithKeyboard);
        return (cardContent);
    }

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