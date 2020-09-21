import { fetch } from './fetch'
//  1.获取轮播图数据
export function lx_requestSwiperData() {
  return fetch({
    url:'/home/swiperdata'
  })
}

// 2.获取导航数据
export function lx_requestNavData() {
  return fetch({
    url: '/home/catitems'
  })
}

// 3.获取楼层数据
export function lx_requestFloorData() {
  return fetch({
    url: '/home/floordata'
  })
}

// 4.获取所有商品列表
export function lx_requestCategoriesData() {
  return fetch({
    url:"/categories"
  })
}

//5.请求列表的数据
export function lx_requestListData(cid, pagenum=1, pagesize=10) {
  return fetch({
    url:'/goods/search',
    data:{
      cid,
      pagenum,
      pagesize
    }
  })
}

// 6.获取商品详情数据
export function lx_requestGoodsListData(goods_id) {
  return fetch({
    url:'/goods/detail',
    data:{ goods_id }
  })
}