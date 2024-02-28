'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('hidden')
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

	gCanvas.width = elContainer.clientWidth
	gCanvas.height = elContainer.clientHeight
    renderMeme()
}