<template>
  <div></div>
</template>

<script>
import { getLocation } from '../../api/baidu'
export default {
    name:'PromiseTest',
    mounted(){
      getLocation({
        qt: "ipLocation",
        t: new Date().getTime()
      })
      .then(res => {
        if(res.status === 200){
          return res.data
        }
      })
      .then(data => {
        const { rgc: { code } } = data
        if(code === 1){
          console.log('ok')
        }else{
          throw '接口返回数据异常'
        }
      })
      .catch(err => {
        console.log(`error:${err}`)
      })
    }
}
</script>