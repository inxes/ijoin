// pages/map/map.js
var amapFile = require('..­/..­/libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var markersData = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        textData: {}
    },

    makertap: function (e) {
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(markersData, id);
        that.changeMarkerColor(markersData, id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({ key: '0bddd43df727459270da5b31d56c33f2' });
        myAmapFun.getPoiAround({
            iconPathSelected: '..­/..­/images/marker_checked.png', //如：..­/..­/img/marker_checked.png
            iconPath: '..­/..­/images/marker.png', //如：..­/..­/img/marker.png
            success: function (data) {
                markersData = data.markers;
                that.setData({
                    markers: markersData
                });
                that.setData({
                    latitude: markersData[0].latitude
                });
                that.setData({
                    longitude: markersData[0].longitude
                });
                that.showMarkerInfo(markersData, 0);
            },
            fail: function (info) {
                wx.showModal({ title: info.errMsg })
            }
        })
    },

    bindInput: function (e) {
        var that = this;
        var keywords = e.detail.value;
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: '0bddd43df727459270da5b31d56c33f2' });
        myAmapFun.getInputtips({
            keywords: keywords,
            location: '',
            success: function (data) {
                if (data && data.tips) {
                    that.setData({
                        tips: data.tips
                    });
                }

            }
        })
    },

    bindSearch: function (e) {
        var keywords = e.target.dataset.keywords;
        var url = '../poi/poi?keywords=' + keywords;
        console.log(url)
        wx.redirectTo({
            url: url
        })
    },

    changeMarkerColor: function (data, i) {
        var that = this;
        var markers = [];
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
                data[j].iconPath = "..­/..­/images/marker_checked.png"; //如：..­/..­/img/marker_checked.png
            } else {
                data[j].iconPath = "..­/..­/images/marker.png"; //如：..­/..­/img/marker.png
            }
            markers.push(data[j]);
        }
        that.setData({
            markers: markers
        });
    },

    showMarkerInfo: function (data, i) {
        var that = this;
        that.setData({
            textData: {
                name: data[i].name,
                desc: data[i].address
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