axios.get('/ajax/home').then((res)=>{
  new Vue({
    data () {
      return {
        headerSearchShow: false,
        vHeaderSearchShow: false,
        recommendList: res.data.items[2].data.data,
        freeList: res.data.items[5].data.data,
        curTab: true,
      }
    },
    methods: {
      headerSearchCon () {
        this.headerSearchShow = !this.headerSearchShow;
        setTimeout(() => {
          this.vHeaderSearchShow = !this.vHeaderSearchShow
        },200)
      },
      changeTab (way) {
        this.curTab = way !== 1;
      }
    }
  }).$mount('#root');
});

