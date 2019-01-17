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
                <v-select attach :items="accountItems"  max-height="150" offset-y light v-model="obj.account"></v-select>
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
              <v-flex offset-xs1 xs10>
              <br>
              <p>訂購人:&nbsp;{{obj.acName}}</p>
                <p>商品名稱:&nbsp;<v-text-field v-model="obj.prodName" class="input-group--focused"></v-text-field></p>
                <p>流程:</p>
                <v-layout row>
                  <v-flex xs4>
                <v-select attach :items="steps"  max-height="150" offset-y light v-model="obj.step"></v-select>
                  </v-flex>
                  <v-flex xs4 offset-xs1 v-if="obj.step!='已出貨'">
                <v-text-field v-model="obj.stepPer" class="input-group--focused"  suffix="%"></v-text-field>
                  </v-flex>
                </v-layout>
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
             <br>
             <v-flex offset-xs3>
            <v-btn @click="updateConfirm" color="white" @click.native="dialog2 = false">確認</v-btn>
             </v-flex>
             <br>   
              </v-flex>
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
      <td>{{ props.item.id }}</td>
      <td >{{ props.item.acName }}</td>
      <td>{{props.item.step}}&nbsp;{{props.item.stepPer}}%</td>
      <td >{{ props.item.date }}</td>
      <td>
        <v-dialog width="800"  color="#FFFFFF" class="dialogTop" hide-overlay>
            <v-btn  slot="activator">詳細</v-btn>
            <v-card color="white" >
                <br>
                    <font size=4>
                        <font size=5>
                        <v-flex offset-xs5>
                        <b><p>詳細資料</p></b>
                        </v-flex>
                        </font>
                     <v-flex xs6 offset-xs1>
                       <p>商品名稱:{{props.item.prodName}}</p>
                       <p>商品數量:{{props.item.number}}</p>
                       <v-flex v-if="props.item.spec.length !=0">
                         <p>商品規格:</p>
                         <v-flex  v-bind:key=n v-for="n in props.item.spec.length">
                         <p>{{n}}.&nbsp;{{props.item.spec[n-1]}}:&nbsp;&nbsp;{{props.item.specOption[n-1]}}</p>
                         </v-flex>
                       </v-flex>
                      </v-flex>
                </font>
             <br>   
            </v-card>
            </v-dialog></td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
import api from '../store/api'
export default {
data () {
      return {
        pagination: {
            sortBy: 'name',
            rowsPerPage: 10
        },
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
          { text: '訂購人', value: 'acName',sortable: false,},
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
        accountItems:[],
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
          let t = ""
          for(var i=0;i<this.obj.spec.length;i++){
            if(i != this.obj.spec.length-1){
              t = t + this.obj.spec[i] + ","
            }
            else{
              t = t + this.obj.spec[i]
            }
          }
          let T = ""
          for(var i=0;i<this.obj.specOption.length;i++){
            if(i != this.obj.specOption.length-1){
              T = T + this.obj.specOption[i] + ","
            }
            else{
              T = T + this.obj.specOption[i]
            }
          }
          let data={
            acID:d[0],
            acName:d[1],
            spec:t,
            specOption:T,
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
          this.obj.prodName = this.selected[0].prodName
          this.obj.spec = this.selected[0].spec
          this.obj.specOption = this.selected[0].specOption
          this.obj.step = this.selected[0].step
          this.obj.stepPer = this.selected[0].stepPer
          this.obj.number = this.selected[0].number
          this.obj.id  = this.selected[0].id
          this.obj.acName = this.selected[0].acName
        },
        updateConfirm(){
          let token = localStorage.getItem('token')
          let id = this.obj.id
          let d = this.obj.account
          d = d.split(' ')
          let t = ""
          for(var i=0;i<this.obj.spec.length;i++){
            if(i != this.obj.spec.length-1){
              t = t + this.obj.spec[i] + ","
            }
            else{
              t = t + this.obj.spec[i]
            }
          }
          let T = ""
          for(var i=0;i<this.obj.specOption.length;i++){
            if(i != this.obj.specOption.length-1){
              T = T + this.obj.specOption[i] + ","
            }
            else{
              T = T + this.obj.specOption[i]
            }
          }
          let data={
            acID:d[0],
            acName:d[1],
            spec:t,
            specOption:T,
            prodName:this.obj.prodName,
            state:this.obj.step + ' ' + this.obj.stepPer,
            number:this.obj.number,
          }
          api.updateOrder(token,id,data).then(res=>{
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
            api.deleteOrder(token,ids).then(res=>{
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
        for(var i=0;i<res.data.orders.length;i++){
            let t = {
            account: ""
          }
          t.account = res.data.orders[i].acID + ' ' + res.data.orders[i].acName;
          t.prodName = res.data.orders[i].prodName;
          t.acName = res.data.orders[i].acName
          let s = res.data.orders[i].spec
          let S = res.data.orders[i].specOption  
          s = s.split(',')
          S = S.split(',')
          if(s.length==1 && s[0]==''){
              s = []
          }
          if(S.length==1 && S[0] == ''){
              S = []
          }
          t.spec = s
          t.specOption = S
          let d = res.data.orders[i].state;
          d = d.split(' ');
          t.step = d[0];
          t.stepPer = d[1];
          t.number = res.data.orders[i].number
          t.date = res.data.orders[i].date
          t.id = res.data.orders[i].id
          data.push(t)
        }
        self.orders = data.reverse()
      }).catch(error=>{
      })


      api.getAllAccount(token).then(res=>{
        self.accounts = res.data.accounts;
        var count=0;
        let arr = [];
        for(var i =0;i<self.accounts.length;i++){
          if(self.accounts[i].id==1 || self.accounts[i].id==2){
            self.accounts.splice(i,1);
            count++;
            i--;
          }
          else{
            arr.push(self.accounts[i].id + ' ' + self.accounts[i].name);
          }
        }
        self.accountItems = arr;
      }).catch(error=>{
      })
    }
}
</script>

<style>

</style>
