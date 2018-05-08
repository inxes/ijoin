// pages/add/add.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  el: "#add",

  data: {
      title:'',
      content:'',
      openid:'',
      draft:[],
      haveDraft:'',
      ID:''
  },

    getContent:function (e) {
        var that = this;
        that.setData({
            content:e.detail.value
        })
        console.log(e.detail.value)
    },
    getTitle:function (e) {
        var that = this;
        that.setData({
            title:e.detail.value
        })
        console.log(e.detail.value)
    },
    coverDraft:function (event) {
        var status = event.target.dataset.status;
        wx.request({
            url:'https://e5voxyal.qcloud.la/addArticle/coverDraft',
            method:'POST',
            data:{
                status:status,
                title:this.data.title,
                content:this.data.content,
                ID:this.data.draft.ID
            },
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            success:function (res) {
                if(res.data.code === 1){
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000,
                        success:function (res) {
                            wx.redirectTo({
                                url: '.../news/news'
                            })
                        }
                    })
                }else{
                    wx.showToast({
                        title: '保存失败',
                        image:'../../images/icon/error.png',
                        duration: 2000
                    })
                }
            },
            fail:function (res) {
                wx.showToast({
                    title: '服务器错误！',
                    image:'../../images/icon/error.png',
                    duration: 2000
                })
            }
        });
    },
    addArticle:function (event) {
      var that = this;
        var status = event.target.dataset.status;
        if (this.data.title === '') {
            wx.showToast({
                title: '标题不能为空！',
                image:'../../images/icon/error.png',
                duration: 2000
            })
        } else if (this.data.content === '') {
            wx.showToast({
                title: '内容不能为空！',
                image:'../../images/icon/error.png',
                duration: 2000
            })
        } else {
        wx.request({
            url: 'https://e5voxyal.qcloud.la/addArticle',
            method: 'POST',
            data: {
                title: this.data.title,
                content: this.data.content,
                session: this.data.openid,
                status: status,
                nickname: this.data.userInfo.nickName
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.data.code === 1) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000,
                        success: function (res) {
                            that.setData({
                                content:'',
                                title:''
                            });
                            wx.switchTab({
                                url: '../news/news'
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '保存失败',
                        icon: 'loading',
                        duration: 2000
                    })
                }
            },
            fail:function (res) {
                wx.showToast({
                    title: '服务器错误！',
                    image:'../../images/icon/error.png',
                    duration: 2000
                })
            }
        })
    }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.getUserInfo({
          success: function (res) {
              console.log(res.userInfo)
              that.setData({
                  userInfo: res.userInfo
              })
          }
          //更新数据
      });
      wx.getStorage({
          key: 'session',
          success: function(res) {
              console.log(res)
              console.log('data:'+res.data)
              that.setData({
                  openid:res.data
              })
              console.log('data'+res.data)

              wx.request({
                  url:'https://e5voxyal.qcloud.la/GetDraft',
                  method:'POST',
                  data:{
                      session:res.data
                  },
                  header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  success:function (result) {
                      if(result.data.code === 1){
                          console.log(result.data)
                          that.setData({
                              haveDraft:1//有草稿未提交 编辑状态
                          })
                      }else{
                          that.setData({
                              haveDraft:0//无草稿未提交
                          })
                      }
                      console.log(result.data)
                      that.setData({
                          draft:result.data.data
                      })
                  }
              })

          }
      });
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