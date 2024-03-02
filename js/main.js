'use strict'

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gImgs = _createImgs(18)
    _addImgKeyWords()

    showGallery()
    renderGallery()
    renderPopularKeywords()

    addListeners()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    webAPIShare()
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

function showGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elSavedMemes = document.querySelector('.saved-memes')
    const elGallery = document.querySelector('.gallery-display')
    
    elMemeEditor.classList.add('hidden')
    elSavedMemes.classList.add('hidden')
    elGallery.classList.remove('hidden')

    // const elFilter = document.querySelector('.filter')
    // elFilter.classList.remove('hidden')
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
    generateRandMeme()
    renderMeme()
    showMemeEditor()
}