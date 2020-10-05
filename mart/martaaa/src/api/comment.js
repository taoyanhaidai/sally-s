import request from '@/utils/request';
export function _getComList(){
    const url = '/comment/list';
    return request.get(url)
}
export function _editComList(){
    const url = '/comment/edit';
    return request.get(url)
}
export function _addComList({ uid, pid, uphoto, uname, comment, score }){
    const url ='/comment/add';
    return request.post(url,{ uid, pid, uphoto, uname, comment, score })
}
export function _delComList({cid}){ //删除
    const url = '/comment/del';
    return request.delete(url,{
        params:{cid}
    })
}