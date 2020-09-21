import { lx_chooseAddress, lx_getSetting, lx_openSetting, lx_showModal } from '../../utils/util'
Page({
  data: {
    address:{},
    cart:[],
    totalNum:0,
    totalPrice:0,
    checkedAll:true
  },
  onLoad() {
    //5.尝试获取第4步存的数据
    const address = wx.getStorageSync('address')
    if (!address) return
    this.setData({
      address
    })
  },
  onShow() {
    this.getCartData() // 获取购物车信息,写在onload里面只有进来时会更新
  },
  //  1.点击按钮选择地址,但是一进来先询问获取权限
  async chooseAddressBtn() {
    const result = await lx_getSetting()
    const state = result.authSetting['scope.address']
    if (state === false) {
    // 2.拒绝获取权限,给用户可以再次选择的机会,打开设置,让用户可以再选择
      const r = await lx_openSetting()
      if (r.authSetting['scope.address']) {
        wx.showToast({
          title: '授权成功',
        })
      }
    } else {
      //  3.获取权限了,执行选择地址的操作
      this.chooseAddress()
    }
  },
  async chooseAddress() {
    try {
      const res = await lx_chooseAddress()
      res.fullAddress = res.provinceName + res.cityName + res.countyName + res.detailInfo
      this.setData({
        address: res
      })
      //  4.拿到地址往内存里存一份,一进来在钩子函数里尝试获取.
      wx.setStorageSync('address', res)
    } catch(err) {
      console.log(err);
    }
  },
  // 6.从内存中将之前存的购物车信息取出来
  getCartData() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      cart
    })
    this.getTotalCount() //获取商品的数量和总价格,要写在购物车里信息更新之后
  },
  //7.封装获取数量和总价的方法
  getTotalCount() {
    const { cart } = this.data
    let totalNum=0
    let totalPrice=0
    let checkedAll = true
    cart.forEach(item=>{
      if (item.isChecked) {
        totalNum += item.num
        totalPrice += item.num * item.goods_price
      } else {
        // 10.5 对改变全选总按钮的状态的补充
        checkedAll = false
      }
    })
    checkedAll = cart.length > 0 ? checkedAll : false
    this.setData({
      totalNum,
      totalPrice,
      checkedAll
    })
  },
  //8.加减
  async changeNum(e) {
    const { num, id } =e.currentTarget.dataset
    let { cart } = this.data
    const goods = cart.find(item => item.goods_id === id)
    if (goods.num === 1 && num === -1) {
      const res = await lx_showModal()
      // console.log(res);
      if (res.confirm) {
        cart = cart.filter(item => item.goods_id !== id)
      }
    } else {
       goods.num += num
    }
    this.setData({
      cart
    }),
    this.getTotalCount()
  },
  // 9.改变单个按钮的状态
  change(e) {
    // console.log(e.currentTarget.dataset.id);
    const id = e.currentTarget.dataset.id
    let { cart } = this.data
    const obj= cart.find(item => item.goods_id === id)
    obj.isChecked = !obj.isChecked
    this.setData({
      cart
    })
    this.getTotalCount()
  },
  // 10.改变全选总按钮的状态
  changeAll() {
    let { cart, checkedAll } = this.data
    checkedAll = !checkedAll
    cart.forEach(item => item.isChecked = checkedAll)
    this.setData({
      cart,
      checkedAll
    })
    this.getTotalCount()
  },
  // 11.隐藏页面时或者关闭页面时,都要把购物车数据重新存
  onHide() {
    wx.setStorageSync('cart', this.data.cart)
  },
  onUnload() {
    wx.setStorageSync('cart', this.data.cart)
  },
  // 12.点击结算,先判断,有商品有地址让去结算页面
  gotoPay() {
    const { cart, address } = this.data
    const cart2 = cart.filter(item=>item.isChecked)
    if (cart2.length === 0) {
      wx.showToast({
        title: '你tm没有选商品',
      })
      return 
    }
    if (!address.userName) {
      wx.showToast({
        title: '选地址啊,你',
      })
      return 
    }
    wx.navigateTo({
      url:"/pages/pay/pay"
    })
  }
})