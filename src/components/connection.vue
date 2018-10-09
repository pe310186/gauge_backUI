<template>
    <v-container>
        <v-card-text align="center"><font size="4"><b>聯絡我們</b></font></v-card-text>
        <v-flex offset-xs1>
                <v-layout row>
                <p><font size="4">聯絡資訊</font></p>
                <upload-button title="檔案上傳" name="information" accept="pdf" :selectedCallback="Upload"></upload-button>
                </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
import api from '../store/api'
export default {
    methods:{
        Upload(genre, file)
        {
            let formdata = new FormData();
            formdata.append('title', genre);
            formdata.append('file', file);
            formdata.append('classID',-1);
            let token = localStorage.getItem('token')
            api.articleUpdate(token, -1, formdata).then(res=>{
                alert('succeed')
            }).catch(error=>{
                alert(error);
            })
        } 
     }
}
</script>

<style>

</style>
