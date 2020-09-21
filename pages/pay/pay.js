Page({
  data: {
    address: {},
    cart: [],
    totalNum: 0,
    totalPrice: 0
  },
  onLoad() {
    // 1.一进来加载数据
    let cart = wx.getStorageSync('cart')
    let address = wx.getStorageSync('address')
    this.setData({
      cart,
      address
    })
    this.getTotalCount()
  },
  // 2.计算总价和数量
  getTotalCount() {
    const { cart } = this.data
    let totalNum = 0
    let totalPrice = 0
    cart.forEach(item => {
      totalNum += item.num
      totalPrice += item.num * item.goods_price
    })
    this.setData({
      totalNum,
      totalPrice,
    })
  },
  // 3.点击支付,去付款
  gotoPay() {
    const token = wx.getStorageSync('token')
    if(!token) {
      // 没有token,去授权页走流程获取code,在获取用户信息得到4个关键字,发请求拿token
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    } else {
      // 有token去走支付流程
    }
  }
})