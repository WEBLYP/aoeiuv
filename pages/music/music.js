// pages/menu/menu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sname: '',
    sresults: [],
    music: {},
    spop: [],
    flag: 0,
    see: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.pop();
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
  write: function(e) {
    this.setData({
      sname: e.detail.value
    })
  },
  search: function(e) {
    const that = this
    that.setData({
      see: true
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    wx.showLoading({
      title: '搜索中。。。',
    })
    if (e.currentTarget.dataset.title) {
      that.setData({
        sname: e.currentTarget.dataset.title
      })
    }
    wx.request({
      url: encodeURI(app.api + 'searchMusic?name=' + that.data.sname), //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        that.setData({
          sresults: res.data.result
        })
      }
    })
  },
  play: function(e) {
    const data = e.currentTarget.dataset.url
    this.setData({
      music: {
        poster: data.pic,
        name: data.title,
        author: data.author,
        src: data.url
      }
    });
    this.audioCtx.play()
    wx.setNavigationBarTitle({
      title: data.title + '-' + data.author
    })
  },
  audioPlay: function() {
    this.audioCtx.play()
  },
  audioPause: function() {
    this.audioCtx.pause()
  },
  audio14: function() {
    this.audioCtx.seek(14)
  },
  audioStart: function() {
    this.audioCtx.seek(0)
  },
  pop: function() {
    const that = this
    wx.request({
      url: app.api + 'musicRankings', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const hot = res.data.result;
        that.setData({
          spop: res.data.result
        })
      }
    })
  },
  close: function() {
    this.setData({
      see: false
    })
  },
  backhome: function() {
    wx.navigateTo({
      url: '/pages/all/all',
    })
  }
})