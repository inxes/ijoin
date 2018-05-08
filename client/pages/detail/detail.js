// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      comment:'',
      openId:'',
      article:[],
      comments:[]
  },

    getComment:function (e) {
        var that = this;
        that.setData({
            comment:e.detail.value
        })
        console.log(e.detail.value)
    },

  commentArticle:function (e) {
      var that = this;
      wx.request({
          url:'https://e5voxyal.qcloud.la/AddArticle/AddComment',
          method:'POST',
          header:{
              'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
              id:that.data.id,
              comment:that.data.comment,
              author:that.data.openId
          },
          success:function (res) {
              console.log(res.data.data);
              that.setData({
                  comment:''
              });
              wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
              })
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
      that.setData({
          id:options.id
      })
      console.log(options);
      wx.request({
          url:'https://e5voxyal.qcloud.la/GetArticle/oneArticle',
          method:'POST',
          header:{
              'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
              id:options.id
          },
          success:function (res) {
              that.setData({
                  article:res.data.data
              });
              console.log(res.data)
          },
          fail:function (res) {
              wx.showToast({
                  title: '服务器错误！',
                  image:'../../images/icon/error.png',
                  duration: 2000
              })
          }
      });
      wx.request({
          url:'https://e5voxyal.qcloud.la/Comment/showComment',
          method:'POST',
          header:{
              'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
              id:options.id
          },
          success:function (res) {
              console.log(res.data);
              that.setData({
                  comments:res.data.data
              })
          }
      });
      wx.getStorage({
          key: 'session',
          success: function (res) {
              that.setData({
                  openId:res.data
              })
          }
      })
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