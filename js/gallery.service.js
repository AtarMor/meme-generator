'use strict'

let gImgIdx = 1

let gImgs = _createImgs(18)
_addImgKeyWords()


function getImgs() {
    if (!gFilter) return gImgs
    return _filterImgs(gFilter)
}

function _filterImgs() {
    const searchedKeyword = gFilter.toLowerCase()
    return gImgs.filter(img => img.keywords.includes(searchedKeyword));
}

function _createImgs(count) {
    const imgs = []
    for (let i = 0; i < count; i++) {
        imgs.push(
            _createImg(`img/${i + 1}.jpg`)
        )
    }
    return imgs
}

function _createImg(url) {
    return {
        id: gImgIdx++,
        url,
        keywords: []
    }
}

function _addImgKeyWords() {
    gImgs[0].keywords = ['politic']
    gImgs[1].keywords = ['cute', 'dog']
    gImgs[2].keywords = ['cute', 'dog', 'baby']
    gImgs[2].keywords = ['cute', 'cat']
}

function _addImgKeyWord(idx, keyword) {
    gImgs[idx].keywords.push(keyword)
}
