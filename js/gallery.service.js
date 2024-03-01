'use strict'

let gImgIdx = 1
let gImgs
let gKeywordSearchCountMap = { 'cute': 9, 'cat': 12, 'baby': 5, 'dog': 7, 'politic': 4}

function getImgs() {
    if (!gFilter) return gImgs
    return _filterImgs(gFilter)
}

function _filterImgs() {
    const searchedKeyword = gFilter.toLowerCase()
    updateKeywordCount(searchedKeyword)
    return gImgs.filter(img => img.keywords.includes(searchedKeyword))
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img
}

function addImg(imgSrc) {
    const newImg = _createImg(imgSrc)
    gImgs.unshift(newImg)
}

/// KEYWORD SEARCH STATISTICS ///

function updateKeywordCount(searchedKeyword) {
    const keywords = Object.keys(gKeywordSearchCountMap)
    if (keywords.find(keyword => keyword === searchedKeyword)) {
        gKeywordSearchCountMap[searchedKeyword]++
    }
    else gKeywordSearchCountMap[searchedKeyword] = 1
}

function getPopularKeywords(num) {
    const keywords = Object.keys(gKeywordSearchCountMap)
    keywords.sort((keyword1, keyword2) => gKeywordSearchCountMap[keyword2] - gKeywordSearchCountMap[keyword1])
    return keywords.slice(0, num)
}

function getKeywordsMap() {
    return gKeywordSearchCountMap
}

function getTotalSearches(num) {
    const nums = Object.values(gKeywordSearchCountMap)
    const numOfSearches = nums.slice(0, num)
    return numOfSearches.reduce((acc, num) => acc + num, 0)
}

/// CREATE IMAGES ///

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
    gImgs[3].keywords = ['cute', 'cat']
}