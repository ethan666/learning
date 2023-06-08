import { Text2D } from './text.js'


const createText = async () => {
  const text = new Text2D({
    
  })
  const src = await text.outPut()
  const img = new Image()
  img.src = src
  
  document.body.append(img)
}