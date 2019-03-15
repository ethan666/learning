<template>
    <div id="header" class="section">
        <img :src=userIcon alt="头像" class="img-circle" />
        <p>姓名：{{username}}</p>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
      username: String,
      userIcon: String
    }
}
</script>

<style scoped>
    #header {
        background-image: url(https://www.w3cschool.cn/statics/demosource/myblog/head.png);
        background-size: cover;
    }
    #header img {
        display: block;
        width: 80px;
        height: 80px;
        margin: auto;
        border: 3px solid #fff;
        border-radius: 50%;
    }
    #header p {
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        margin: 10px 0 0 0;
        line-height: 24px;
    }
</style>
