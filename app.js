const imageFileInput = document.querySelector('.image-file-input')
const topTextInput = document.querySelector('.top-text-input')
const bottomTextInput = document.querySelector('.bottom-text-input')
const createMemeButton = document.querySelector('.create-meme-button')
const downloadButton = document.querySelector('.download-button')
const fontSizeInput = document.querySelector('.font-size-input')
const textColorInput = document.querySelector('.text-color-input')

const canvas = document.querySelector('.canvas')
const context = canvas.getContext('2d')

canvas.width = 0
canvas.height = 0

createMemeButton.onclick = () => {
    const file = imageFileInput.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageURL = reader.result
            const image = new Image()
            image.src = imageURL
            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height)
                
                canvas.width = image.width
                canvas.height = image.height
                context.drawImage(image, 0, 0)

                context.font = `${fontSizeInput.value + 'px'} Impact`
                context.textAlign = 'center'
                context.fillStyle = textColorInput.value
                context.strokeStyle = 'black'
                context.lineWidth = fontSizeInput.value / 15

                context.textBaseline = 'top'
                context.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 0, canvas.width)
                context.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 0, canvas.width)

                context.textBaseline = 'bottom'
                context.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height, canvas.width)
                context.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height, canvas.width)
            }
        }
        reader.readAsDataURL(file)

        downloadButton.classList.add('download-button--visible')
    }
}

downloadButton.onclick = () => {
    const memeURL = canvas.toDataURL()
    const a = document.createElement('a')
    a.setAttribute('href', memeURL)
    a.setAttribute('download', 'meme')
    a.click()
}