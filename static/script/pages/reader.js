new Vue({
  data () {
    return {
      showNav: false,
      showFont: false,
      fictionTitle: '',
      fictionContent: [],
      ChapterCon: null,
      Chapter_id: null,
      Chapter_len: null,
      prefix: "web_reader_"
    }
  },
  methods: {
    toMain () {
      location.href = '/'
    },
    navShow () {
      this.showNav = !this.showNav;
      this.showFont = false;
    },
    windowScroll () {
      this.showNav = false;
      this.showFont = false;
    },
    fontShow () {
      this.showFont = !this.showFont;
    },
    getFictionInfo (chapterCon) {
      axios.get('/ajax/chapter').then((res) => {
        this.Chapter_id = res.data.chapters[chapterCon].chapter_id;
        this.Chapter_len = res.data.chapters.length;
        this.getFictionContent(this.Chapter_id)
      })
    },
    getFictionContent (chapter_id) {
      axios.get('/ajax/chapterData',{
        params: {
          id: chapter_id
        }
      }).then((res) => {
        if (res.data.result === 0) {
          let url = res.data.jsonp;
          $.jsonp({
            url: url,
            cache: true,
            callback: 'duokan_fiction_chapter',
            success: (res) => {
              let data = $.base64.decode(res);
              let json = decodeURIComponent(escape(data));
              let jsonObj = JSON.parse(json);
              this.fictionContent = jsonObj.p;
              this.fictionTitle = jsonObj.t;
            }
          })
        }
      })
    },
    chapterChange (method) {
      if (method === 1 && this.ChapterCon < 4) {
        this.ChapterCon += 1;
        $(window).scrollTop(0);
        localStorage.setItem(this.prefix + "chapter-control", this.ChapterCon)
      } else if (method === -1 && this.ChapterCon > 1) {
        this.ChapterCon -= 1;
        $(window).scrollTop(0);
        localStorage.setItem(this.prefix + "chapter-control", this.ChapterCon)
      }
      this.getFictionInfo(this.ChapterCon);
    },
    setChapterCon () {
      this.ChapterCon = localStorage.getItem(this.prefix + "chapter-control") || 1;
    }

  },
  created () {
    this.setChapterCon();
    this.getFictionInfo(this.ChapterCon);
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('scroll', this.windowScroll);
    })
  },
}).$mount('#root');

(function () {
  const Util = (function () {
    const prefix = "web_reader_";
    const StorageGetter = (key) => {
      return localStorage.getItem(prefix + key);
    };
    const StorageSetter = (key, val) => {
      return localStorage.setItem(prefix + key, val);
    };

    return {
      StorageGetter,
      StorageSetter
    }
  })();

  let initFontSize = parseInt(Util.StorageGetter("font-size")) || 14;
  let curBgColor = Util.StorageGetter("background-color") || "rgb(233,223,199)";
  let modeCon = Util.StorageGetter("mode-control") || true;
  $(".m-read-content").css("font-size", initFontSize);
  $("body").css("background-color", curBgColor);
  $(".bg-container").each(function () {
    let _this = $(this);
    if (_this.css("background-color") === curBgColor) {
      _this.addClass("bg-container-current").siblings().removeClass("bg-container-current");
    }
    if (modeCon) {
      $(".day_button").hide();
      $(".night_button").show();
      modeCon = false
    }
  });

  function main() {
    EventHandler();
  }

  function EventHandler() {
    $("#large-font").click(function () {
      if (initFontSize < 20) {
        initFontSize += 1;
        $(".m-read-content").css("font-size", initFontSize)
      }
      Util.StorageSetter("font-size", initFontSize);
      return false
    });
    $("#small-font").click(function () {
      if (initFontSize > 12) {
        initFontSize -= 1;
        $(".m-read-content").css("font-size", initFontSize)
      }
      Util.StorageSetter("font-size", initFontSize);
      return false
    });
    $(".bg-container").click(function () {
      let _this = $(this);
      _this.addClass("bg-container-current").siblings().removeClass("bg-container-current");
      curBgColor = _this.css("background-color");
      $("body").css("background-color", curBgColor);
      if (_this.index() === 5) {
        modeCon = false;
        $(".night_button").hide();
        $(".day_button").show();
      } else {
        modeCon = true;
        $(".day_button").hide();
        $(".night_button").show();
      }
      Util.StorageSetter("background-color", curBgColor);
      Util.StorageSetter("mode-control", modeCon);
    });
    $(".night_button, .day_button").click(function () {
      if (modeCon) {
        modeCon = false;
        curBgColor = "rgb(5, 8, 13)";
        $("body").css("background-color", curBgColor);
        $(".bg-container").eq(4).addClass("bg-container-current").siblings().removeClass("bg-container-current");
        $(".night_button").hide();
        $(".day_button").show();
        Util.StorageSetter("background-color", curBgColor);
        Util.StorageSetter("mode-control", modeCon);
      } else {
        modeCon = true;
        curBgColor = "rgb(233, 223, 199)";
        $("body").css("background-color", curBgColor);
        $(".bg-container").eq(1).addClass("bg-container-current").siblings().removeClass("bg-container-current");
        $(".day_button").hide();
        $(".night_button").show();
        Util.StorageSetter("background-color", curBgColor);
        Util.StorageSetter("mode-control", modeCon);
      }
    })
  }

  main();
})();
