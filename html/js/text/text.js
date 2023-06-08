import { loadImage, getBase64 } from '../utils/common'
import { CheckIsColor } from '../../utils'
import { numberAdd } from '@/utils/calculation'

export class Text2D {
  constructor(fontOptions) {
    const defaultOptions = {
      fillType: 'fill',
      strokeColor: '#000000',
      strokeWidth: 1,
      hasDoubleStroke: false,
      doubleStrokeWidth: 1,
      doubleStrokeColor: '#00ff00',
      // circle
      // 是否弧形文字
      isCircleText: false,
      // 弧形文字相对于半径的比例
      circleTextRadiusRate: 0.8, // 0.2-0.8
      // 文字间距角度
      circleTextSpaceAngle: 6, // 4-10
      // 文字间距
      letterSpacing: 0
    }

    this.options = {
      ...defaultOptions,
      ...fontOptions
    }

    this.init()
  }

  init() {
    // this.canvas = document.querySelector('#test-canvas')
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)

    this.context = this.canvas.getContext('2d', {
      willReadFrequently: true
    })

    const { isCircleText, text } = this.options

    this.canvasWidth = 500
    this.radius = 250
    this.canvasHeight = isCircleText ? this.radius : 100

    this.pixelRatio = 18

    this.canvas.width = this.canvasWidth * this.pixelRatio
    this.canvas.height = this.canvasHeight * this.pixelRatio
    this.context.scale(this.pixelRatio, this.pixelRatio)

    this.canvas.style.letterSpacing = `${this.options.letterSpacing}px`

    this.isZh = /[^\u0000-\u00FF]/.test(text)

    this.draw()

