<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>我要留言-基本設定</b></font></v-card-text>
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

        }
    }
}
</script>

<style>

</style>
