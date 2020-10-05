import request from '../utils/request.js';
export function _getAddress({uid}) { //拿用户地址列表

    const url = '/address/list'

       return request.get(url,{
           params:{uid}
       })
}
export function _addAdress(values) { //拿用户地址列表

    const url = '/address/add'

       return request.post(url,values)
}

export function _editAdressh(values) { //拿用户地址列表

    const url = '/address/edit'

       return request.post(url,values)
}
export function _delAddress({aid}) { //拿用户地址列表

    const url = '/address/del'

       return request.delete(url,{
        params:{aid}
       })
}