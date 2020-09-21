import { lx_requestListData } from '../../request/request'
Page({
  data: {
    id:'',
    tabs: [
      { id: 1, title: '综合', isActive: true },
      { id: 2, title: '销量', isActive: false },
      { id: 3, title: '价格', isActive: false }
    ],
    pagenum:1,
    pagesize:10,
    goodsList:[],
    hasMore:true
  },
  onLoad: function (query) {
    //1.获取从分类页面传递过来的参数cat_id,发请求,获取应该显示哪些数据
    this.setData({
      id:query.id
    })
    wx.setNavigationBarTitle({
      title: query.title,
    })
    this.getList()
  },
  changeFn(e) {
    //2.拿到了tabs子组件传递过来的值,用来修改显示哪个tab栏
    // console.log(e.detail);
    const newArray = [...this.data.tabs]
    newArray.forEach(item=>{
      if (item.id === e.detail) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      tabs: newArray
    })
  },
  // 3. 根据分类页面传递过来的id发送请求,获取数据
  async getList() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const res = await lx_requestListData(this.data.id, this.data.pagenum)
    // console.log(res);
    const { goods,total } = res
    //拿到结果后判断还有没有更多数据,没有了就让hasMore的值为false,让触底事件结束
    const hasMore = this.data.pagenum< Math.ceil(total/10)? true : false
    this.setData({
      goodsList: [...this.data.goodsList, ...goods],
      hasMore
    })
    wx.hideLoading()
  },
  //4.监听用户下拉动作,数据重置,重新发送请求加载10条
  onPullDownRefresh: function () {
    this.setData({
      pagenum: 1,
      pagesize: 10,
      goodsList: [],
      hasMore: true
    })
    this.getList()
  },
  // 5.页面触底事件的处理函数
  onReachBottom: function () {
    if (this.data.hasMore) {
        this.setData({
        pagenum: this.data.pagenum + 1
      })
      this.getList()
    } 
    // else {
    //   console.log('没有更多数据了');
    // }
  }
})