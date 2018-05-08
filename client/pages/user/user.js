Page({
  data: {
    motto: '欢迎！',
    userInfo: {}
    // text:"这是一个页面"
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


    deleteArticle:function (e) {
        var page = this;
        var id = e.currentTarget.id;
        console.log(id);
        wx.showModal({
            title: '提示',
            content: '是否删除？',
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url:'https://e5voxyal.qcloud.la/GetArticle/deleteArticle',
                        method:'POST',
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        data:{
                            id:id
                        },
                        success:function (res) {
                            console.log(res.data);
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            });
                            page.onLoad();
                        }
                    })
                } else if (res.cancel) {
                    wx.showToast({
                        title: '取消删除',
                        icon: 'success',
                        duration: 2000
                    })
                }
            }
        })
    },


  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo
        })
      }
      //更新数据
    });
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
        key: 'session',
        success: function (res) {

          wx.request({
              url:'https://e5voxyal.qcloud.la/GetArticle/myArticle',
              method:"POST",
              header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              data:{
                  openid:res.data
              },
              success:function (result) {
                  console.log(result.data.data)
                  that.setData({
                      myArticle:result.data.data
                  });
              }
          })
        }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})