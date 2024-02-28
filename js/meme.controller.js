'use strict'

let gCanvas
let gCtx

function renderMeme(x,y) {
    const meme = getMeme()
    const memeLine = meme.lines[meme.selectedLineIdx]
    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url
   
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    const memeTxt = memeLine.txt
    const txtSize = memeLine.size
    const txtColor = memeLine.color

    gCtx.fillStyle = txtColor
    gCtx.lineWidth = 1
    // gCtx.strokeStyle = 'white'

    gCtx.font = `${txtSize}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(memeTxt, x = gCanvas.width / 2, y=50)
    gCtx.strokeText(memeTxt, x = gCanvas.width / 2, y=50)
}

function onDrawText(text) {
    setLineTxt(text)
    renderMeme()
}