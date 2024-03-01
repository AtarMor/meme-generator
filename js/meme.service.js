'use strict'

const MEMES_DB = 'memesDb'
const gSavedMemes = []

let gMeme

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function addMeme(imgId) {
    gMeme = _createMeme(imgId)
}

/// Line Update ///

function editLineTxt(text) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setColor(txtColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = txtColor
}

function increaseTxtSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}

function decreaseTxtSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function addLine(txt) {
    const newLine = _createLine(txt)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (!gMeme.lines.length) return ''
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getSelectedLine() {
    if (!gMeme.selectedLineIdx) return
    return gMeme.lines[gMeme.selectedLineIdx]
}

function saveTxtDimensions(txt, txtWidth, txtHeight) {
    txt.pos.width = txtWidth
    txt.pos.height = txtHeight
}

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
    if(!clickedLine) return
    const lineIdx = _getLineIdx(clickedLine)
	gMeme.lines[lineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
	gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
	gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function updateSelectedLineIdx(clickedLine) {
    const lineIdx = _getLineIdx(clickedLine)
    gMeme.selectedLineIdx = lineIdx
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function _getLineIdx(clickedLine) {
    return gMeme.lines.findIndex(line => line === clickedLine)
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function alignText(dir) {
    if (dir === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x = 50
    else if (dir === 'center') gMeme.lines[gMeme.selectedLineIdx].pos.x = 175
    else if (dir === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x = 300
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (!gMeme.lines.length) gMeme.selectedLineIdx = null
}

function generateMeme() {
    gMeme = {
        selectedImgId: getRandomInt(1, gImgs.length + 1),
        selectedLineIdx: 0,
        lines: [_createLine(makeRandLine())]
    }
}

function saveMeme() {
    gSavedMemes.push(structuredClone(gMeme))
    saveToStorage(MEMES_DB, gSavedMemes)
}

function getSavedMemes() {
    return loadFromStorage(MEMES_DB)
}

function _createMeme(selectedImgId) {
    return {
        selectedImgId,
        selectedLineIdx: 0,
        lines: [_createLine()]
    }
}

function _createLine(txt='Enter text') {
    return {
        txt,
        size: 30,
        font: 'impact',
        color: 'red',
        pos: {
            x: 175,
            y: 50,
            width: 0,
            height: 0
        },
        isDrag: false,
    }
}