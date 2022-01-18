/* eslint-disable no-unused-vars */
async function getData() {
    // import data from json
    const response = await fetch("data/photographers.json"); 
    // convert json to js object
    const result = await response.json();
    return ({
        photographers: [...result.photographers], // .photographers allow to select every data from key photographers from json file
        media: [...result.media] // .media allow to select every data from key media from json file
    })
}