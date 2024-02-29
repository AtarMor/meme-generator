'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    const elMemeEditor = document.querySelector('.meme-editor')
    const elSavedMemes = document.querySelector('.saved-memes')
    elMemeEditor.classList.add('hidden')
    elSavedMemes.classList.add('hidden')
    renderGallery()
    resizeCanvas()
	window.addEventListener('resize', resizeCanvas)
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

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')

    if (!elContainer.clientWidth && !elContainer.clientHeight) return
	gCanvas.width = elContainer.clientWidth
	gCanvas.height = elContainer.clientHeight
    renderMeme()
}

function onGenerateMeme() {
    generateMeme()
    renderMeme()
    const elFilter = document.querySelector('.filter')
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    
    elFilter.classList.add('hidden')
    elGallery.classList.add('hidden')
    elMemeEditor.classList.remove('hidden')
}