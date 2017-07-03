axios.get('/ajax/home').then((res)=>{
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();
  new Vue({
    data () {
      return {
        headerSearchShow: false,
        vHeaderSearchShow: false,
        hotList: res.data.items[1].data.data,
        recommendList: res.data.items[2].data.data,
        freeList: res.data.items[5].data.data,
        curTab: true,
        windowWidth,
        windowHeight
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
      },
      toBookDetail (id) {
        location.href = '/detail?id=' + id
      }
    }
  }).$mount('#root');
});

