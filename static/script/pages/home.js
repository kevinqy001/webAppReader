new Vue({
  data () {
    return {
      headerSearchShow: false,
      vHeaderSearchShow: false
    }
  },
  methods: {
    headerSearchCon () {
      this.headerSearchShow = !this.headerSearchShow;
      setTimeout(() => {
         this.vHeaderSearchShow = !this.vHeaderSearchShow
      },200)
    }
  }
}).$mount('#root');
