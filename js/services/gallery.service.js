'use strict'

const IMGS_DB = 'imgsDb'
const KEYWORDS_DB = 'keywordDb'

let gImgIdx = 1
const gImgs = loadFromStorage(IMGS_DB) || _createImgs(18)

let gKeywordSearchCountMap = loadFromStorage(KEYWORDS_DB) || { 'cute': 9, 'cat': 12, 'baby': 5, 'dog': 7, 'political': 4}

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
    saveToStorage(IMGS_DB, gImgs)
}

/// KEYWORD SEARCH STATISTICS ///

function updateKeywordCount(searchedKeyword) {
    const keywords = Object.keys(gKeywordSearchCountMap)
    if (keywords.find(keyword => keyword === searchedKeyword)) {
        gKeywordSearchCountMap[searchedKeyword]++
    }
    else gKeywordSearchCountMap[searchedKeyword] = 1
    saveToStorage(KEYWORDS_DB, gKeywordSearchCountMap)
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
    _addImgKeyWords(imgs)
    return imgs
}

function _createImg(url) {
    return {
        id: gImgIdx++,
        url,
        keywords: []
    }
}

function _addImgKeyWords(imgs) {
    imgs[0].keywords = ['political']
    imgs[1].keywords = ['cute', 'dog']
    imgs[2].keywords = ['cute', 'dog', 'baby']
    imgs[3].keywords = ['cute', 'cat']
    imgs[4].keywords = ['cute', 'baby']
    imgs[5].keywords = ['funny']
    imgs[6].keywords = ['funny', 'baby']
}