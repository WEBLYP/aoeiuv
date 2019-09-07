// pages/video/vi/vi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sresults: []

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
      url: encodeURI(app.api + 'videoCategoryDetails?id=' + options.id),
      success: function(e) {
        that.setData({
          sresults: e.data.result
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
    wx.navigateTo({
      url: './vide/vide?id=' + e.currentTarget.id + '&title=' + e.currentTarget.dataset.title,
    })
  }
})