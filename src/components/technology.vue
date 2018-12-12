<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>技術園地</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="technology[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                    <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" max-height="100" offset-y light v-model="technology[0].type"></v-select>
             </v-flex>
            <v-flex xs6 offset-xs1>
            <p>內文<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="technology[0]['file']!==null">{{technology[0]['file'].name}}</p>
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
             <v-text-field v-model="technology[0].title" label="標題" class="input-group--focused"></v-text-field>
                </v-flex>
                 <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" max-height="100" offset-y light v-model="technology[0].type"></v-select>
             </v-flex>
                <v-flex xs6 offset-xs1>
             <p>內文<upload-button title="檔案上傳" name="file" accept=".pdf" :selectedCallback="Upload"></upload-button></p>
             <p v-if="technology[0]['file']!==null">{{technology[0]['file'].name}}</p>
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
    :items="technologies"
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
        items:[  '產品操作說明',
                    'FAQ',
                    '人員安全衛生作業要點',
                    '理論彙集',
                    '實作技術',
                    '單位換算器/表',
                    '數據/資料對照表',
                    '技術連結',
                    '研究中議題'],
        technologies: [
          
        ],
        technology:[
            {
            title:'',
            type:'',
            file:null,
            id:''
            }
        ],
        dialog:false,
        dialog2:false,
        dialog3:false,
      }
    },
    methods:{
        create(){
          this.technology[0].title='';
          this.technology[0].type='';
          this.technology[0].id='';
          this.technology[0].file=null;
          console.log(this.technology[0])
        },
        createConfirm(){
          let formdata = new FormData(); 
          formdata.append('title', this.technology[0].title);
          formdata.append('file', this.technology[0].file);
          formdata.append('type',this.technology[0].type);
          formdata.append('classID',7);
          let token = localStorage.getItem('token')
          api.createArticle(token,formdata).then(()=>{
            alert('新增成功')
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        update(){
            this.technology[0].title='',
            this.technology[0].type='',
            this.technology[0].id='',
            this.technology[0].file=null,
            console.log(this.selected[0])
            this.technology[0].title=this.selected[0].title,
            this.technology[0].type=this.selected[0].type,
            this.technology[0].id=this.selected[0].id
        },
        updateConfirm(){
          console.log(this.technology[0])
          let formdata = new FormData(); 
          formdata.append('title', this.technology[0].title);
          formdata.append('file', this.technology[0].file);
          formdata.append('type',this.technology[0].type);
          formdata.append('classID',7);
          let token = localStorage.getItem('token')
          let id = this.technology[0].id;
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
            this.technology[0][genre] = file
        }
    },
    beforeMount(){
      let self = this
      api.getArticleByType(7).then(res=>{
        this.technologies=res.data.articles.reverse()
      }).catch(error=>{
      })
    }
}
</script>

<style>

</style>
