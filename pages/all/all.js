var can;
var stars = [];
/**定义星星 */
var starObj = function () {
  this.x;
  this.y;
  this.picNo;
  this.timer;
}
/**初始化数据 */
starObj.prototype.init = function () {
  this.x = Math.random() * 400;
  this.y = Math.random() * 600;
  this.picNo = 0;
  this.timer = 0;
}
/**生成星星 */
starObj.prototype.draw = function () {
  can.drawImage('../common/images/star.png', this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
}
/**动起来 */
starObj.prototype.undate = function () {
  this.picNo += 1;
  if (this.picNo >= 7) {
    this.picNo = 0;
  }
}
// pages/all/all.js

const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp();
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 100, //生成星星数量
    stars: []  // 星星数组

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    can = wx.createCanvasContext('canvas');
    /* 批量生成星星 并且初始化 */
    for (var i = 0; i < this.data.num; i++) {
      var obj = new starObj();
      stars.push(obj);
      stars[i].init();
    }

    this.gameloop(); //进行
    can.draw();

  },
  /**进行*/
  gameloop() {
    setTimeout(this.gameloop, 300);
    this.drawStars();
  },
  /**生成动起来 **/
  drawStars() {
    for (var i = 0; i < this.data.num; i++) {
      stars[i].undate();
      stars[i].draw();
    }
    can.draw();
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
    this.getcity()
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
  duanzi: function() {
    wx.navigateTo({
      url: '../duanzi/duanzi',
    })
  },
  music: function() {
    wx.navigateTo({
      url: '../music/music',
    })
  },
  news: function() {
    wx.navigateTo({
      url: '../news/news',
    })
  },
  tq: function() {
    const that = this;
    wx.getStorage({
      key: 'city',
      success: function(res) {
        wx.navigateTo({
          url: '../tq/tq',
        })
      },
      fail: function(e) {
        wx.showModal({
          title: '提示',
          content: '拒绝获取位置，只能删了小程序重新下咯',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  video: function() {
    wx.navigateTo({
      url: '../video/video',
    })
  },
  getcity: function() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({
                type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                success: function(res) {
                  const latitude = res.latitude
                  const longitude = res.longitude
                  qqmapsdk = new QQMapWX({
                    key: 'HM2BZ-GT2KF-MOYJW-NJ4QC-OISX7-SPF7H'
                  });
                  qqmapsdk.reverseGeocoder({
                    location: {
                      latitude: latitude,
                      longitude: longitude
                    },
                    success: function(e) {
                      wx.setStorage({
                        key: 'city',
                        data: e.result.address_component.city,
                      })
                    }
                  })
                },
              })
            }
          })
        }
      }
    })
  }
})