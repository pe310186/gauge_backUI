<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>人才自薦-基本設定</b></font></v-card-text>
     <v-flex xs10 offset-xs1>
     <v-text-field v-model="title" label="Email標題" class="input-group--focused"></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1>
     <v-text-field v-model="sendEmail" label="寄件信箱" class="input-group--focused"></v-text-field>
    </v-flex>
     <v-flex xs10 offset-xs1>
     <v-text-field v-model="recieveEamil" label="收件信箱" hint="若有多個信箱，請用,分隔" class="input-group--focused"></v-text-field>
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
          sendEmail:'',
          recieveEmail:'',
          title:'',

      }
    },
    methods:{
        save(){
            api.recommendSet(this.data).then(res=>{
                alert('儲存成功')
            }).catch(error=>{
                alert(error)
            })
        }
    },
    beforeMount(){
        api.recommendGet().then(res=>{
            this.data=res.data.setting;
        }).catch(error=>{
            alert(error);
        })
    }
}
</script>

<style>

</style>
