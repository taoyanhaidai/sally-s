import request from '@/utils/request';
export function _getOneList(){ //拿一级分类
    
    const url = '/getTypeList';
    return request.get(url)
}
export function _getTwoList({t_type}){ //拿二级分类
    
    const url = '/getSortList';

    return request.get(url,{
        params:{
            t_type
        }
    })
}
export function _delOneSort({tid}){ //删除一级分类
    const url = '/product/type/del';

    return request.delete(url,{
        params:{
            tid
        }
    })
}
export function _delTwoSort({ s_type }){ //删除二级分类
    const url = '/product/sort/del';

    return request.delete(url,{
        params:{
            s_type
        }
    })
}
export function _getTwoListAll(){ //拿二级分类
    
    const url = '/product/getTwoList';
    return request.get(url)
}

export function _addOneList({t_type,t_text}){ //添加一级分类
    const url = '/product/type/add'
    return request.post(url,{t_type,t_text})
}
export function _editOneList({ t_text, t_type, tid }){ //编辑一级分类
    const url = '/product/type/edit'
    return request.put(url,{ t_text, t_type, tid })
}

export function _addTwoList({ s_text, t_type, s_type }){ //添加二级分类
    const url = '/product/sort/add'
    return request.post(url,{ s_text, t_type, s_type })
}

export function _editTwoList({ s_text, t_type, s_type }){ //编辑二级分类
    const url = '/product/sort/edit'
    return request.put(url,{ s_text, t_type, s_type })
}