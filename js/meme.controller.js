'use strict'

function renderMeme() {
    const meme = getMeme()

    renderImg(meme)
    renderLine(meme.lines)
}

function renderImg(meme) {
    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url

    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderLine(memeLines) {
    if (!memeLines || !memeLines.length) return
    memeLines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)

        const lineWidth = gCtx.measureText(line.txt).width * 1.1
        const lineHeight = line.size
        saveTxtDimensions(line, lineWidth, lineHeight)
    })
    const selectedLine = getSelectedLine()
    markSelectedLine(selectedLine)
}

/// Download Meme ///

function onDownloadMeme(elLink) {
    const memeContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = memeContent
}

/// Line Operators ///

function onDrawText(text) {
    editLineTxt(text)
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

/// Add Line ///

function onAddLine(txt) {
    addLine(txt)
    renderMeme()

    const elLineEnter = document.querySelector('.line-enter')
    elLineEnter.value = ''
}

/// Switch Line ///

function onSwitchLine() {
    const currLineText = switchLine()
    renderMeme()
    document.querySelector('.line-enter').value = currLineText
}

/// Mark Selected Line ///

function markSelectedLine(line) {
    if (!line) return
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.textAlign = 'center'
    gCtx.font = `${line.size}px ${line.font}`

    var lineHeight = line.size
    var lineWidth = gCtx.measureText(line.txt).width * 1.1

    gCtx.strokeRect(line.pos.x - lineWidth / 2, line.pos.y - lineHeight / 2, lineWidth, lineHeight)
    gCtx.closePath()
}

function onCanvasClick(ev) {
    const clickedLine = isLineClicked(ev)
    if (!clickedLine) return
    const currLineText = updateSelectedLineIdx(clickedLine)
    renderMeme()

    const elLineEnter = document.querySelector('.line-enter')
    elLineEnter.value = currLineText
}

function onSetFontFamily(font) {
    setFontFamily(font)
    renderMeme()
}

function onAlignText(dir) {
    alignText(dir)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

/// Save Meme ///

function onSaveMeme() {
    saveMeme()
}

function onDisplaySavedMemes() {
    renderSavedMemes()
    const elFilter = document.querySelector('.filter')
    const elGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    const elSavedMemes = document.querySelector('.saved-memes')

    elFilter.classList.add('hidden')
    elGallery.classList.add('hidden')
    elMemeEditor.classList.add('hidden')
    elSavedMemes.classList.remove('hidden')
}

function renderSavedMemes() {
    const memes = getSavedMemes()
    if (!memes) return
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.innerHTML = ''

    memes.forEach(meme => {

        renderImg(meme)
        renderLine(meme.lines)

        let dataUrl = gElCanvas.toDataURL()
        const img = new Image()
        img.src = dataUrl

        img.onload = () => {
            elSavedMemes.appendChild(img)
        }
    })
}

/// Share on Facebook ///

function onFacebookShare() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

/// Dragging Text ///

function onDown(ev) {
    const clickedLine = isLineClicked(ev)
	if (!clickedLine) return
	setLineDrag(clickedLine, true)
}

function onMove(ev) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (!line || !line.isDrag) return

	const pos = getEvPos(ev)
	const dx = pos.x - line.pos.x
	const dy = pos.y - line.pos.y
	moveLine(dx, dy)
	renderMeme()
}

function onUp() {
    const clickedLine = getCurrLine()
	setLineDrag(clickedLine, false)
}