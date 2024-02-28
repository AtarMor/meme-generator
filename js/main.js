'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('hidden')
    renderGallery()
    renderMeme()
}

function goGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('hidden')

    const elFilter = document.querySelector('.filter')
    const elGallery = document.querySelector('.image-gallery')
    elFilter.classList.remove('hidden')
    elGallery.classList.remove('hidden')
}