<template>
    <v-container>
        <v-card-text align="center"><font size="4"><b>電子報</b></font></v-card-text>
        <v-card>
            <br>
            <v-flex xs10 offset-xs1>
                <v-text-field v-model="title" label="Email標題" class="input-group--focused"></v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1>
                <v-text-field v-model="recieveEmail" label="收件信箱" hint="若有多個信箱，請用,分隔" class="input-group--focused"></v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1>
                <font size=4><p>電子報:</p></font>
                 <v-radio-group v-model="switch1" row="">
                    <v-radio label="文字"  value="文字"></v-radio>
                    <v-radio label="html" value="html"></v-radio>
                </v-radio-group>
                <v-textarea solo auto-grow v-model="message"></v-textarea>
            </v-flex>
            <center>
                <v-btn @click="send()">發送</v-btn>
            </center>
            <br>
        </v-card>
    </v-container>
</template>

<script>
import api from '../store/api'
export default {
    data(){
        return{
            title:'',
            recieveEmail:'',
            message:'',
            switch1:'文字',
        }
    },
    methods:{
        send(){
            let token = localStorage.getItem('token')
            let self = this
            let data={
            }
            data.title = this.title
            data.reciever = this.recieveEmail
            data.message = this.message
            if(this.switch1=='文字'){
                api.sendNewletter(token,'text',data).then(res=>{
                    alert('發送成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('發送失敗')
                    window.location.reload();
                })
            }
            else if(this.switch1=='html'){
                 api.sendNewletter(token,'html',data).then(res=>{
                    alert('發送成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('發送失敗')
                    window.location.reload();
                })
            }
        }
    }
}
</script>

<style>

</style>
