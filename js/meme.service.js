'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'cat'] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            font: 'impact',
            color: 'red',
            pos: {
                x: 225,
                y: 50,
                width: 0,
                height: 0
            }
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

/// Line Update ///

function setLineTxt(text) {
    if (!gMeme.selectedLineIdx) return
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

function addLine(pos) {
    const newLine = _createNewLine(pos)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function saveLineDimensions(lineIdx, width, height) {
    gMeme.lines[lineIdx].pos.width = width
    gMeme.lines[lineIdx].pos.height = height
}

function isLineClicked(ev) {
    const { offsetX, offsetY } = ev
    const { pos } = gMeme.lines

    const clickedLine = gMeme.lines.find(line => {
        const { pos } = line
        return offsetX >= pos.x - pos.width / 2 &&
            offsetX <= pos.x - pos.width / 2 + pos.width &&
            offsetY >= pos.y - pos.height / 2 &&
            offsetY <= pos.y - pos.height / 2 + pos.height
    })
    return clickedLine
}

function editLine(clickedLine) {
    const lineIdx = gMeme.lines.findIndex(line => line === clickedLine)
    gMeme.selectedLineIdx = lineIdx
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function alignText(dir) {
    if (align === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x = 50
    else if (align === 'center') gMeme.lines[gMeme.selectedLineIdx].pos.x = 225
    else if (align === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x = 400
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLine()
}

function _createNewLine(pos) {
    return {
        txt: 'Enter text',
        size: 20,
        font: 'impact',
        color: 'blue',
        pos,
    }
}