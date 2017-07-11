axios.get('/ajax/male').then((res) => {
  new Vue({
    data () {
      return {
        popList: res.data.items[0],
        recoList: res.data.items[1],
        newList: res.data.items[2],
        endList: res.data.items[3]
      }
    }
  }).$mount('#root');
});
