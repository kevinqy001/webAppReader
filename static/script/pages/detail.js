let id = '';
axios.get('/ajax/book?' + id).then((res)=>{
  new Vue({
     data () {
       return {
         detail: res.data.item
       }
     }
  }).$mount('#root');
});

