// pages/tq/tq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    smore: [],
    ganmao: '',
    scity: '',
    wendu: '',
    see: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        })
        wx.setNavigationBarTitle({
          title: '本地：'+res.data,
        })
        that.getweather()
      },
    })
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

  },
  getweather: function () {
    const that = this
    wx.request({
      url: encodeURI('https://www.apiopen.top/weatherApi?city=' + that.data.city) ,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (e) {
        const sweather = e.data.data
        that.setData({
          smore: sweather.forecast,
          scity: sweather.city,
          wendu: sweather.wendu,
          ganmao: sweather.ganmao
        })
      }
    })
  },
  write: function (e) {
    this.setData({
      city: e.detail.value
    })
  },
  search:function(){
    this.getweather()
    this.setData({
      see: true
    })
  },
  close:function(){
    const that = this
    wx.getStorage({
      key: 'city',
      success: function(res) {
        that.setData({
          city: res.data,
          see: false
        })
        that.getweather()
      }
    })
  }
})