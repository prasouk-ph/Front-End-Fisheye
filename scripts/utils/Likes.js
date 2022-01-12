function addLike(event) {
    const sumLikes = document.querySelector(".total-likes");
    let currentLikesCount = event.target.getAttribute("count");
    let newCount = parseInt(currentLikesCount) + 1;
    totalLikesCount ++;
    event.target.setAttribute("count", newCount);
    event.target.textContent = newCount;
    sumLikes.setAttribute("count", totalLikesCount);
    sumLikes.textContent = totalLikesCount;
}

function addLikeWithKeyboard(event) {
    if (event.key == "Enter") {
        addLike(event);
    }
}