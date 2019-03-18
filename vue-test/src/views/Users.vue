<template>
    <div class="users">
        <p>用户列表</p>
        <Button type="default">增加</Button>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'ant-design-vue'
import axios from 'axios'

Vue.use(Button);

export default {
    name: 'Users',
    components: {
        Button
    },
    created: function () {
        console.log("Users created!");
        axios.get('http://www', {}).
        then(()=>{
            // handle success
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
    .users p{
        color:#f00;
    }
</style>

