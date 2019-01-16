<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>應用現場</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="scene[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                    <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" offset-y light v-model="scene[0].type" max-height="100"></v-select>
             </v-flex>
           <v-flex xs6 offset-xs1 v-if="scene[0].type=='管路/設備儀表照片'||scene[0].type=='文字圖案'">
             <p>內文<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="scene[0]['file']!==null">{{scene[0]['file'].name}}</p>
                </v-flex>
                <v-flex xs6 offset-xs1 v-else-if="scene[0].type=='影片'">
             <v-text-field v-model="scene[0].context" label="影片連結" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex v-else>
                    <br>
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
             <v-text-field v-model="scene[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                 <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" offset-y light v-model="scene[0].type" max-height="100"></v-select>
             </v-flex>
                <v-flex xs6 offset-xs1 v-if="scene[0].type=='管路/設備儀表照片'||scene[0].type=='文字圖案'">
             <p>內文<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="scene[0]['file']!==null">{{scene[0]['file'].name}}</p>
                </v-flex>
                <v-flex xs6 offset-xs1 v-else-if="scene[0].type=='影片'">
             <v-text-field v-model="scene[0].context" label="影片連結" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex v-else>
                    <br>
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
    :items="scenes"
    :search="search"
    v-model="selected"
    :pagination.sync="pagination"
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
      <td>{{ props.item.title }}</td>
      <td>{{props.item.type}}</td>
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
        pagination: {
            sortBy: 'name',
            rowsPerPage: 10
        },
        headers: [
          {
            text: '編號',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: '標題', value: 'title',sortable: false, },
          { text: '類別', value: 'type',sortable: false, },
          { text: '修改日期', value: 'date' ,sortable: false,},
        ],
        items:['管路/設備儀表照片','影片','文字圖案'],
        scenes: [
        ],
        scene:[
            {
            title:'',
            context:'',
            type:'',
            file:null,
            id:'',
            }
        ],
        dialog:false,
        dialog2:false,
        dialog3:false,
      }
    },
     methods:{
        create(){
          this.scene[0].title='';
          this.scene[0].type='';
          this.scene[0].id='';
          this.scene[0].file=null;
          console.log(this.scene[0])
        },
        createConfirm(){
          let formdata = new FormData(); 
          formdata.append('title', this.scene[0].title);
         if(this.scene[0].type=='影片'){
            formdata.append('context',this.scene[0].context)
          }
          else{
          formdata.append('file', this.scene[0].file);
          }
          formdata.append('type',this.scene[0].type);
          formdata.append('classID',8);
          let token = localStorage.getItem('token')
          api.createArticle(token,formdata).then(()=>{
            alert('新增成功')
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        update(){
            this.scene[0].title='',
            this.scene[0].type='',
            this.scene[0].id='',
            this.scene[0].file=null,
            this.scene[0].context='',
            console.log(this.selected[0])
            this.scene[0].title=this.selected[0].title,
            this.scene[0].type=this.selected[0].type,
            this.scene[0].id=this.selected[0].id,
            this.scene[0].context= this.selected[0].context
        },
        updateConfirm(){
          console.log(this.scene[0])
          let formdata = new FormData(); 
          formdata.append('title', this.scene[0].title);
          if(this.scene[0].type=='影片'){
            formdata.append('context',this.scene[0].context)
          }
          else{
          formdata.append('file', this.scene[0].file);
          }
          formdata.append('type',this.scene[0].type);
          formdata.append('classID',8);
          let token = localStorage.getItem('token')
          let id = this.scene[0].id;
          api.articleUpdate(token,id,formdata).then(()=>{
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
         Upload(genre, file)
        {
            this.scene[0][genre] = file
        }
    },
    beforeMount(){
      let self = this
      api.getArticleByType(8).then(res=>{
        this.scenes = res.data.articles.reverse()
      }).catch(error=>{
      })
    }
}
</script>

<style>

</style>
