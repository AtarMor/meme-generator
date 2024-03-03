'use strict'

const MEMES_DB = 'memesDb'
let gSavedMemes = loadFromStorage(MEMES_DB) || []

let gMeme
let gLinePosY = 0

function getMeme() {
    return gMeme
}

function addMeme(imgId) {
    gMeme = _createMeme(imgId)
}

/// TEXT EDIT ///

function editLineTxt(text) {
    const selectedLine = getSelectedLine()
    if (selectedLine) selectedLine.txt = text
}

function setColor(txtColor) {
    const selectedLine = getSelectedLine()
    if (selectedLine) selectedLine.color = txtColor
}

function getLineColor() {
    const selectedLine = getSelectedLine()
    return selectedLine.color
}

function increaseTxtSize() {
    const selectedLine = getSelectedLine()
    if (selectedLine && selectedLine.size < 100) selectedLine.size++
}

function decreaseTxtSize() {
    const selectedLine = getSelectedLine()
    if (selectedLine && selectedLine.size > 10) selectedLine.size--
}

function setFontFamily(font) {
    const selectedLine = getSelectedLine()
    if (selectedLine) selectedLine.font = font
}

function alignText(dir) {
    if (gMeme.selectedLineIdx === null) return
    if (dir === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x = 70
    else if (dir === 'center') gMeme.lines[gMeme.selectedLineIdx].pos.x = 175
    else if (dir === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - 70
}

function getSelectedLine() {
    if (!gMeme || gMeme.selectedLineIdx === null) return
    return gMeme.lines[gMeme.selectedLineIdx]
}

/// ADD & DELETE LINE ///

function addLine(txt) {
    const newLine = _createLine(txt)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (!gMeme.lines.length) gMeme.selectedLineIdx = null
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

/// SWITCH LINE ///

function switchLine() {
    if (!gMeme.lines.length) return ''
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function clearLineSelection() {
    gMeme.selectedLineIdx = null
}

function saveTxtDimensions(txt, txtWidth, txtHeight) {
    txt.pos.width = txtWidth
    txt.pos.height = txtHeight
}

/// DRAGGING LINES ///

function isLineClicked(ev) {
    const clickPos = getEvPos(ev)
    const { pos } = gMeme.lines

    const clickedLine = gMeme.lines.find(line => {
        const { pos } = line
        return clickPos.x >= pos.x - pos.width / 2 &&
            clickPos.x <= pos.x - pos.width / 2 + pos.width &&
            clickPos.y >= pos.y - pos.height / 2 &&
            clickPos.y <= pos.y - pos.height / 2 + pos.height
    })
    return clickedLine
}

function setLineDrag(clickedLine, isDrag) {
    if (!clickedLine) return
    const lineIdx = _getLineIdx(clickedLine)
    gMeme.lines[lineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function updateSelectedLineIdx(clickedLine) {
    if (!clickedLine) return
    const lineIdx = _getLineIdx(clickedLine)
    gMeme.selectedLineIdx = lineIdx
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function _getLineIdx(clickedLine) {
    return gMeme.lines.findIndex(line => line === clickedLine)
}

/// SAVE & EDIT SAVED MEMES ///

function saveMeme() {
    gSavedMemes.push(structuredClone(gMeme))
    saveToStorage(MEMES_DB, gSavedMemes)
}

function getSavedMemes() {
    return loadFromStorage(MEMES_DB)
}

function setSavedMeme(meme) {
    gMeme = meme
}

/// CREATE MEME ///

function generateRandMeme() {
    gLinePosY = 0
    gMeme = {
        selectedImgId: getRandomInt(1, gImgs.length + 1),
        selectedLineIdx: 0,
        lines: [_createLine(makeRandLine())]
    }
}

function _createMeme(selectedImgId) {
    gLinePosY = 0
    return {
        selectedImgId,
        selectedLineIdx: 0,
        lines: [_createLine()]
    }
}

function _createLine(txt = 'Enter text') {
    gLinePosY += 50
    if (gLinePosY > gElCanvas.height-20) gLinePosY = 50
    return {
        txt,
        size: 30,
        font: 'impact',
        color: 'white',
        pos: {
            x: 175,
            y: gLinePosY,
            width: 0,
            height: 0
        },
        isDrag: false,
    }
}