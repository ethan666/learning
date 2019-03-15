<template>
  <div class="about">
    <h1>我的博客</h1>
    <Header :username=username userIcon="https://www.w3cschool.cn/statics/demosource/myblog/avatar.png"></Header>
    <Skills/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Skills from '@/components/Skills.vue'

export default {
  name: 'about',
  data: function(){
    return {
      username: '谭义洋'
    }
  },
  components: {
    Header,
    Skills
  }
}
</script>