// 封装发送请求的函数
const baseURL ='https://api-hmugo-web.itheima.net/api/public/v1'
export function fetch(options) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url:baseURL + options.url,
      method:options.method||'get',
      data:options.data,
      dataType:options.dataType||'json',
      success:res=>{
        const { statusCode, data } = res
        if (statusCode===200) {
          resolve(data.message)
        }
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}
