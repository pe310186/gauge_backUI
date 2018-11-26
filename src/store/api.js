import axios from 'axios'

let client = axios.create({
     baseURL:   'http://localhost:3000',
    // baseURL: 'http://210.61.46.101:8787',
    timeout: 60000
})

export default {
    login: function(account,password) {
        return client.post('/account/login', {account: account, password: password})
    },
    register: function(token,data) {
        return client.post('/account/register', {data: data}, {headers:{'Auth': token}})
    },
    checkAccount: function(token){
        return client.post('/account/check', {}, {headers:{'Auth': token}})
    },
    recommendSet:function(data){//人才自薦
        return client.post('/recommend',{data:data})
        
    },
    recommendGet:function(){
        return client.get('./recommend')
    },
    message:function(data){//我要留言
        return client.post('/message',{data:data})
    },
    inquiry:function(token, data){//詢價單
        return client.post('/inquiry',{data:data},{headers:{'Auth': token}})
    },
    productUpdate:function(token,id,data){//更新商品資訊
        let config = {
            headers: {
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.put('/product/'+id ,data,config)
    },
    articleUpdate:function(token, id, data){
        let config = {
            headers: {
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.put('/article/'+id, data, config)
    },
    getProduct:function(id){
        return client.get('/product/product/'+id)
    },
    getAllProduct:function(){
        return client.get('./product')
    },
    productCreate:function(token,data){
        let config = {
            headers: {
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.post('./product/create',data,config)
    },
    deleteProduct:function(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('./product',config)
    },
    sendEmail:function(){
        return client.post('./email')
    },
    getArticleByType:function(type){
        console.log(type);
        return client.get('./article/class/'+type)
    },
    getArticle:function(id){
        return client.get('./article/'+id);
    },
    createArticle:function(token,data){
        let config = {
            headers: {
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.post('./article/create',data,config)
    },
    deleteArticle:function(token,ids){
        console.log(ids)
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('./article',config)
    },
    getAllAccount:function(token){
        return client.get('./account',{headers:{'Auth': token}})
    },
    deleteAccount:function(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('./account',config)
    },
    accountUpdate:function(token,id,data){
        return client.put('/account/'+id,data,{headers:{'Auth':token}})
    },
    getAllApplyAccount:function(token){
        return client.get('/checkaccount',{headers:{'Auth':token}})
    },
    deleteApplyAccount(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('checkaccount',config);
    },
    memberPass: function(token,ids){
        console.log(ids)
        return client.put('/checkaccount',ids,{headers:{'Auth':token}})
    },
    getAsk:function(token){
        return client.get('/inquiry',{headers:{'Auth':token}})
    },
    createOrder:function(token,data){
        return client.post('/order/create',data,{headers:{'Auth':token}})
    },
    getAllOrder:function(token){
        return client.get('/order/all',{headers:{'Auth':token}})
    },
    deleteOrder:function(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('/order',config)
    },
    updateOrder:function(token,id,data){
        return client.put('/order/'+ id,data,{headers:{'Auth':token}})
    },
    getMailSetting(token,type){
        return client.get('/mail/'+type,{headers:{"Auth":token}})
    },
    setMailSetting(token,type,data){
      return client.put('/mail/'+type,data,{headers:{"Auth":token}})  
    },
    deleteAsk(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('/inquiry',config)
    },
    sendNewsletter(token,type,data){
        return client.post('/newsletter/'+type,data,{headers:{"Auth":token}})
    }
}