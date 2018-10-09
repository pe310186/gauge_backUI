<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>訂單管理</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="name" label="品牌名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <p>內文<v-btn color="white">檔案上傳</v-btn></p>
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
             <v-text-field v-model="name" label="品牌名稱" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <p>內文<v-btn color="white">檔案上傳</v-btn></p>
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
    :items="orders"
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
      <td >{{ props.item.name }}</td>
      <td>{{props.item.step}}</td>
      <td >{{ props.item.date }}</td>
      <td></td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
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
          { text: '訂購人', value: 'name',sortable: false,},
          { text:'流程',value:'step',sortable:false},
          { text: '日期', value: 'date' ,sortable: false,},
          {text:'訂單內容',value:'detail',sortable:false}
        ],
        orders: [
          {id:'1',name:'123',date:'5678'},
          {id:'2',name:'123143',date:'4567'},
          {id:'3',name:'gh324',date:'456'}
        ],
        steps:['配件/材料','加工','品管','包裝','已出貨'],
        dialog:false,
        dialog2:false,
        dialog3:false,
      }
    },
    methods:{
        create(){

        },
        createConfirm(){

        },
        update(){

        },
        updateConfirm(){

        },
        deleteConfirm(){

        }
    }
}
</script>

<style>

</style>
