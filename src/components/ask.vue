<template>
    <v-container>
        <v-layout row>
    <v-card-text align="center"><font size="4"><b>詢價單</b></font></v-card-text>
    <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" >基本設定</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="title" label="信件標題" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="recieveEmail" label="收件信箱" class="input-group--focused" hint="若有多筆請以,隔開"></v-text-field>
                </v-flex>
             <v-flex offset-xs3>
            <v-btn @click="save" color="white" @click.native="dialog = false">儲存</v-btn>
             </v-flex>
             <br>   
            </v-card>
            </v-dialog>
        </v-layout>
        <v-layout row>
           <v-dialog v-model="dialog2" width="300">
            <v-btn slot="activator" v-if="selected.length!=0">刪除</v-btn>
            <v-card color="white">
                <br>
                <v-flex offset-xs2>
                <font size="4">確認刪除已選擇項目?</font>
                </v-flex>
                <br>
                <v-flex offset-xs4>
                <v-btn @click.native="dialog2=false" @click="deleteConfirm()">確認</v-btn>
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
    :items="asks"
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
      <td >{{ props.item.name }}</td>
      <td >{{ props.item.phone }}</td>
      <td >{{ props.item.email }}</td>
      <td >{{ props.item.date }}</td>
      <td><v-dialog width="800"  color="#FFFFFF">
            <v-btn  slot="activator">詳細</v-btn>
            <v-card color="white" >
                <br>
                    <font size=4>
                        <font size=5>
                        <v-flex offset-xs5>
                        <b><p>詳細資料</p></b>
                        </v-flex>
                        </font>
                        <v-flex xs10 offset-xs1>
                    <v-data-table
            color= "white"
            :headers="detailHeaders"
            :items="props.item.detail"
            class="elevation-1"
            hide-actions
            light
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
      <td class="text-xs-center"> {{props.item.name}} </td>
      <td class="text-xs-center"><v-img contain max-height="100px" v-bind:src=props.item.picture></v-img></td>
      <td class="text-xs-center"><v-flex v-bind:key=n v-for="n in props.item.spec.length"><p v-if="props.item.spec[n-1]!== null">{{props.item.spec[n-1]}}:{{props.item.specOption[n-1]}}</p></v-flex></td>
      <td class="text-xs-center">{{props.item.amount}}</td>
      <td class="text-xe-center">{{props.item.message}}</td>
    </template>
  </v-data-table>
                        </v-flex>
                     <v-flex xs6 offset-xs1>
                         <br>
                    <p>聯絡資訊:</p>  
                    <p>姓名:&nbsp;{{props.item.name}}</p>
                    <p>連絡電話:&nbsp;{{props.item.phone}}</p>
                    <p>E-mail:&nbsp;{{props.item.email}}</p>
                    <p>備註留言:</p>
                    <v-textarea flat v-model="props.item.message" height="200">
                    </v-textarea>
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
    data(){
        return{
          pagination: {
            sortBy: 'name',
            rowsPerPage: 10
        },
            title:'',
            recieveEmail:'',
            search: '',
            selected: [],
            detailHeaders:[{text: '商品名稱',align: 'center',sortable: false,value: 'name'},
            {text: '商品圖片',align: 'center',sortable: false,value: 'picture'},
            {text: '規格',align: 'center',sortable: false,value: 'detail'},
            {text: '數量',align: 'center',sortable: false,value: 'number'},
            {text: '備註',align: 'center',sortable: false,value: 'message'}],
        headers: [
          {
            text: '編號',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: '姓名', value: 'name',sortable: false, },
          {text: '連絡電話' ,value:'phone',sortable:false},
          {text:'E-mail',value:'email',sortable:false},
          { text: '日期', value: 'date' ,sortable: false,},
          {text:'詳細',value:'detail',sortable:false}
        ],
        asks: [
        ],
        dialog:false,
        dialog2:false,
        dialog3:false,
        dialog4:false,
      }
    },
    methods:{
        save(){
          let token = localStorage.getItem('token')
          let data={
          }
          data.title = this.title
          data.reciever = this.recieveEmail
          api.setMailSetting(token,'ask',data).then(res=>{
            alert("設定成功")
            window.location.reload()
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
            api.deleteAsk(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })
        },
    },
    beforeMount(){
        let self = this
        let token = localStorage.getItem('token')
        api.getAsk(token).then(res=>{
            console.log(res)
            self.asks = res.data.inquirys.reverse()
            for(var i=0;i< self.asks.length;i++){
                self.asks[i].detail = JSON.parse(self.asks[i].detail)
            }
        }).catch(error=>{
        })

        api.getMailSetting(token,'ask').then(res=>{
          self.title = res.data.setting.title
          self.recieveEmail = res.data.setting.reciever
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
