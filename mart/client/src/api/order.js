import request from '../utils/request.js';

export function _addOrder({ list, aid, uid, summary, total, status }) { //拿用户地址列表

    const url = '/order/add'

    return request.post(url, { list, aid, uid, summary, total, status })
}
export function _getawaitPay(values) { //拿用户地址列表

    const url = '/order/list'

    return request.get(url, {
        params: values
    })
}
