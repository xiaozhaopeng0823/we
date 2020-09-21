import { lx_wxLogin } from '../../utils/wxMethods'
import { lx_getToken } from '../../request/fetchPay'
Page({
  async onLoad() {
    // 1.一进来先用wx.login()获得code
    const res = await lx_wxLogin()
    this.code = res.code
    // 2.这个code, 5分钟会过期, 所以如果用户在这个支付页, 5分钟不动, 我们需要更新code
    this.timeId = setInterval(async () => {
      const res = await jp_wxLogin()
      this.code = res.code
    }, 1000 * 60 * 5)
  },
  onUnload() {
    clearInterval(timeId)
  },
    // 3.点击获取用户信息拿另外的四个参数,发请求
  async getUserInfo(e) {
    console.log(e);
    const { encryptedData, iv, rawData, signature } = e.detail
    console.log(encryptedData, iv, rawData, signature );
    const data = {
      encryptedData,
      iv,
      rawData,
      signature,
      code:this.code
    }
    const res = await lx_getToken(data)
    console.log(res);
  }
})