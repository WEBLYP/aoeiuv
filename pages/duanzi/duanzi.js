// pages/duanzi/duanzi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    sresults: [],
    fresh: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
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
  onPullDownRefresh: function (e) {
    const that = this
    wx.showLoading({
      title: '刷新中。。。',
    })
    that.getdata();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    const that = this
    that.setData({
      page: that.data.page + 1
    })
    wx.showLoading({
      title: '加载中。。。',
    })
    that.getdata();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getdata:function(){
    const that = this
    wx.request({
      url: encodeURI(app.api + 'getJoke?page=' + that.data.page),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(e){
        that.setData({
          sresults: that.data.sresults.concat(e.data.result),
          fresh: false
        })
        wx.stopPullDownRefresh();
        wx.hideLoading()
      },
      error:function(){
        that.setData({
          page: that.data.page - 1
        })
        that.getdata();
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  play:function(e){
    const sid = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: './dz/dz?sid=' + sid,
    })
  },
  backhome: function () {
    wx.navigateTo({
      url: '/pages/all/all',
    })
  }
})