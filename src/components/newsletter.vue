<template>
    <v-container>
        <v-card-text align="center"><font size="4"><b>電子報</b></font></v-card-text>
        <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
                     <v-text-field v-model="member.name" label="名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
                    <v-text-field v-model="member.mail" label="E-mail" class="input-group--focused"></v-text-field>
                </v-flex>
             <br>
             <v-flex offset-xs3>
            <v-btn @click="createConfirm" color="white" @click.native="dialog = false">確認</v-btn>
             </v-flex>
             <br>   
            </v-card>
            </v-dialog>
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
            <v-dialog v-model="dialog2" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="update" v-if="selected.length==1">修改</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
                     <v-text-field v-model="member.name" label="名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
                    <v-text-field v-model="member.mail" label="E-mail" class="input-group--focused"></v-text-field>
                </v-flex>
                <br>
                <v-flex offset-xs4>
                    <v-btn @click="updateConfirm" color="white" @click.native="dialog2 = false">確認</v-btn>
                </v-flex>
            </v-card>
            </v-dialog>
            <v-flex xs3 offset-xs2>
          <v-text-field v-model="search" label="搜尋" class="input-group--focused"></v-text-field>
            </v-flex>
            <v-btn small><v-icon>search</v-icon></v-btn>
            <v-btn small @click="selectAll()">全選</v-btn>
        </v-layout>
    <v-data-table
    :headers="headers"
    :items="members"
    :search="search"
    v-model="selected"
    select-all
    item-key="id"
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
      <td> {{props.item.id}}</td>
      <td >{{ props.item.name }}</td>
      <td >{{ props.item.mail }}</td>
    </template>
  </v-data-table>
        <v-card>
            <br>
            <v-flex xs10 offset-xs1>
                <v-text-field v-model="title" label="Email標題" class="input-group--focused"></v-text-field>
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
            search: '',
            selected: [],
            headers: [
            {text:'編號',value:'id',sortable:false},
            { text: '名稱', value: 'name',sortable: false,},
            { text: 'E-mail', value: 'mail' ,sortable: false,},
            ],
            members:[],
            member:{
                id:'',
                name:'',
                mail:'',
            },
            title:'',
            recieveEmail:'',
            message:'',
            switch1:'文字',
            dialog:false,
            dialog2:false,
            dialog3:false
        }
    },
    methods:{
        create(){
          this.member.name = '',
          this.member.mail = ''
        },
        createConfirm(){
          let token = localStorage.getItem('token')
          let data = {
              name: this.member.name,
              mail: this.member.mail,
          }
          console.log(data)
          api.createNewsletter(data).then(()=>{
            alert('新增成功')
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        update(){
            this.member.name = this.selected[0].name
            this.member.mail = this.selected[0].mail
            this.member.id = this.selected[0].id
        },
        updateConfirm(){
          let token = localStorage.getItem('token')
          let id = this.member.id
          let data={
          }
          data.name = this.member.name
          data.mail = this.member.mail
          api.newsletterUpdate(token,id,data).then(()=>{
            alert('修改成功')
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
            api.deleteArticle(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
            })
        },
        send(){
            let token = localStorage.getItem('token')
            let self = this
            let data={
            }
            data.title = this.title
            data.recieveEmail = ""
            data.message = this.message
            for(var i=0;i<this.selected.length;i++){
                data.recieveEmail += this.selected[i].mail
                if(i != this.selected.length-1){
                    data.recieveEmail += ","
                }
            }
            if(this.switch1=='文字'){
                api.sendNewsletter(token,'text',data).then(res=>{
                    alert('發送成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('發送失敗')
                    window.location.reload();
                })
            }
            else if(this.switch1=='html'){
                 api.sendNewsletter(token,'html',data).then(res=>{
                    alert('發送成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('發送失敗')
                    window.location.reload();
                })
            }
        },
        selectAll(){
            this.selected=[]
            for(var i in this.members){
                this.selected.push(this.members[i])
            }
        }
    },
    beforeMount(){
        let self = this
        api.getNewsletter().then(res=>{
            self.members = res.data.members
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
