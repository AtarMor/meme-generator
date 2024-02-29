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
    let lineIdx = -1
    memeLines.forEach(line => {
        lineIdx += 1
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'

        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)

        const lineWidth = gCtx.measureText(line.txt).width * 1.1
        const lineHeight = line.size * 1.4;
        saveLineDimensions(lineIdx, lineWidth, lineHeight)
    })
    const selectedLine = getSelectedLine()
    markSelectedLine(selectedLine)
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
    const { lines } = getMeme()
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
    if (!line) return
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.textAlign = 'center'

    var lineHeight = line.size * 1.4;
    var lineWidth = gCtx.measureText(line.txt).width * 1.1

    gCtx.strokeRect(line.pos.x - lineWidth / 2, line.pos.y - lineHeight / 2, lineWidth, lineHeight)
    gCtx.closePath()
}

function onEditTxt(ev) {
    const clickedLine = isLineClicked(ev)
    if (!clickedLine) return
    editLine(clickedLine)
    renderMeme()
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

    memes.forEach(meme => {
        const elSavedMemes = document.querySelector('.saved-memes')

        renderImg(meme);
        renderLine(meme.lines);

        let dataUrl = gCanvas.toDataURL();
        const img = new Image()
        img.src = dataUrl;

        img.onload = () => {
            elSavedMemes.appendChild(img);
        }
    })
}

/// Share on Facebook ///

function onFacebookShare() {
	const imgDataUrl = gCanvas.toDataURL('image/jpeg')

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