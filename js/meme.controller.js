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

/// Download ///

function onDownloadMeme(elLink) {
    const memeContent = gCanvas.toDataURL('image/jpeg')
	elLink.href = memeContent
}

/// Line Operators ///

function onDrawText(text) {
    setLineTxt(text)
    renderMeme()
}

function onSetTxtColor(txtColor) {
    setColor(txtColor)
    renderMeme()
}

function onIncreaseTxtSize() {
    increaseTxtSize()
    renderMeme()
}

function onDecreaseTxtSize() {
    decreaseTxtSize()
    renderMeme()
}