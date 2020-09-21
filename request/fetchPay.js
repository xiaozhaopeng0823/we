// 封装关于付款的用于发送请求的方法
const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
function fetch(options) {
  return new Promise((resolve, reject)=>{
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'post',
      data: options.data,
      dataType: options.dataType || 'json',
      header: options.header,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}
export function lx_getToken(data) {
  return fetch({
    url: '/users/wxlogin',
    data:data
  })
}