//  1.封装获取地址的promise方法
export function lx_chooseAddress() {
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}
// 2.封装获取用户的当前权限设置
export function lx_getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
//3.封装打开设置的操作
export function lx_openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

//4.弹出对话框给提示
export function lx_showModal() {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: '亲,您确认要将商品移出购物车吗?',
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}