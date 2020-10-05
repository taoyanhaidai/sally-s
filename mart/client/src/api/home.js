import request from '../utils/request.js'

export function _getCarousel() { //拿轮播图信息

    const url = '/carousel/getList'

    return request.get(url)
}
export function _login(values) { //用户名密码登陆的请求

    const url = '/user/login';

    const params = values

    return request.post(url, params)
}
export function _registry(values) { //注册

    const url = '/user/registry';

    const params = values

    return request.post(url, params)
}

export function _codeLogin(values) { //登陆的请求

    const url = '/user/codelogin';

    const params = values

    return request.post(url, params)
}
export function _toBindMobile(values) { //绑定手机号

    const url = '/user/bindmobile';

    const params = values

    return request.post(url, params)
}
export function _getTabList() { //拿一级分类

    const url = '/getTypeList';

    return request.get(url)
}
export function _getProductByOne(values){ //通过一级分类拿数据
    const url = '/product/list';

    const params = values

    return request.get(url, {params})
}
export function _getDetaiData({pid}){
    const url = '/product/:pid'
    const params = {pid}
    return request.get(url, {params})
}
export function _getComment({pid}){
    
    const url = '/comment/list'
    const params = {pid}
    return request.get(url, {params})
}
export function _getTwoList({t_type}){
    const url = '/getSortList'
    const params = {t_type}
    return request.get(url, {params})
}
export function _getUid({token}){
   
    const url = '/user/getUserByToken'
    const params = {token}
    return request.get(url, {params})
}
export function _getUserInfo({uid}){

    const url = '/user/getUserInfo'
    const params = {uid}
    return request.get(url, {params})
}
