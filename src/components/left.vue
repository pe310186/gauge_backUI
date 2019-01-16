<template>
    <v-container>
        <v-layout column="">
            <v-flex v-bind:key=item.url v-for="item in toolbar" >
                 <v-btn  @click="changeRoute(item.url)" block>{{item.genre}}</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props:['path'],
    data(){
        return {
            toolbar:[
                {genre:"首頁",url:"home"},
                {genre:"關於亞帝",url:"about"},
                {genre:"產品目錄",url:"product"},
                {genre:"型錄總覽下載",url:"download"},
                {genre:"應用產業",url:"industry"},
                {genre:"最新消息",url:"news"},
                {genre:"各期EDM",url:"dm"},
                {genre:"技術園地",url:"technology"},
                {genre:"應用現場",url:"scene"},
                {genre:"相關連結",url:"link"},
                {genre:"我要留言",url:"message"},
                {genre:"人才自薦",url:"recommend"},
                {genre:"衍生品牌",url:"brands"},
                {genre:"聯絡我們",url:"connection"},
                {genre:"詢價單",url:"ask"},
                {genre:"訂單管理",url:"order"},
                {genre:"會員一覽",url:"member"},
                {genre:"會員認證",url:"membercheck"},
                {genre:"電子報",url:"newsletter"}
            ]
        }
    },
    methods:{
        changeRoute(url){
            this.$router.push('/home/'+ url);
        }
    }
}
</script>

<style>

</style>
