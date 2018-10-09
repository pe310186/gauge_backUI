<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>相關連結</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="relation[0].title" label="連結名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                    <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" max-height="150" offset-y light v-model="relation[0].type"></v-select>
             </v-flex>
             <v-flex xs6 offset-xs1>
             <v-text-field v-model="relation[0].context" label="連結網址" class="input-group--focused"></v-text-field>
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
             <v-text-field v-model="relation[0].title" label="連結名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                 <v-flex xs6 offset-xs1>
             <v-select attach :items="items" label="類別" max-height="150" offset-y light v-model="relation[0].type"></v-select>
             </v-flex>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="relation[0].context" label="連結網址" class="input-group--focused"></v-text-field>
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
    :items="relations"
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
          { text: '連結名稱', value: 'title',sortable: false, },
          { text: '類別', value: 'type',sortable: false, },
          { text: '修改日期', value: 'date' ,sortable: false,},
        ],
        items:[  '關係網頁連結',
                    '友好網頁連結',
                    '國營事業連結',
                    '工業開發科技園區',
                    '政府機關連結',
                    '砂金源頭',
                    '貿易交易交流',
                    '工作/生活百科',
                    '休閒陶冶',
                    '生活資訊',
                    '企業經營管理連結',
                    '關聯公協會'],
        relations: [
          {id:'1',title:'123',type:'關係網頁連結',date:'5678'},
          {id:'2',title:'123143',type:'友好網頁連結',date:'4567'},
          {id:'3',title:'gh324',type:'工業開發科技園區',date:'456'}
        ],
        relation:[
            {
            title:'',
            id:'',
            type:'',
            context:''
            }
        ],
        dialog:false,
        dialog2:false,
        dialog3:false,
      }
    },
    methods:{
        create(){
          this.relation[0].title='';
          this.relations[0].type='';
          this.relation[0].context='';
        },
        createConfirm(){
          let formdata = new FormData(); 
          formdata.append('title',this.relation[0].title);
          formdata.append('type',this.relation[0].type);
          formdata.append('context',this.relation[0].context);
          formdata.append('classID',9)
          let token = localStorage.getItem('token')
          api.createArticle(token,formdata).then(()=>{
            alert('新增成功')
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        update(){
          console.log(this.selected[0])
            this.relation[0].title='';
            this.relation[0].type='';
            this.relation[0].context='';
            this.relation[0].id='';
            this.relation[0].title=this.selected[0].title;
            this.relation[0].type=this.selected[0].type;
            this.relation[0].context=this.selected[0].context;
            this.relation[0].id=this.selected[0].id
        },
        updateConfirm(){
          let formdata = new FormData(); 
          formdata.append('title',this.relation[0].title);
          formdata.append('type',this.relation[0].type);
          formdata.append('context',this.relation[0].context);
          formdata.append('classID',9);
          let id = this.relation[0].id;
          let token = localStorage.getItem('token');
          api.articleUpdate(token,id,formdata).then(()=>{
            alert('修改成功');
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
        }
    },
    beforeMount(){
      let self=this;
      api.getArticleByType(9).then(res=>{
        self.relations = res.data.articles;
      }).catch(error=>{
        alert(error)
      })
    }
}
</script>

<style>

</style>
