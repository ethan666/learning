<template>
  <a-row type="flex" justify="center" align="middle" v-if="data.length > 0">
    <a-col class="btn-box" :span="1">
      <a-icon class="icon-btn" type="double-left" v-if="arrowBtnVisible" @click="onLeft"></a-icon>
    </a-col>
    <a-col :span="22">
      <div class="mask">
        <div class="containor" :style="{transform:`translateX(${imgBoxOffsetX}px)`}">
          <div
            class="item"
            v-for="(item, index) in data"
            :key="index"
            :style="{width:`${imgWidth}px`,height:`${imgHeight}px`,marginRight:`${imgGap}px`}"
            @click="handlePreview(item)"
          >
            <img :src="item.url" alt="img"/>
          </div>
        </div>
      </div>
    </a-col>
    <a-col class="btn-box" :span="1">
      <a-icon class="icon-btn" type="double-right" v-if="arrowBtnVisible" @click="onRight"></a-icon>
    </a-col>
  </a-row>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'ImageList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgBoxOffsetX: 0,
      imgWidth: 110,
      imgHeight: 90,
      imgGap: 8
    }
  },
  computed: {
    itemWidth () {
      return this.imgWidth + this.imgGap
    },
    arrowBtnVisible () {
      if (!document.getElementsByClassName('mask')[0]) {
        return false
      }
      const mw = document.getElementsByClassName('mask')[0].clientWidth
      const cw = this.itemWidth * this.data.length
      return cw > mw
    }
  },
  methods: {
    onLeft () {
      if (this.imgBoxOffsetX + this.itemWidth > 0) {
        this.imgBoxOffsetX = 0
      } else {
        this.imgBoxOffsetX += this.itemWidth
      }
    },
    onRight () {
      const mw = document.getElementsByClassName('mask')[0].clientWidth
      const cw = this.itemWidth * this.data.length
      if (this.imgBoxOffsetX - this.itemWidth < mw - cw) {
        this.imgBoxOffsetX = mw - cw
      } else {
        this.imgBoxOffsetX -= this.itemWidth
      }
    },
    handlePreview (file) {
      const ulDom = document.createElement('ul')
      this.data.forEach(img => {
        const liDom = document.createElement('li')
        const imgDom = new Image()
        imgDom.src = img.url
        imgDom.alt = img.name.substring(0, img.name.lastIndexOf('.'))
        liDom.appendChild(imgDom)
        ulDom.appendChild(liDom)
      })

      const imgViewer = new Viewer(ulDom, {
        hidden: function () {
          imgViewer.destroy()
        }
      })
      const index = this.data.findIndex(item => item === file)
      imgViewer.view(index)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box{
  text-align: center;
  .icon-btn{
    cursor: pointer;
    font-size:40px;
    &:hover{
      color: #40a9ff;
    }
  }
}
.mask{
  margin-top:16px;
  overflow: hidden;
  .containor{
    transition: transform 0.5s ease-out;
    white-space: nowrap;
    .item{
      cursor: pointer;
      position: relative;
      border: 1px solid #ddd;
      display: inline-block;
      img{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}
</style>
