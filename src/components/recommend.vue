<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>人才自薦-基本設定</b></font></v-card-text>
     <v-flex xs10 offset-xs1>
     <v-text-field v-model="title" label="Email標題" class="input-group--focused"></v-text-field>
    </v-flex>
     <v-flex xs10 offset-xs1>
     <v-text-field v-model="recieveEmail" label="收件信箱" hint="若有多個信箱，請用,分隔" class="input-group--focused"></v-text-field>
    </v-flex>
    <v-flex offset-xs4>
        <v-btn @click="save">儲存</v-btn>
    </v-flex>
</v-container>
</template>

<script>
import api from '../store/api'
export default {
data () {
      return {
          recieveEmail:'',
          title:'',
      }
    },
    methods:{
        save(){
            let token = localStorage.getItem('token')
          let data={
          }
          data.title = this.title
          data.reciever = this.recieveEmail
          api.setMailSetting(token,'recommend',data).then(res=>{
            alert("設定成功")
            window.location.reload()
          }).catch(error=>{
            alert(error)
          })
        }
    },
    beforeMount(){
        let token = localStorage.getItem('token')
        let self = this
        api.getMailSetting(token,'recommend').then(res=>{
            self.title = res.data.setting.title
            self.recieveEmail = res.data.setting.reciever
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
