<template>
<v-container>
    <v-card-text align="center"><font size="4"><b>訂單管理</b></font></v-card-text>
    <v-layout row>
            <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">新增</v-btn>
            <v-card color="white">
              <v-flex offset-xs1 xs10>
                <br>
                <p>訂購人:
                <v-select attach :items="this.accountItems"  max-height="150" offset-y light v-model="obj.account"></v-select>
                </p>
                <p>商品名稱: <v-text-field v-model="obj.prodName" class="input-group--focused"></v-text-field></p>
                <p>規格
                 <v-dialog v-model="dialog5" width="400" color="#FFFFFF" >
                 <v-btn slot="activator" @click="createSelected" >新增選項</v-btn>
                 <v-card color="white">
                 <br>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格名稱" class="input-group--focused" v-model="spec"></v-text-field>
                 </v-flex>
                 <v-flex xs10 offset-xs1>
                 <v-text-field label="規格" class="input-group--focused" v-model="specOption"></v-text-field>
                 </v-flex>
                 <v-flex offset-xs4>
                     <v-btn  @click.native="dialog5=false" @click="createSelectedConfirm">確認</v-btn>
                 </v-flex>
                 <br>
                 </v-card>
                 </v-dialog>
                 </p>
                 <v-flex v-bind:key=n v-for="n in this.obj['spec'].length">
                 <v-layout row>
                     <v-flex xs3>
                <v-text-field label="規格名稱" class="input-group--focused" v-model="obj['spec'][n-1]"></v-text-field>
                        </v-flex>
                        <v-flex xs5 offset-xs1>
                <v-text-field label="規格" class="input-group--focused"  v-model="obj['specOption'][n-1]"></v-text-field>
                        </v-flex>
                        <v-flex xs2 offset-xs1>
                <v-btn @click="deleteOption(n-1)">刪除</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <p>數量:</p>
                <v-text-field  class="input-group--focused"  v-model="obj.number"></v-text-field>
              </v-flex>
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
import api from '../store/api'
export default {
data () {
      return {
        search: '',
        selected: [],
        accounts:[],
        name:'',
        spec:'',
        specOption:'',
        headers: [
          {
            text: '編號',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: '訂購人', value: 'account',sortable: false,},
          { text:'流程',value:'step',sortable:false},
          { text: '日期', value: 'date' ,sortable: false,},
          {text:'訂單內容',value:'detail',sortable:false}
        ],
        orders: [
          
        ],
        obj:{
          account:'',
          prodName:'',
          spec:[],
          specOption:[],
          step:'',
          stepPer:'',
          number:'',
        },
        accountItems:['13 sdfsdf'],
        steps:['配件/材料','加工','品管','包裝','已出貨'],
        dialog:false,
        dialog2:false,
        dialog3:false,
        dialog5:false,
      }
    },
    methods:{
        create(){
          this.obj.spec=[],
          this.obj.specOption=[],
          this.prodName='',
          this.obj.account='',
          this.obj.step = '配件/材料'
          this.obj.stepPer = 0,
          this.obj.number = 0
        },
        createConfirm(){
          let token = localStorage.getItem('token')
          let d = this.obj.account
          d = d.split(' ')
          let data={
            acID:d[0],
            acName:d[1],
            spec:this.obj.spec,
            specOption:this.obj.specOption,
            prodName:this.obj.prodName,
            state:this.obj.step + ' ' + this.obj.stepPer,
            number:this.obj.number,
          }
          console.log(data)
          api.createOrder(token,data).then(res=>{
            alert('新增成功')
            window.location.reload();
          }).catch(error=>{
            alert(error)
          })
        },
        update(){
           this.obj.account = this.selected[0].account
          prodName.obj.prodName = this.selected[0].prodName
          spec = this.selected[0].spec
          specOption = this.selected[0].specOption
          step = this.selected[0].step
          stepPer = this.selected[0].stepPer
          number = this.selected[0].number
        },
        updateConfirm(){

        },
        deleteConfirm(){

        },
        createSelected(){
            this.spec='';
            this.specOption='';
        },
        createSelectedConfirm(){
            this.obj['spec'][this.obj['spec'].length]=this.spec;
            this.obj['specOption'][this.obj['specOption'].length]=this.specOption;
            this.spec='';
            this.specOption='';
        },
        deleteOption(id){
            this.obj['spec'].splice(id,1)
            this.obj['specOption'].splice(id,1)
        }
    },
    beforeMount(){
      let self = this
      let token = localStorage.getItem('token')
      let data=[];
      api.getAllOrder(token).then(res=>{
        console.log(res.data.orders)
        for(var i=0;i<res.data.orders.length;i++){
          data[i].account = res.data.orders[i].acID + ' ' + res.data.orders[i].acName;
          data[i].prodName = res.data.orders[i].prodName;
          data[i].spec = JSON.parse(res.data.orders[i].spec);
          data[i].specOption = JSON.parse(res.data.orders[i].specOption);
          let d = res.data.orders[i].state;
          d = d.split(' ');
          data[i].step = d[0];
          data[i].stepPer = d[1];
          data[i].number = res.data.orders[i].number
        }
        self.orders = data
      }).catch(error=>{
        alert(error)
      })


      api.getAllAccount(token).then(res=>{
        self.accounts = res.data.accounts;
        var count=0;
        for(var i =0;i<self.accounts.length;i++){
          if(self.accounts[i].id==1 || self.accounts[i].id==2){
            self.accounts.splice(i,1);
            count++;
            i--;
          }
          else{
            self.accountItems[self.accountItems.length] =  self.accounts[i].id + ' ' + self.accounts[i].name
          }
        }
        console.log(self.accountItems)
      }).catch(error=>{
        alert(error)
      })
    }
}
</script>

<style>

</style>
