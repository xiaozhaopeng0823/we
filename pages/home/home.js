import { lx_requestSwiperData, lx_requestNavData, lx_requestFloorData } from '../../request/request'
Page({
  data: {
    swiperData:[],
    navData:[],
    floorData:[],
    isShow:true
  },
  onLoad: function (options) {
    this.getSwiperDate(),
    this.getNavDate(),
    this.getFloorData()
    //判断滚动的距离大于300,让回到顶部的框显示
  },
  onPageScroll(e) {
    // console.log(e);
    if (e.scrollTop>300) {
      this.setData({
        isShow:false
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  //1.获取轮播图数据
  async getSwiperDate() {
    const res = await lx_requestSwiperData()
    // console.log(res);
    this.setData({
      swiperData:res
    })
  },
  //2.获取导航数据
  async getNavDate() {
    const res = await lx_requestNavData()
    // console.log(res);
    this.setData({
      navData: res
    })
  },
  //3.获取楼层数据
  async getFloorData() {
    const res = await lx_requestFloorData()
    // console.log(res);
    this.setData({
      floorData: res
    })
  },
  //4.回到顶部
  gotop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})