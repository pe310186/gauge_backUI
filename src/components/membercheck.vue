<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>會員認證</b></font></v-card-text>
    <v-layout row>
        <v-btn  slot="activator" @click="pass" v-if="selected.length!=0">通過認證</v-btn>
           <v-dialog v-model="dialog3" width="300">
            <v-btn slot="activator" v-if="selected.length!=0">刪除</v-btn>
            <v-card color="white">
                <br>
                <v-flex offset-xs2>
                <font size="4">確認刪除已選擇項目?</font>
                </v-flex>
                <br>
                <v-flex offset-xs4>
                <v-btn @click.native="dialog3=false" @click="deleteConfirm">確認</v-btn>
                </v-flex>
                <br>
            </v-card>
            </v-dialog>
            
            <v-flex xs3 offset-xs2>
          <v-text-field v-model="search" label="搜尋" class="input-group--focused"></v-text-field>
            </v-flex>
            <v-btn small><v-icon>search</v-icon></v-btn>
        </v-layout>
    <v-data-table
    :headers="headers"
    :items="members"
    :search="search"
    v-model="selected"
    item-key="id"
    select-all
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.company }}</td>
      <td >{{ props.item.account }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.phone }}</td>
      <td>{{ props.item.fax }}</td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
import api from '../store/api'
export default {
data () {
      return {
        search: '',
        selected: [],
        name:'',
        headers: [
          {
            text: '編號',
            align: 'left',
            sortable: false,
            value: 'id'
          },
           { text: '帳戶名稱', value: 'name',sortable: false, },
            { text: '公司名稱', value: 'company',sortable: false, },
          {text:'帳號',value:'account',sortable:false},
          { text: 'Email', value: 'email' ,sortable: false,},
          {text: '連絡電話',value:'phone',sortable:false},
           { text: '傳真', value: 'fax',sortable: false, }
        ],
       members: [
        ],
        member:[
          {name:'',company:'',account:'',password:'',sex:'',birthday:'',email:'',phone:'',line:'',qq:'',fax:'',skype:'',level:''}
        ],
        dialog:false,
        dialog2:false,
        dialog3:false,
        items:['員工','重要客戶','一般客戶']
      }
    },
    methods:{
      pass(){
        var ids = [];
        for(var i in this.selected){
                ids[i]=this.selected[i].id;
            }
            let token = localStorage.getItem('token')
            api.memberPass(token,ids).then(res=>{
              alert('成功')
              window.location.reload();
            }).catch(error=>{
              alert(error)
            })
      },
        deleteConfirm(){
           var ids=[];
            for(var i in this.selected){
                ids[i]=this.selected[i].id;
            }
            let token = localStorage.getItem('token')
            api.deleteApplyAccount(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
            })
        }
    },
    beforeMount(){
      let token = localStorage.getItem('token')
      let self = this
      api.getAllApplyAccount(token).then(res=>{
        self.members = res.data.accounts;
      }).catch(error=>{
        alert(error)
      })
    }
}
</script>

<style>

</style>
