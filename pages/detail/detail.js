import { lx_requestGoodsListData } from '../../request/request'
Page({
  data: {
    detailData:{}
  },
  //  1.用query接收list页面跳转传递过来的参数goods_id,挂载到this上
  onLoad (query) {
    this.goods_id = query.goods_id
    console.log(this.goods_id);
    
    this.getDetailData()
  },
  //  2.发请求拿数据
  async getDetailData() {
    const res = await lx_requestGoodsListData(this.goods_id)
    this.setData({
      detailData:res
    })
  },
  addCart() {  
    //  3.点击加入购物车,收集必要的数据(商品id,商品名称,价格，logo)用于购物车信息的展示,存入存储中
    const { goods_id, goods_name, goods_price, goods_small_logo } = this.data.detailData
    //  4.先尝试去内存中获取,取出来判断看看有没有一样的产品
    const cart = wx.getStorageSync('cart') || [] 
    const goods = cart.find(item => item.goods_id === goods_id)
    if (goods) {
      //  有数据,让num+1,在重新写回去
      goods.num += 1
      wx.setStorageSync('cart', cart)
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      //  没有数据,添加进去,重新写入
      cart.unshift({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        num:1,
        isChecked:true//用来一进入结算默认选中
      })
      wx.setStorageSync('cart', cart)
      //  5.给个轻提示
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
})