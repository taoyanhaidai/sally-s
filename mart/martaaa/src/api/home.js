/*
 * @Author: heinan 
 * @Date: 2019-12-06 13:41:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Tu 09:10:01
 */
import request from '@/utils/request';
import { getSession } from '@/utils';
export function getcarouselList() {
    const url = '';
    return request.get(url);
}
export function toLogin(values){
    const url = '/user/login';
    return request.post(url,values)
}
export function toRegistry(values){
    const url = '/user/registry';
    return request.post(url,values)
}

export function _getCarouselList({page,pageSize}){
    const url = '/carousel/list';
    const params = {page,pageSize}
    return request.get(url,{params})
}
export function _delCarouselList({cid}){
    const url = '/carousel/del';
    const params = {cid}
    return request.delete(url,{params})
}
export function _addCarouselList({tit, start_time, end_time, img}){
    const url = '/carousel/add';
    
    return request.post(url,{tit, start_time, end_time, img})
}

export function _getUserByToken({token}){ //通过token拿用户id
    const url = '/user/getUserByToken';
    const params = {token}
    return request.get(url,{params})
}
export function _getInfoByUid({uid}){ //通过uid拿用户信息
    const url = '/user/getUserInfo';
    const params = {uid}
    return request.get(url,{params})
}
export function _getDefaultValue({cid}){ //拿默认数据
    const url = '/carousel/getDefaultData';
    const params = {cid}
    return request.get(url,{params})
}
export function _editCar({cid,tit,img,type}){

    const url = '/carousel/edit';
//    console.log({cid,tit,img,type})
   const body = {cid,tit,img,type}
    return request.post(url,body)
}
export function _findIdentity({identity_id}){ //查找用户的登录身份
    const url = '/user/getIdentity';
    return request.post(url,{identity_id})
}
export function _userUpload(values){ //头像上传
 
    const url = `/user/upload?uid=${getSession('uid')}`;
    return request.post(url,values)

}