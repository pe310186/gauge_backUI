<template>
    <v-container>
        <v-card-text align="center"><b><font size="6">亞帝後台系統</font></b></v-card-text>
        <v-flex xs6 offset-xs3>
        <v-card-text><font size="5">登入</font></v-card-text>
        
           <v-text-field v-model="account" label="帳號" class="input-group--focused"></v-text-field>
           <v-text-field v-model="password" :type="'password'" label="密碼" class="input-group--focused"></v-text-field>
           <v-btn @click="login" large>登入</v-btn>
        </v-flex>
    </v-container>
</template>

<script>

import api from '../../store/api'

export default {
    props:['path'],
        mounted () {
        console.log(this.path);
    },
    data(){
        return {
            account:'',
            password:''
        }
    },
    methods:{
        login(){
            api.login(this.account,this.password).then(res=>{
                localStorage.setItem('token',res.data.token)
                this.$router.push('/home/about');
            }).catch(error=>{
                alert(error);
            })
        }
    }
}
</script>
