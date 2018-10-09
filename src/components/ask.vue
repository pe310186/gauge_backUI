<template>
    <v-container>
        <v-layout row>
    <v-card-text align="center"><font size="4"><b>詢價單</b></font></v-card-text>
    <v-dialog v-model="dialog" width="600"  color="#FFFFFF">
            <v-btn  slot="activator" @click="create">基本設定</v-btn>
            <v-card color="white">
                <br>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="title" label="信件標題" class="input-group--focused">:''</v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="sendEmail" label="寄件信箱" class="input-group--focused"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
             <v-text-field v-model="recieveEmail" label="收件信箱" class="input-group--focused"></v-text-field>
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
                <v-btn @click.native="dialog2=false" @click="deleteConfirm">確認</v-btn>
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
                    <v-flex v-bind:key=n v-for="n in props.item.products.length">
                        <br>
                        <v-layout row> 
                            <v-flex xs3 offset-xs1>
                                <p>商品名稱:{{props.item.products[n-1].name}}</p>
                            </v-flex>
                                <v-layout column="">
                                <v-flex v-bind:key=i v-for="i in props.item.products[n-1].spec.length" xs3 offset-xs1>
                                    <p>規格{{i}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{props.item.products[n-1].spec[i-1]}}:{{props.item.products[n-1].specOption[i-1]}}</p>
                                </v-flex>
                                </v-layout>
                                <v-flex xs3 offset-xs1>
                                <p>數量:{{props.item.products[n-1].number}}</p>
                                </v-flex>
                            </v-layout>
                            <v-flex xs10 offset-xs1>
                            <v-divider></v-divider>
                            </v-flex>
                    </v-flex>
                     <v-flex xs6 offset-xs1>
                         <br>
                    <p>聯絡資訊:</p>  
                    <p>姓名:&nbsp;{{props.item.name}}</p>
                    <p>連絡電話:&nbsp;{{props.item.phone}}</p>
                    <p>E-mail:&nbsp;{{props.item.email}}</p>
                    <p>備註留言:</p>
                    <v-textarea flat v-model="props.item.detail" height="200">
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
export default {
    data(){
        return{
            title:'',
            sendEmail:'',
            recieveEmail:'',
            search: '',
            selected: [],
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

        }
    }
}
</script>

<style>

</style>
