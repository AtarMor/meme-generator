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

function renderPopularKeywords() {
    const keywordsMap = getKeywordsMap()
    const totalSearches = getTotalSearches(5)
    const keywordsToDisplay = getPopularKeywords(5)
    const elKeywords = document.querySelector('.search-by-keywords')
    const strHTMLs = keywordsToDisplay.map(keyword => {
        return `<div style="font-size:${keywordsMap[keyword] / totalSearches * 100}px" onclick="onKeywordClick('${keyword}')">${keyword}</div>`
    })
    elKeywords.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    addMeme(+imgId)
    renderMeme()
    showMemeEditor()
}

function showMemeEditor() {
    const elGallery = document.querySelector('.gallery-display')
    const elSavedMemes = document.querySelector('.saved-memes')
    const elMemeEditor = document.querySelector('.meme-editor')

    elGallery.classList.add('hidden')
    elSavedMemes.classList.add('hidden')
    elMemeEditor.classList.remove('hidden')
    document.body.classList.remove('menu-open')
}

/// FILTERING ///

function onKeywordClick(keyword) {
    document.querySelector('.search-img').value = keyword
    onSetFilter(keyword)
    renderPopularKeywords()
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

/// UPLOAD USER IMAGE ///

function onImgInput(ev) {
    loadImageFromInput(ev, addToImgs)
}

function loadImageFromInput(ev, addToImgs) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => addToImgs(img.src)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addToImgs(imgSrc) {
    addImg(imgSrc)
    renderGallery()
}