'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')
    elGallery.innerHTML = `
    <img onclick="onImgSelect(src)" src="img/1.jpg" alt="">
            <img onclick="onImgSelect(src)" src="img/2.jpg" alt="">
            <img src="img/3.jpg" alt="">
            <img src="img/4.jpg" alt="">
            <img src="img/5.jpg" alt="">
            <img src="img/6.jpg" alt="">
            <img src="img/7.jpg" alt="">
            <img src="img/8.jpg" alt="">
            <img src="img/9.jpg" alt="">
    ` 
}

function onImgSelect(imgSrc) {
    setImg(imgSrc)
    renderMeme() 
}
