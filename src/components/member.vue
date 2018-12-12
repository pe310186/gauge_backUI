<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>會員一覽</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs3>
            <v-text-field v-model="member[0].company" label="*公司名稱" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].name" label="*姓名" class="input-group--focused"></v-text-field>
             <v-select attach :items="items" label="權限等級" offset-y light v-model="member[0].level"></v-select>
            <v-text-field v-model="member[0].account" label="*帳號" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].password" label="*密碼" class="input-group--focused"></v-text-field>
            <p><font size="2">性別*:</font></p>
            <v-radio-group v-model="member[0].sex" row="">
                <v-radio label="男"  value="男"></v-radio>
                <v-radio label="女" value="女"></v-radio>
            </v-radio-group>
            <v-text-field v-model="member[0].birthday" label="生日" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].email" label="*e-mail" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].phone" label="*連絡電話" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].fax" label="*傳真" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].line" label="line" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].skype" label="skype" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].qq" label="qq" class="input-group--focused"></v-text-field>
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
                <v-flex xs6 offset-xs3>
            <v-text-field v-model="member[0].company" label="*公司名稱" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].name" label="*姓名" class="input-group--focused"></v-text-field>
             <v-select attach :items="items" label="權限等級" offset-y light v-model="member[0].level"></v-select>
            <v-text-field v-model="member[0].password" label="密碼" class="input-group--focused"></v-text-field>
            <p><font size="2">性別*:</font></p>
            <v-radio-group v-model="member[0].sex" row="">
                <v-radio label="男"  value="男"></v-radio>
                <v-radio label="女" value="女"></v-radio>
            </v-radio-group>
            <v-text-field v-model="member[0].birthday" label="生日" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].email" label="*e-mail" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].phone" label="*連絡電話" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].fax" label="*傳真" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].line" label="line" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].skype" label="skype" class="input-group--focused"></v-text-field>
            <v-text-field v-model="member[0].qq" label="qq" class="input-group--focused"></v-text-field>
                </v-flex>
             <br>
             <v-flex offset-xs3>
            <v-btn @click="updateConfirm" color="white" @click.native="dialog2 = false">確認</v-btn>
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
      <td>{{ props.item.level }}</td>
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
          { text: '權限等級', value: 'level',sortable: false, },
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
        create(){
          let list = ['name','company','account','password','birthday','email','phone','line','qq','fax','skype']
          for(var i of list){
            this.member[0][i] = '';
          }
          this.member[0]['sex'] = '男';
          this.member[0]['level'] = '一般客戶';
        },
        createConfirm(){
          let list = ['name','sex','company','account','password','birthday','email','phone','line','qq','fax','skype','level']
          let checkList = ['name','sex','company','account','password','phone','fax','email']
          for(var i of checkList){
            if(this.member[0][i] == ''){
              alert('有必填選項未填')
              return;
            }
          }
          for(var i of list){
            if(i=='sex'){
              if(this.member[0][i]=='男'){
                this.member[0][i]=1;
              }
              else{
               this.member[0][i]=0;
              }
              console.log(this.member[0][i])
            }
            if(i=='level'){
              if(this.member[0][i]=='一般客戶'){
                this.member[0][i]=0;
              }
              else if(this.member[0][i]=='重要客戶'){
                this.member[0][i]=1;
              }
              else{//員工
                this.member[0][i]=2;
              }
              console.log(this.member[0][i])
            }
          }
          console.log(this.member[0])
          let token = localStorage.getItem('token');
          api.register(token,this.member[0]).then(res=>{
            console.log(res)
            alert('新增成功');
            window.location.reload();
          }).catch(error=>{
            console.log(error)
            alert(error)
          })
        },
        update(){
          let list = ['name','company','account','password','birthday','email','phone','line','qq','fax','skype','level','sex']
          for(var i of list){
            if(i=='password'){
              this.members[0][i] = '';
            }
            else{
            this.member[0][i] = this.selected[0][i];
            }
          }
        },
        updateConfirm(){
          let list = ['name','sex','company','account','password','birthday','email','phone','line','qq','fax','skype']
          let checkList = ['name','sex','company','account','phone','fax']
          for(var i of checkList){
            if(this.member[0][i] == ''){
              alert('有必填選項未填')
              return;
            }
          }
          for(var i of list){
            if(i=='sex'){
              if(this.member[0][i]=='男'){
                this.member[0][i]=1;
              }
              else{
               this.member[0][i]=0;
              }
            }
            if(i=='level'){
              if(this.member[0][i]=='一般客戶'){
                this.member[0][i]=0;
              }
              else if(this.member[0][i]=='重要客戶'){
                this.member[0][i]=1;
              }
              else{//員工
                this.member[0][i]=2;
              }
            }
          }
          let token = localStorage.getItem('token');
          let id = this.selected[0].id
          api.accountUpdate(token,id,this.member[0]).then(res=>{
            alert('修改成功');
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        deleteConfirm(){
           var ids=[];
            for(var i in this.selected){
              console.log(i)
              if(this.selected[i].id == 1 || this.selected[i].id == 2){
                alert("訪客帳戶及員工帳戶不可刪除")
                 window.location.reload();
                return;
              }
                ids[i]=this.selected[i].id;
            }
            console.log(ids)
            let token = localStorage.getItem('token')
            api.deleteAccount(token,ids).then(res=>{
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
      api.getAllAccount(token).then(res=>{
        self.members = res.data.accounts;
        for(var i in self.members){
          if(self.members[i].sex == 1){
            self.members[i].sex = '男'
          }
          if(self.members[i].sex==2){
            self.members[i].sex = '女'
          }
          if(self.members[i].level == '2'){
            self.members[i].level = '員工'
          }
          if(self.members[i].level == '1'){
            self.members[i].level = '重要客戶'
          }
          if(self.members[i].level == '0'){
            self.members[i].level = '一般客戶'
          }
        }
      }).catch(error=>{
      })
    }
}
</script>

<style>

</style>
