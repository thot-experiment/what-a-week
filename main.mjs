let text = decodeURI(window.location.search.slice(1))
let custom = !!(text)
if (!custom) text = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()] 
document.title = `Captain, it's ${text}`

const addTextToImage = (imageUrl, text) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = imageUrl

  const draw_wrapped_text = (context, text, color, box) => {
    let [ textBoxX , textBoxY,textBoxWidth , textBoxHeight] = box
    textBoxX += textBoxWidth/2

    let maxl = text.length
    let lines = [text]

    const font_size = custom?textBoxWidth/maxl*1.8:24
    const lineHeight = font_size*1.3

    context.font = `${font_size}pt chewy`
    //context.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight)
    context.fillStyle = color
    context.textBaseline = 'top'
    context.textAlign = 'left'

    lines.forEach((line,i) => context.fillText(line, textBoxX, textBoxY + (i * lineHeight)))
  }

  image.onload = () => {
    canvas.width = image.width
    canvas.height = image.height

    context.drawImage(image, 0, 0)
    draw_wrapped_text(context, text, 'black', [146,142,130,60])

    const modImage = new Image()
    modImage.src = canvas.toDataURL()
    document.body.appendChild(modImage)
  }
}

const imageUrl = 'blank_captain.jpg'
//this doesn't actually work and you have to wait for the custom font to be available idfk why
document.getElementById('preloader').onloadeddata = setTimeout(() =>
addTextToImage(imageUrl, text), 15)
