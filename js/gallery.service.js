'use strict'

let gImgIdx = 1

let gImgs = _createImgs(18)

function getImgs() {
    return gImgs
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
