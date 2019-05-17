<template>
    <v-container>
        <v-card-text align="center"><font size="4"><b>產品目錄</b></font></v-card-text>
        <v-layout row>
            <v-dialog v-model="dialog" width="800"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
                <br>
                <v-layout row>
                    <v-flex xs5 offset-xs1>
                <v-layout column>
             <v-text-field v-model="product[0].name" label="產品名稱" class="input-group--focused"></v-text-field>
             <v-select attach :items="items" label="產品類別" offset-y light v-model="product[0].type"></v-select>
             <v-layout row>
             <p>產品圖片 <upload-button title="檔案上傳" name="picture" :selectedCallback="Upload"></upload-button></p>
             <v-flex offset-xs1>
             <p v-if="this.product[0]['picture']!==null">{{this.product[0]['picture'].name}}</p>
             </v-flex>
                 </v-layout>
                 <v-radio-group v-model="product[0].visible" row="">
                <v-radio label="顯示"  value='顯示'></v-radio>
                <v-radio label="隱藏" value='隱藏'></v-radio>
            </v-radio-group>
                </v-layout>
                    </v-flex>
                    <v-flex xs4 offset-xs1>
                <v-img v-bind:src=product.picture contain max-height="200px"></v-img>
                    </v-flex>
                </v-layout>
             <v-layout column>
             <v-flex offset-xs1>
             <p>規格選項
                 <v-dialog v-model="dialog5" width="400" color="#FFFFFF" >
                 <v-btn slot="activator" @click="createSelected" >新增選項</v-btn>
                 <v-card color="white">
                 <br>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格名稱" class="input-group--focused" v-model="spec"></v-text-field>
                 </v-flex>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格選單" class="input-group--focused" hint="請以空白鍵隔開" v-model="specOption"></v-text-field>
                 </v-flex>
                 <v-flex offset-xs4>
                     <v-btn  @click.native="dialog5=false" @click="createSelectedConfirm">確認</v-btn>
                 </v-flex>
                 <br>
                 </v-card>
                 </v-dialog>
             </p>
             <v-flex v-bind:key=n v-for="n in this.product[0]['spec'].length">
                 <v-layout row>
                     <v-flex xs3>
             <v-text-field label="規格名稱" class="input-group--focused" v-model="product[0]['spec'][n-1]"></v-text-field>
                     </v-flex>
                     <v-flex xs5 offset-xs1>
             <v-text-field label="規格選單" class="input-group--focused" hint="請以空白鍵隔開" v-model="product[0]['specOption'][n-1]"></v-text-field>
                     </v-flex>
                     <v-flex xs2 offset-xs1>
             <v-btn @click="deleteOption(n-1)">刪除</v-btn>
                     </v-flex>
                 </v-layout>
             </v-flex>
             <v-layout row>
             <p>產品介紹<upload-button title="檔案上傳" name="introduction" :selectedCallback="Upload"></upload-button></p>
              <v-flex offset-xs1>
             <p v-if="this.product[0]['introduction']!==null">{{this.product[0]['introduction'].name}}</p>
             </v-flex>
             </v-layout>
             <v-layout row>
             <p>產品型錄(供下載用)<upload-button title="檔案上傳" name="download" :selectedCallback="Upload"></upload-button></p>
              <v-flex offset-xs1>
             <p v-if="this.product[0]['download']!==null">{{this.product[0]['download'].name}}</p>
             </v-flex>
             </v-layout>
             <br>
             <v-flex offset-xs3>
            <v-btn @click="createConfirm" color="white" @click.native="dialog = false">確認</v-btn>
             </v-flex>
             </v-flex>
             </v-layout>
             <br>
            </v-card>
            </v-dialog>
           <v-dialog v-model="dialog4" width="300">
            <v-btn slot="activator" v-if="selected.length!==0">刪除</v-btn>
            <v-card color="white">
                <br>
                <v-flex offset-xs2>
                <font size="4">確認刪除已選擇項目?</font>
                </v-flex>
                <br>
                <v-flex offset-xs4>
                <v-btn @click.native="dialog4=false" @click="deleteConfirm">確認</v-btn>
                </v-flex>
                <br>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" width="800"  color="#FFFFFF">
            <v-btn  slot="activator" @click="update" v-if="selected.length==1">修改</v-btn>
            <v-card color="white">
                <br>
                <v-layout row>
                    <v-flex xs5 offset-xs1>
                    <v-layout column>
             <v-text-field v-model="product[0].name" label="產品名稱" class="input-group--focused"></v-text-field>
             <v-select attach :items="items" label="產品類別" offset-y light v-model="product[0].type"></v-select>
                 <v-layout row>
             <p>產品圖片 <upload-button title="檔案上傳" name="picture" :selectedCallback="Upload"></upload-button></p>
              <v-flex offset-xs1>
             <p v-if="this.product[0]['picture']!==null">{{this.product[0]['picture'].name}}</p>
             </v-flex>

                 </v-layout>
             <v-radio-group v-model="product[0].visible" row="">
                <v-radio label="顯示"  value='顯示'></v-radio>
                <v-radio label="隱藏" value='隱藏'></v-radio>
            </v-radio-group>
                    </v-layout>
                    </v-flex>
                    <v-flex xs4 offset-xs1>
                    <v-img :src="product[0].picture" contain max-height="200px"></v-img>
                    </v-flex>
                </v-layout>
            <v-layout column>
             <v-flex offset-xs1>
              <p>規格選項
                 <v-dialog v-model="dialog3" width="400" color="#FFFFFF" >
                 <v-btn slot="activator" @click="createSelected" >新增選項</v-btn>
                 <v-card color="white">
                 <br>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格名稱" class="input-group--focused" v-model="spec"></v-text-field>
                 </v-flex>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格選單" class="input-group--focused" hint="請以空白鍵隔開" v-model="specOption"></v-text-field>
                 </v-flex>
                 <v-flex offset-xs4>
                     <v-btn  @click.native="dialog3=false" @click="createSelectedConfirm">確認</v-btn>
                 </v-flex>
                 <br>
                 </v-card>
                 </v-dialog>
             </p>
             <v-flex v-bind:key=n v-for="n in this.product[0]['spec'].length">
                 <v-layout row>
                       
                     <v-flex xs3>
             <v-text-field label="規格名稱" class="input-group--focused" v-model="product[0]['spec'][n-1]"></v-text-field>
                     </v-flex>
                     <v-flex xs5 offset-xs1>
             <v-text-field label="規格選單" class="input-group--focused" hint="請以空白鍵隔開" v-model="product[0]['specOption'][n-1]"></v-text-field>
                     </v-flex>
                     <v-flex xs2 offset-xs1>
             <v-btn @click="deleteOption(n-1)">刪除</v-btn>
                     </v-flex>
                 </v-layout>
             </v-flex>
             <v-layout row>
             <p>產品介紹<upload-button title="檔案上傳" name="introduction" :selectedCallback="Upload"></upload-button></p>
              <v-flex offset-xs1>
             <p v-if="this.product[0]['introduction']!==null">{{this.product[0]['introduction'].name}}</p>
             </v-flex>
             </v-layout>
             <v-layout row>
             <p>產品型錄(供下載用)<upload-button title="檔案上傳" name="download" :selectedCallback="Upload"></upload-button></p>
              <v-flex offset-xs1>
             <p v-if="this.product[0]['download']!==null">{{this.product[0]['download'].name}}</p>
             </v-flex>
             </v-layout>
             <br>
             <v-flex offset-xs3>
            <v-btn @click="updateConfirm" color="white" @click.native="dialog2 = false">確認</v-btn>
             </v-flex>
             </v-flex>
             </v-layout>
             <br>
            </v-card>
            </v-dialog>
            <v-flex xs3 offset-xs2>
          <v-text-field v-model="search" label="產品搜尋" class="input-group--focused"></v-text-field>
            </v-flex>
            <v-btn small><v-icon>search</v-icon></v-btn>
        </v-layout>
         <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    v-model="selected"
    item-key="id"
    select-all
    :pagination.sync="pagination"
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
      <td>{{props.item.id}}</td>
      <td>{{ props.item.name }}</td>
      <td >{{ props.item.type }}</td>
      <td>{{props.item.visible}}</td>
      <td>{{props.item.initDate}}</td>
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
        dialog:false,//新增
        dialog2:false,//修改
        dialog3:false,//規格選項(修改)
        dialog4:false,//刪除確認
        dialog5:false,//規格選項(新增)
        pagination: {
            sortBy: 'name',
            rowsPerPage: 10
        },
        search: '',
        selected: [],
        spec:'',
        specOption:'',
        headers: [
          { text: '編號',sortable:true,value:'id'},
          { text: '產品名稱',align: 'left',sortable: false, value: 'name'},
          { text: '產品類別', value: 'type', sortable: false, },
          {text:'狀態',value:'visible', sortable:false},
          {text:'上傳日期',value:'initDate',sortable:true},
          { text: '修改日期', value: 'date', sortable: true, }
        ],
        products: [//商品列表
        ],
        type:'',
        items:['指針式壓力錶','類比輸出壓力開關','壓力傳感(送)器','智能型變送器','數位式壓力錶','指針式溫度表','機械式溫度開關','數位溫度表','TC熱電偶','RTD熱電阻','玻璃管溫度計','隔膜','校驗儀器','配件','衍生-F.R.L1~3點組合','衍生-閥類','衍生-液位','衍生-流量','衍生-調整器','衍生-荷重傳感器及變送器','溫度傳感(送)器','機械式壓力開關'],
        product :[ 
            {//新增或修改用
                id:'',
                name:'',
                type:'',
                date:'',
                spec:[],
                specOption:[],
                visible:'',
                picture: '',
                introduction:null,
                download:null,
            },

        ],
      }
    },
    methods:{
        create(){//初始化
            for(var i in this.product[0]){
                if(i=='spec' || i=='specOption'){
                    this.product[0][i]=[];
                }
                else if(i=='picture' || i == 'introduction' || i=='download')
                {
                    this.product[0][i]='';
                }
                else if(i=='visible')
                {
                    this.product[0][i]='顯示';
                }
                else{
                this.product[0][i]='';
                }
            }
        },
        createConfirm(){//新增商品
            let formdata = new FormData()
            let name = ['name', 'type','spec','specOption','visible','picture','introduction','download']
            let token = localStorage.getItem('token')
            for(var i of name){
                if(i=='visible'){
                    if(this.product[0][i]=='顯示'){
                        formdata.append(i,1);
                    }
                    else{
                        formdata.append(i,0)
                    }
                }
                else if(i=='type'){
                    formdata.append(i,this.items.indexOf(this.product[0]['type'])+1);
                }
                else{
                    formdata.append(i,this.product[0][i]);
                }
            }
            api.productCreate(token,formdata).then(res=>{
                alert('新增成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })   
        },
        update(){
             console.log(this.selected)
             for(var i in this.product[0]){
                if(i=='spec' || i=='specOption'){
                    this.product[0][i]=[];
                }
                else if(i=='picture' || i == 'introduction' || i=='download')
                {
                    this.product[0][i]='';
                }
                else if(i=='visible')
                {
                    this.product[0][i]='顯示';
                }
                else{
                this.product[0][i]='';
                }
            }
            for(var i in this.selected[0]){
                if(i=='picture'|| i =='introduction' || i == 'download'){
                    this.product[0][i] = null; 
                }
                else{
                this.product[0][i] = this.selected[0][i]
                }
            }
        },
        updateConfirm(){
            let formdata = new FormData()
            let name = ['name', 'type','spec','specOption','visible','picture','introduction','download']
            let token = localStorage.getItem('token')
            for(var i of name){
                if(i=='visible'){
                    if(this.product[0][i]=='顯示'){
                        formdata.append(i,1);
                    }
                    else{
                        console.log(this.product[0][i])
                        formdata.append(i,0)
                    }
                }
                else if(i=='type'){
                    formdata.append(i,this.items.indexOf(this.product[0]['type'])+1);
                }
                else{
                    formdata.append(i,this.product[0][i]);
                }
            }
             api.productUpdate(token,this.product[0]['id'],formdata).then(res=>{
                //console.log(this.selected[0]);
                alert('更新成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            }) 
        },
        deleteConfirm(){
            var ids=[];
            for(var i in this.selected){
                ids[i]=this.selected[i].id;
            }
            let token = localStorage.getItem('token')
            api.deleteProduct(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })
        },
        createSelected(){
            this.spec='';
            this.specOption='';
        },
        createSelectedConfirm(){
            this.product[0]['spec'][this.product[0]['spec'].length]=this.spec;
            this.product[0]['specOption'][this.product[0]['specOption'].length]=this.specOption;
            this.spec='';
            this.specOption='';
        },
        deleteOption(id){
            this.product[0]['spec'].splice(id,1)
            this.product[0]['specOption'].splice(id,1)
        },
        Upload(genre, file)
        {
            this.product[0][genre] = file;
        }
    },
    beforeMount()
    {
        let self = this
        api.getAllProduct().then(res=>{
            self.products = res.data.products;
            for(var i in self.products){
                var d = self.products[i].spec;
                d = d.split(',')
                if(d[0]==""){
                     self.products[i]['spec'] = []
                }
                else{
                self.products[i]['spec'] = d;
                }
                var D = self.products[i].specOption;
                D = D.split(',')
                if(D[0]==""){
                    self.products[i]['specOption'] = []
                }
                else{
                    self.products[i]['specOption'] = D
                }
                self.products[i]['type'] = self.items[self.products[i]['type']-1]
                var T = this.products[i]['date'].replace('T',' ')
                T = T.split(' ')
                this.products[i]['date'] = T[0]
                if(this.products[i]['visible'] == 1){
                    this.products[i]['visible'] = '顯示'
                }
                else{
                    this.products[i]['visible'] = '隱藏'
                }
            }
        }).catch(error=>{
            window.location.reload();
        })
    }
}
</script>

<style>

</style>
