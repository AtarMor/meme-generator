'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}