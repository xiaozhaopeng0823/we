import { lx_requestCategoriesData } from '../../request/request'
Page({
  data: {
    CategoriesList:[],
    categorieFirst:[],
    clickId:''//用来操作谁高亮
  },
  onLoad: function () {
    //先看存储中有没有数据.没有就加载,有就使用存储的
    const datas = wx.getStorageSync('data')
    // console.log(datas);
    if (datas) {
      // 判断时间间隔超过了10s,给一个加载的提示框,在重新获取数据
      if ((Date.now() - datas.time)/1000>10) {
        // console.log('过期了');
        this.getcategroyData()
      } else {
          this.setData({
          CategoriesList: datas.cates,
          categorieFirst:datas.cates[0].children
        })
      }
      
    } else {
       this.getcategroyData()
    }
  },
  // 1.获取分类数据
  async getcategroyData() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await lx_requestCategoriesData()
    this.setData({
      CategoriesList:res,
      categorieFirst:res[0].children
    })
    //拿到数据后,将加载的提示关掉
    wx.hideLoading()
    // 2.将res存到存储中,同时把时间也存一下.
    wx.setStorageSync('data', {
      cates:res,
      time:Date.now()
    })
  },
  //3.左边盒子的点击事件，点击后，将id存下来
  changFn(e) {
    this.setData({
      clickId: e.currentTarget.dataset.id,
      // index: e.currentTarget.dataset.index,
      //点击哪个，就拿哪个数据当做第一个去渲染右盒子
      categorieFirst: this.data.CategoriesList[e.currentTarget.dataset.index].children
    })
  }
})