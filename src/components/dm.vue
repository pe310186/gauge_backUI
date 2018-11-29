<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>各期E-DM</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="dm[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <p>E-DM<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="dm[0]['file']!==null">{{dm[0]['file'].name}}</p>
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
             <v-text-field v-model="dm[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <p>E-DM<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="dm[0]['file']!==null">{{dm[0]['file'].name}}</p>
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
    :items="dms"
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
      <td >{{ props.item.title }}</td>
      <td >{{ props.item.date }}</td>
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
        title:'',
        headers: [
          {
            text: '編號',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: '標題', value: 'title' ,sortable:false},
          { text: '修改日期', value: 'date' ,sortable:false},
        ],
        dms: [
        ],
        dm:[
          {
            id:'',
            title:'',
            file:null,
          }
        ],
        dialog:false,//新稱
        dialog2:false,//修改
        dialog3:false,//刪除
      }
    },
    methods:{
        create(){
            for(var i in this.dm[0]){
              if(i=='file'){
                this.dm[0][i]=null
              }
              else{
                this.dm[0][i]=''
              }
            }
        },
        createConfirm(){
          let formdata = new FormData();
           formdata.append('title', this.dm[0].title);
            formdata.append('file', this.dm[0].file);
            formdata.append('classID',6);
            console.log(this.dm[0].file);
            let token = localStorage.getItem('token')
            api.createArticle(token, formdata).then(res=>{
                alert('新增成功')
                window.location.reload();
            }).catch(error=>{
                alert(error);
            })
        },
        update(){
          console.log(this.selected[0]);
          for(var i in this.dm[0]){
              if(i=='file'){
                this.dm[0][i]=null
              }
              else{
                this.dm[0][i]=''
              }
            }
            this.dm[0].title=this.selected[0].title;
            this.dm[0].id=this.selected[0].id;
            console.log(this.dm[0]);
        },
        updateConfirm(){
           let formdata = new FormData();
           formdata.append('title', this.dm[0].title);
            formdata.append('file', this.dm[0].file);
            formdata.append('classID',6);
            let token = localStorage.getItem('token')
            api.articleUpdate(token, this.dm[0].id , formdata).then(res=>{
                alert('修改成功')
                window.location.reload();
            }).catch(error=>{
                alert(error);
            })
        },
        Upload(genre, file)
        {
          this.dm[0][genre]=file
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
    },
    beforeMount(){
      let self = this;
      api.getArticleByType(6).then(res=>{
        self.dms = res.data.articles
      }).catch(error=>{
      })
    }
}
</script>

<style>

</style>
