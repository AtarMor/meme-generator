'use strict'

function renderMeme() {
    const meme = getMeme()

    renderImg(meme)
    renderLine(meme.lines)
}

function renderImg(meme) {
    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url

    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderLine(memeLines, x = gCanvas.width / 2, y = 0) {
    memeLines.forEach(line => {
        y += 50
        if (y > 400) y = 50

        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.color

        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = 'center'
        // gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, x, y)
        gCtx.strokeText(line.txt, x, y)
    })
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

function onAddLine() {
    addLine()
    renderMeme()
}