    document.body.removeChild(this.canvas)
  }

  setImageSize(w, h) {
    this.cropW = w
    this.cropH = h
  }

  getImageSize() {
    if (this.cropW) {
      return {
        width: this.cropW,
        height: this.cropH
      }
    }
  }

  async outPut({ outputFile = false } = {}) {
    let blob = null
    const { isCircleText } = this.options
    if (isCircleText) {
      blob = await this.clearCircle()
    } else {
      blob = await this.clearNormal()
    }

    this.canvas.width = this.canvas.height = 0
    this.context.fillRect(0, 0, 0, 0)
    if (outputFile) {
      return new File([blob], 'crop.png', {
        type: 'image/png'
      })
    }
    return await getBase64(blob)
  }

  draw() {
    const { text, fontWeight, fontFamily, fontSize, isCircleText } = this.options
    this.context.font = `${fontWeight} ${36}px ${fontFamily}`
    this.context.textBaseline = 'middle'
    this.context.textAlign = 'center'
    /* fix: 线段直接夹角比较大的，交点不会太远，但当夹角减少时，交点距离会呈指数级增大。
      miterLimit 设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 bevel
      https://stackoverflow.com/questions/19988099/how-to-prevent-ugly-spikes-in-canvas-font-rendering 
    */
    this.context.miterLimit = 2

    this.context.imageSmoothingEnabled = false

    // 设置线段连接处的样式
    // context.lineJoin = 'round'

    // test
    // context.strokeStyle = 'red'
    // context.moveTo(5, 0)
    // context.lineTo(395, 0)
    // context.stroke()

    this.startX = this.canvasWidth / 2
    this.startY = this.canvasHeight / 2

    if (isCircleText) {
      this.drawCircleText(text, this.isZh ? 'zh' : 'en')
    } else {
      this.drawNormalText(text, this.startX, this.startY)
    }
  }

  drawNormalText(text, startX, startY) {
    let {
      color,
      fillType,
      strokeColor,
      strokeWidth,
      hasDoubleStroke,
      doubleStrokeWidth,
      doubleStrokeColor
    } = this.options
    color = CheckIsColor(this.options.color) ? color : `#${Number(this.options.color).toString(16)}`
    const context = this.context

    // 如果有双描边就设置双描边，需要在单描边前设置
    if (fillType && fillType !== 'fill') {
      if (hasDoubleStroke) {
        context.lineWidth = numberAdd(Number(strokeWidth), Number(doubleStrokeWidth))
        context.strokeStyle = doubleStrokeColor
        context.strokeText(text, startX, startY)
      }
    }
    switch (fillType) {
      case 'fill':
        context.fillStyle = color
        context.fillText(text, startX, startY)
        break
      case 'stroke':
        context.lineWidth = strokeWidth
        context.strokeStyle = strokeColor
        context.strokeText(text, startX, startY)
        break
      case 'strokeFill':
        context.lineWidth = strokeWidth
        context.strokeStyle = strokeColor
        context.strokeText(text, startX, startY)
        context.fillStyle = color
        context.fillText(text, startX, startY)
        break
      case 'fillStroke':
        context.lineWidth = strokeWidth
        context.fillStyle = color
        context.fillText(text, startX, startY)
        context.strokeStyle = strokeColor
        context.strokeText(text, startX, startY)
        break
      default:
        context.fillStyle = color
        context.fillText(text, startX, startY)
        break
    }
  }

  drawCircleText(text, type) {
    let list = []
    // if (text.split(' ').length > 1) list = text.split(' ')
    // else list = text.split('')
    list = text.trim().split('')
    this.angles = this.calcAngle(list, type)

    this.drawCircularMethod(list, this.angles[0], this.angles[1])
  }

  drawCircularMethod(string, startAngle, endAngle) {
    const context = this.context
    const _this = this
    const startX = this.startX

    const { circleTextRadiusRate } = this.options

    const circle = {
      x: startX,
      y: _this.radius,
      radius: _this.radius * circleTextRadiusRate
    }

    const radius = circle.radius // 圆的半径
    const angleDecrement = (startAngle - endAngle) / (string.length - 1) // 每个字母占的弧度
    let angle = startAngle //

    let index = 0
    let character

    context.save()

    while (index < string.length) {
      character = string[index]
      context.save()
      context.beginPath()
      context.translate(
        circle.x + Math.cos((Math.PI / 180) * angle) * radius,
        circle.y - Math.sin((Math.PI / 180) * angle) * radius
      )
      context.rotate(Math.PI / 2 - (Math.PI / 180) * angle) // Math.PI/2为旋转90度  Math.PI/180*X为旋转多少度
      // context.fillText(character, 0, 0)
      // context.strokeText(character, 0, 0)
      this.drawNormalText(character, 0, 0)
      angle -= angleDecrement
      index++
      context.restore()
    }
    context.restore()
  }

  calcAngle(list, type) {
    const { circleTextSpaceAngle } = this.options
    const len = list.length
    const com = type === 'zh' ? circleTextSpaceAngle * 2 : circleTextSpaceAngle
    const angleStart = 90 + (len - 1) * com
    const angleEnd = 90 - (len - 1) * com
    return [angleStart, angleEnd]
  }

  getImageRect(x, y, w, h) {
    const context = this.context
    let imageData = context.getImageData(x, y, w, h)

    // let { data, width, height } = imageData

    // 裁剪需要的起点和终点,初始值为画布左上和右下点互换设置成极限值。
    let startX = imageData.width,
      startY = imageData.height,
      endX = 0,
      endY = 0

    // col为列，row为行，两层循环构造每一个网格，便利所有网格的像素，如果有色彩则设置裁剪的起点和终点
    for (let col = 0; col < imageData.width; col++) {
      for (let row = 0; row < imageData.height; row++) {
        // 网格索引
        const pxStartIndex = (row * imageData.width + col) * 4

        // 网格的实际像素RGBA
        const pxData = {
          // r: data[pxStartIndex],
          // g: data[pxStartIndex + 1],
          // b: data[pxStartIndex + 2],
          a: imageData.data[pxStartIndex + 3]
        }

        // 存在色彩：不透明
        const colorExist = pxData.a !== 0

        /*
            如果当前像素点有色彩
            startX坐标取当前col和startX的最小值
            endX坐标取当前col和endX的最大值
            startY坐标取当前row和startY的最小值
            endY坐标取当前row和endY的最大值
            */
        if (colorExist) {
          startX = Math.min(col, startX)
          endX = Math.max(col, startX)
          startY = Math.min(row, startY)
          endY = Math.max(row, endY)
        }
      }
    }

    // 右下坐标需要扩展1px,才能完整的截取到图像
    endX += 1
    endY += 1

    imageData = null

    return {
      startX,
      startY,
      endX,
      endY
    }
  }

  getStrokeWidth() {
    const { doubleStrokeWidth, hasDoubleStroke, strokeWidth, fillType } = this.options

    if (fillType !== 'fill') {
      if (hasDoubleStroke) {
        return numberAdd(Number(doubleStrokeWidth), Number(strokeWidth))
      }
      return Number(strokeWidth)
    }
    return 0
  }

  clearNormal() {
    const context = this.context
    const pixelRatio = this.pixelRatio

    const { text } = this.options

    // 先粗略计算下距离 减少imageData内存占用和计算压力

    // 部分字体会有偏差，预留裁切距离
    const xDistance = 15
    const yDistance = 25

    // 该字体所有文本高度
    // const textHeight =
    //   context.measureText(text).fontBoundingBoxAscent +
    //   context.measureText(text).fontBoundingBoxDescent

    // 当前文本高度
    const textHeight =
      context.measureText('24').actualBoundingBoxAscent +
      context.measureText('24').actualBoundingBoxDescent

    console.log('textHeight', textHeight)

    // 文本宽度
    const textWidth = context.measureText(text).width

    // 描边宽度
    const allStrokeWidth = this.getStrokeWidth()

    // 文本粗略宽度
    const roughWidth = textWidth + xDistance

    // 文本粗略高度
    const roughHeight = textHeight + allStrokeWidth * 2 + yDistance

    const top = (this.canvasHeight - roughHeight) / 2
    const left = (this.canvasWidth - roughWidth) / 2

    const enlargeLeft = Math.floor(left * pixelRatio)
    const enlargeTop = Math.floor(top * pixelRatio)

    // test
    // context.rect(
    //   Math.floor(left),
    //   Math.floor(top),clearCircle
    //   Math.floor(roughWidth),
    //   Math.floor(roughHeight)
    // )

    // context.rect(10, 10, 100, 100)

    // context.stroke()

    let { startX, startY, endX, endY } = this.getImageRect(
      enlargeLeft,
      enlargeTop,
      Math.floor(roughWidth * pixelRatio),
      Math.floor(roughHeight * pixelRatio)
    )

    // 填充字体和描边宽度，如1和一的高度是不一致的
    const enlargeTextHeight = textHeight * pixelRatio
    const enlargeAllStrokeWidth = allStrokeWidth * pixelRatio

    if (enlargeTextHeight > endY - startY) {
      const padding = Math.floor((enlargeTextHeight - (endY - startY)) / 2 + enlargeAllStrokeWidth)
      console.log('padding', padding)
      // 加上padding
      // startX -= padding
      startY -= padding
      // endX += padding
      endY += padding
    }

    // 根据当前计算好的距离重新填充像素
    const cropW = endX - startX
    const cropH = endY - startY
    return this.putImageDataToBlob(startX + enlargeLeft, startY + enlargeTop, cropW, cropH)
  }

  clearCircle() {
    const context = this.context
    const { text } = this.options
    const pixelRatio = this.pixelRatio
    // 粗略裁剪增加的高度
    const yDistance = 5
    // 粗略裁剪增加的角度
    const xRangeDistance = this.isZh ? 25 : 15
    // 绘制的角度,最大90deg
    let angles = ((Math.PI / 180) * (this.angles[0] - this.angles[1] + xRangeDistance)) / 2
    if (angles > Math.PI / 2) angles = Math.PI / 2
    // 当前文本高度
    const textHeight =
      context.measureText(text).actualBoundingBoxAscent +
      context.measureText(text).actualBoundingBoxDescent

    // 描边宽度
    const strokeWidth = this.getStrokeWidth()

    // 绘制的半径
    const radius = this.radius * this.options.circleTextRadiusRate

    // 由于居中绘制，需计算文字顶部和底部相关半径
    const r1 = radius + textHeight / 2 + Number(strokeWidth) + yDistance
    const r2 = radius - textHeight / 2 - Number(strokeWidth) - yDistance

    // 计算最左侧文字距离相对于中心点的宽高
    const xWidth = r1 * Math.sin(angles)
    const yHeight = r2 * Math.cos(angles)

    // 计算需裁剪区域坐标和宽高
    let y = this.radius - r1
    let x = this.radius - xWidth
    let w = 2 * xWidth
    let h = this.radius - y - yHeight

    // 超出处理
    if (y < 0) y = 0
    if (x < 0) x = 0
    if (w > this.canvasWidth) w = this.canvasWidth
    if (h > this.radius) h = this.radius

    // 获取像素裁剪坐标
    let { startX, startY, endX, endY } = this.getImageRect(
      Math.floor(x * pixelRatio),
      Math.floor(y * pixelRatio),
      Math.floor(w * pixelRatio),
      Math.floor(h * pixelRatio)
    )

    // 根据当前计算好的距离重新填充像素
    const cropW = endX - startX
    const cropH =
      endY - startY < this.options.fontSize * pixelRatio
        ? this.options.fontSize * pixelRatio
        : endY - startY
    return this.putImageDataToBlob(
      startX + Math.floor(x * pixelRatio),
      startY + Math.floor(y * pixelRatio),
      cropW,
      cropH
    )

    // test
    // context.rect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h))
    // context.stroke()
  }

  // 设置 imageData 转换为Blob
  putImageDataToBlob(x, y, w, h) {
    const canvas = this.canvas
    const context = this.context
    this.setImageSize(w, h)

    let cropImageData = context.getImageData(x, y, w, h)

    canvas.width = w
    canvas.height = h
    context.putImageData(cropImageData, 0, 0)

    cropImageData = null

    return new Promise((reslove, _reject) => {
      canvas.toBlob((blob) => {
        reslove(blob)
      })
    })
  }
}

