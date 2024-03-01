'use strict'

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const elMemeEditor = document.querySelector('.meme-editor')
    const elSavedMemes = document.querySelector('.saved-memes')
    elMemeEditor.classList.add('hidden')
    elSavedMemes.classList.add('hidden')
    addListeners()

    renderGallery()
    resizeCanvas()
	window.addEventListener('resize', resizeCanvas)
    // renderMeme()
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mousemove', onMove)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchend', onUp)
}

function goGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elSavedMemes = document.querySelector('.saved-memes')
    elMemeEditor.classList.add('hidden')
    elSavedMemes.classList.add('hidden')

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
	gElCanvas.width = elContainer.clientWidth
	gElCanvas.height = elContainer.clientWidth
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