<template>
    <v-container>
        <v-card-text align="center"><font size="4"><b>關於</b></font></v-card-text>
        <v-flex offset-xs1>
            <v-layout row>
            <p><font size="4">公司介紹</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="introduction" accept=".pdf" :selectedCallback="Upload" background-color="white"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">公司沿革</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="history" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">公司環境</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="envirnoment" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">工程實績</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="records" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">營利/營業證照</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="license" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">產品校正報告</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="product_report" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
            <v-layout row>
            <p><font size="4">認證報告</font><font siz3="2">(.pdf檔)</font></p>
            <upload-button title="檔案上傳" name="report" :selectedCallback="Upload"></upload-button>
            </v-layout>
            <br>
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
                alert('修改成功')
                window.location.reload();
            }).catch(error=>{
                alert(error);
            })
        } 
     },

  }
</script>

<style>

</style>
