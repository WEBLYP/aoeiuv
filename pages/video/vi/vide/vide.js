// pages/video/vi/vide/vide.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    oldid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.request({
      url: encodeURI(app.api + 'videoRecommend?id=' + options.id),
      success: function(e) {
        that.setData({
          res: e.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  play: function(e) {
    const that = this
    if (that.data.oldid == null) {
      that.setData({
        oldid: e.currentTarget.id
      })
      that.videoContext = wx.createVideoContext(e.currentTarget.id)
      that.videoContext.play()
    } else {
      if (that.data.oldid !== e.currentTarget.id) {
        that.videoContext.pause();
        that.videoContext = wx.createVideoContext(e.currentTarget.id)
        that.videoContext.play();
        that.setData({
          oldid: e.currentTarget.id
        })
      }
    }
  },
  next: function(e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    that.videoContext.exitFullScreen();
    if (index < that.data.res.length - 1 && that.data.res[index + 1].data.playUrl) {
      that.videoContext = wx.createVideoContext('myVideo' + that.data.res[index + 1].data.id);
      that.videoContext.play();
    } else {
      that.videoContext.pause();
    }

  }
})