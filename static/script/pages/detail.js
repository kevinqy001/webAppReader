let id = '';
axios.get('/ajax/book?id=' + id).then((res)=>{
  new Vue({
     data () {
       return {
         detail: res.data.item
       }
     }
  }).$mount('#root');
});

