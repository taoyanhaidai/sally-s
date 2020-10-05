import request from '../utils/request.js'
export function _searchPro({value}) { //搜索商品

    const url = '/product/findByValue'

    return request.get(url,{
        params:{
            value
        }
    })
}