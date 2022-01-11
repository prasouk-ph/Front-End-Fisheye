async function getPhotographers() {
    // import data from json
    const response = await fetch("data/photographers.json"); 
    // convert json to js object
    const result = await response.json();
    return ({
        photographers: [...result.photographers] // .photographers allow to select every data from key photographers from json file
    }) 
}


async function getMedia() {
    const response = await fetch("data/photographers.json"); // import data from json
    const result = await response.json(); // convert json to js object
    return ({
        media: [...result.media] // .media allow to select every data from key media from json file
    }) 
}