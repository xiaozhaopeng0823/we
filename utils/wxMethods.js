// 封装登录的方法获取code
export function lx_wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}