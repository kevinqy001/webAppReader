let id = location.href.split('id=').pop();
axios.get('/ajax/book?id=' + id).then((res)=>{
  new Vue({
     data () {
       return {
         detail: res.data.item
       }
     },
    methods: {
      toReader () {
        location.href = '/reader'
      }
    }
  }).$mount('#root');
});

