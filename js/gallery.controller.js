'use strict'

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.image-gallery')
    const strHTMLs = imgs.map(img => {
        return `<img id=${img.id} onclick="onImgSelect(${img.id})" src=${img.url} alt="">`

    })
    elGallery.innerHTML = strHTMLs.join('')
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