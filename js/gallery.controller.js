'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')
    elGallery.innerHTML = `
    <img id=1 onclick="onImgSelect(id)" src="img/1.jpg" alt="">
            <img id=2 onclick="onImgSelect(id)" src="img/2.jpg" alt="">
            <img src="img/3.jpg" alt="">
            <img src="img/4.jpg" alt="">
            <img src="img/5.jpg" alt="">
            <img src="img/6.jpg" alt="">
            <img src="img/7.jpg" alt="">
            <img src="img/8.jpg" alt="">
            <img src="img/9.jpg" alt="">
    ` 
}

function onImgSelect(imgId) {
    setImg(+imgId)
    renderMeme()
    const elFilter = document.querySelector('.filter')
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    
    elFilter.classList.add('hidden')
    elGallery.classList.add('hidden')
    elMemeEditor.classList.remove('hidden')
}
