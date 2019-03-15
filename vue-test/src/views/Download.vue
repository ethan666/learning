<template>
    <div class="download">
        <h2><span>下载页面</span></h2>
        <div id="nav">
            <router-link to="/download/window">
                <div class="router-icon">
                    <img src="../assets/window.jpg" alt="windows"/>
                    <p>Window</p>
                </div>
            </router-link>
            <router-link to="/download/os">
                <div class="router-icon">
                    <img src="../assets/os.jpg" alt="Mac os"/>
                    <p>Mac os</p>
                </div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
    .router-icon{
        display: inline-block;
        margin-right: 20px;
    }
    .router-icon img{
        width: 80px;
        height: 80px;
    }
    .router-icon p{
        margin: 0;
    }
</style>
