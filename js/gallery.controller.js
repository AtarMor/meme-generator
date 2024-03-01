'use strict'

let gFilter = null

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.image-gallery')
    const strHTMLs = imgs.map(img => {
        return `<img id=${img.id} onclick="onImgSelect(${img.id})" src=${img.url} alt="">`
    })
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    addMeme(+imgId)
    renderMeme()
    const elFilter = document.querySelector('.filter')
    const elGallery = document.querySelector('.image-gallery')
    const elSavedMemes = document.querySelector('.saved-memes')
    const elMemeEditor = document.querySelector('.meme-editor')
    
    elFilter.classList.add('hidden')
    elGallery.classList.add('hidden')
    elSavedMemes.classList.add('hidden')
    elMemeEditor.classList.remove('hidden')
}

function onSetFilter(keyword) {
    gFilter = keyword
    renderGallery()
}

function onClearFilter() {
    gFilter = null
    document.querySelector('.search-img').value = ''
    renderGallery()
}