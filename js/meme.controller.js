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

function renderLine(memeLines) {
    memeLines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.color

        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    })
    let selectedLine = getSelectedLine()
    markSelectedLine(selectedLine, selectedLine.pos.x, selectedLine.pos.y)
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

let y = 50
function onAddLine() {
    y += 50
    if (y > 400) y = 50
    const pos = {
        x: gCanvas.width / 2,
        y,
    }
    addLine(pos)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function markSelectedLine(line) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.textAlign = 'center'

    var lineHeight = line.size * 1.4;
    var textWidth = gCtx.measureText(line.txt).width * 1.1
    gCtx.strokeRect(line.pos.x - textWidth / 2, line.pos.y - lineHeight / 2, textWidth, lineHeight)
    gCtx.closePath()
}