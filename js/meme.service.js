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
            color: 'red'
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

function addLine() {
    const newLine = _createNewLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function _createNewLine() {
    return {
        txt: 'Enter text',
        size: 20,
        color: 'blue'
    }
}