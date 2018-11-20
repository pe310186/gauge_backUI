<template>
    <v-container>
        <v-card v-if="path=='home'">
           <v-card-text align="center"><font size="4"><b>首頁</b></font></v-card-text>
           <v-flex offset-xs1 xs10>
               <v-layout row>
           <p><font size="4">上方logo</font></p><upload-button title="圖片上傳" name="logo" :selectedCallback="Upload"></upload-button>
               </v-layout>
               <br>
               <v-layout row>
           <p><font size="4">上方廣告板</font></p><upload-button title="圖片上傳" name="ad" :selectedCallback="Upload"></upload-button>
               </v-layout>
               <p><font size="4">關於亞帝:</font></p>
               <v-textarea auto-grow v-model="about" solo></v-textarea>
           </v-flex>
           <v-flex offset-xs5>
                <v-btn @click="save">儲存</v-btn>
           </v-flex>
           <br>
        </v-card>
        <v-card v-if="path=='about'">
            <about></about>
        </v-card>

        <v-card v-else-if="path=='product'">
            <product></product>
        </v-card>

        <v-card v-else-if="path=='connection'">
            <connection></connection>
        </v-card>
        <v-card v-else-if="path=='link'">
           <relation></relation>
        </v-card>
        <v-card v-else-if="path=='news'">
            <news></news>
        </v-card>
        <v-card v-else-if="path=='download'">
            <download></download>
        </v-card>
        <v-card v-else-if="path=='industry'">
            <industry></industry>
        </v-card>
        <v-card v-else-if="path=='dm'">
           <dm></dm>
        </v-card>
        <v-card v-else-if="path=='technology'">
           <technology></technology>
        </v-card>
        <v-card v-else-if="path=='scene'">
           <scene></scene>
        </v-card>
        <v-card v-else-if="path=='brands'">
            <brands></brands>
        </v-card>
        <v-card v-else-if="path=='message'">
            <message></message>
        </v-card>
        <v-card v-else-if="path=='recommend'">
            <recommend></recommend>
        </v-card>
        <v-card v-else-if="path=='ask'">
           <ask></ask>
        </v-card>
        <v-card v-else-if="path=='order'">
            <order></order>
        </v-card>
        <v-card v-else-if="path=='member'">
            <member></member>
        </v-card>
        <v-card v-else-if="path=='membercheck'">
            <membercheck></membercheck>
        </v-card>
        <v-card v-else-if="path=='newsletter'">
            <newsletter></newsletter>
        </v-card>
    </v-container>
</template>

<script>

import api from '../store/api'

export default {
    props:['path'],
    data(){
        return {
            about:'',
        }
    },
    methods:{
        save(){
            let token = localStorage.getItem('token')
             let formdata = new FormData();
            formdata.append('title', 'about');
            formdata.append('context', this.about);
            formdata.append('classID',-1);
           api.articleUpdate(token,-1,formdata).then(res=>{
               alert('儲存成功')
               window.location.reload();
           }).catch(error=>{
               alert(error);
           })
        },
        Upload(genre, file)
        {
            console.log(genre);
            let formdata = new FormData();
            formdata.append('title', genre);
            formdata.append('file', file);
            formdata.append('classID',-1);
            let token = localStorage.getItem('token')
            api.articleUpdate(token, -1, formdata).then(res=>{
                alert('修改成功')
                window.location.reload();
            }).catch(error=>{
                alert(error);
            })
        } 
    },
    beforeMount()
    {
        let self = this
        api.getArticle(15).then(res=>{
            console.log(res);
            self.about = res.data.article.context;
        }).catch(error=>{
            alert(error);
        })
    }
}
</script>

<style>

</style>
