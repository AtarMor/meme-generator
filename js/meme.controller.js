'use strict'

let gCanvas
let gCtx

function renderMeme(x,y) {
    const meme = getMeme()
    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url
   
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    const memeTxt = gMeme.lines[gMeme.selectedLineIdx].txt
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = 'black'

    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(memeTxt, x = gCanvas.width / 2, y=50)
    gCtx.strokeText(memeTxt, x = gCanvas.width / 2, y=50)
}

function onDrawText(text) {
    setLineTxt(text)
    renderMeme()
}