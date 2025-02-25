const text = decodeURI(window.location.search.slice(1)) || ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()] 
document.title = `Captain, it's ${text}`
const addTextToImage = (imageUrl, text) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = imageUrl

  const draw_wrapped_text = (context, text, color, box) => {
    let [ textBoxX , textBoxY,textBoxWidth , textBoxHeight] = box
    textBoxX += textBoxWidth/2

    let lines = ((text, ratio) => {
      let tl = text.length
      let tll = ((tl/(ratio*0.62))/tl)**1.4*tl+3
      console.log(tll)
      let lines = ['']
      let pos = 0
      text.split(/\W/).forEach(word => {
        if (lines[pos].length+word.length < tll) {
          lines[pos] += ' '+word
        } else {
          pos++ 
          lines[pos] = word
        }
      })
      return lines
    })(text,3).filter(a => a)

    let maxl = lines.reduce((c, ll) => ll.length + c,0)/lines.length
    //let maxl = lines.reduce((c, ll) => ll.length < c?c:ll.length,0)

    const font_size = 24
    const lineHeight = font_size*1.3

    console.log(lines,maxl)
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
    draw_wrapped_text(context, text, 'black', [111,142,200,90])

    const modImage = new Image()
    modImage.src = canvas.toDataURL()
    document.body.appendChild(modImage)
  }
}

const imageUrl = 'blank_captain.jpg'
//this doesn't actually work and you have to wait for the custom font to be available idfk why
document.getElementById('preloader').onloadeddata = setTimeout(() =>
addTextToImage(imageUrl, text), 15)
