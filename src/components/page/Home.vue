<template>
    <v-container>
        <v-card-text align="center"><b><font size="6">亞帝後台系統</font></b></v-card-text>
        <v-layout row="">
            <v-flex>
                <left></left>
            </v-flex>
            <v-flex lg10 md10>
             <middle :path="path"></middle>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
import api from '../../store/api'

export default {
    props:['path'],
    beforeMount(){
        let token=localStorage.getItem('token');
        api.checkAccount(token).catch(error=>{
            this.$router.push('/');
        })
    }
}
</script>

<style>

</style>
