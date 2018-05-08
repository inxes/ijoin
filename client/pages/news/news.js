// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      flag:0,
      session:'',
      datas:[],
      fires:[],
      like:'',
      status:'',
      search:'',
      searchInfo:[],
      scrollTop:100
  },

    getSearch:function (e) {
        var that = this;
        that.setData({
            search:e.detail.value
        })
        console.log(e.detail.value)
    },

    searchInfos:function () {
      var that = this;
        wx.request({
            url:'https://e5voxyal.qcloud.la/GetArticle/searchArticle',
            method:'POST',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                openid:that.data.session,
                search:that.data.search
            },
            success:function (res) {
                console.log(res.data);
                that.setData({
                    searchInfo:res.data.data,
                    flag:2,
                    currentTab:2
                });
            },
            fail:function (res) {
                wx.showToast({
                    title: '服务器错误！',
                    image:'../../images/icon/error.png',
                    duration: 2000
                })
            }
        })
    },

  switchNav:function(e){
      var page = this;
      var id = e.target.id;
      if(this.data.currentTab === id){
          return false;
      }else{
          page.setData({currentTab:id});
      }
      page.setData({ flag: id });
      console.log(this.data);
  },

    changeTab:function (e) {
        var that = this;
        console.log(e);
        that.setData({
            flag:e.detail.current
        })
    },

  seeDetail:function(e){
      var page = this;
      var id = e.currentTarget.id;
      wx.navigateTo({
          url:'../detail/detail?id='+id
      })
  },

  commentArticle:function (e) {
      var page = this;


  },

    likeArticle:function (e) {
        var page = this;
        var id = e.currentTarget.id;
        var likes = e.currentTarget.dataset.hi;
        var currentIndex = e.currentTarget.dataset.currentindex;
        var pageData = page.data.datas;
        var fireData = page.data.fires;
        var searchData = page.data.searchInfo;
        console.log(currentIndex);
        console.log(pageData[currentIndex]);
        if(likes === 1){
            page.setData({
                status:'minus'
            });
            pageData[currentIndex].like = 0;
            fireData[currentIndex].like = 0;
            if (typeof(searchData[currentIndex].like) !== "undefined"){
                searchData[currentIndex].like = 0;
            }
        }else{
            // page.data.datas[index].like = 1;
            page.setData({
                status:'add'
            });
            pageData[currentIndex].like = 1;
            fireData[currentIndex].like = 1;
            if (typeof(searchData[currentIndex].like) !== "undefined"){
                searchData[currentIndex].like = 1;
            }
        }
        page.setData({
            datas:pageData,
            fires:fireData,
            searchInfo:searchData
        });
        wx.request({
            url:"https://e5voxyal.qcloud.la/GetArticle/likeArticle",
            method:"POST",
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                openid:page.data.session,
                id:id,
                status:page.data.status
            },
            success:function (res) {
                console.log(res.data);
                page.setData({
                    like:id
                })
                console.log(id);
                console.log(page.data.like);
            },
            fail:function (res) {
                wx.showToast({
                    title: '服务器错误！',
                    image:'../../images/icon/error.png',
                    duration: 2000
                })
            }
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      console.log(that.data.searchInfo);
      wx.getStorage({
          key: 'session',
          success: function (res) {
              console.log('session:'+res.data)
              that.setData({
                  session: res.data
              });
              wx.request({
                  url:'https://e5voxyal.qcloud.la/GetArticle',
                  method:'POST',
                  data:{
                      openid:res.data
                  },
                  header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  success:function (result) {
                      console.log(result.data.data.infos);
                      that.setData({
                          datas:result.data.data.infos,
                          fires:result.data.data.fires
                      })
                  }
              });
          }
      });
      that.searchInfos();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})