function sortByTitle(array) {
    array.sort(function(x, y) {
        if (x.title < y.title) return -1;
        if (x.title > y.title) return 1;
        return 0;
    });
}


function sortByDate(array) {
    array.sort(function(x, y) {
        if (x.date < y.date) return -1;
        if (x.date > y.date) return 1;
        return 0;
    });
}


function sortByPopularity(array) {
    array.sort(function(x, y) {
        if (x.likes < y.likes) return -1;
        if (x.likes > y.likes) return 1;
        return 0;
    });
}


function sortMedia() {
    const cardContainer = document.querySelector(".card-container");
    const extraBox = document.querySelector(".photographer-extras");
    const totalLikes = document.querySelector(".total-likes");
    
    if (document.body.contains(cardContainer)) {
        gallery.removeChild(cardContainer);
        extraBox.removeChild(totalLikes);
        allMedia.length = 0; // empty allMedia array
        mediaVideos.length = 0;
    }

    switch (true) {
        case (sortValue.textContent == "Titre"):
            sortByTitle(photographer.medias);
            break
        case (sortValue.textContent == "Date"):
            sortByDate(photographer.medias);
            break
        case (sortValue.textContent == "Popularité"):
            sortByPopularity(photographer.medias);
            break
    }
    displayPhotographerMedias(photographer.medias, photographer.data[0].name);
}