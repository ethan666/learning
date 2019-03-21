<template>
    <div class="users">
        <p>用户列表</p>
        <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
        <a-table bordered :dataSource="userList" :columns="columns">
        </a-table>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
    name: 'Users',
    data: function () {
        return {
            hadGotData: false,
            userList:[],
            columns: [
                {
                    title: 'name',
                    dataIndex: 'name',
                    width: '30%',
                    scopedSlots: { customRender: 'name' },
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                    width: '30%',
                    scopedSlots: { customRender: 'address' },
                },
                {
                    title: 'age',
                    dataIndex: 'age',
                    width: '30%',
                    scopedSlots: { customRender: 'age' },
                }
            ]
        }
    },
    created: function () {
        console.log("Users created!");
    },
    mounted: function () {
        console.log("Users mounted!");
        if(!this.hadGotData){
            this.fetch();
        }
    },
    methods: {
        fetch () {
            axios.get('https://easy-mock.com/mock/5c90464d5b39e9323d63b494/example/userList', {}).
            then((response)=>{
                // handle success
                this.userList = response.data.data;
                this.hadGotData = true;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        },
        handleAdd () {
            const key = this.userList.length+1
            const itemData = {key, name: `新增${key}`, city:'', age: 18}
            this.userList.push(itemData)
        }
    }
}
</script>

<style lang="less" scoped>
    .users p{
        color:#f00;
    }
</style>

