import request from '@/utils/request';

export function _getProductList(){ //拿商品列表
    const url = '/product/getList';
    
    return request.get(url)
}
export function _updateProductList({isUp,pid}){ //更新上下架
    const url = '/product/update';
    
    return request.post(url,{isUp,pid})
}
export function _findProductByKey({keyword,isUp}){ //模糊搜索
    
    const url = '/product/find';
    return request.post(url,{keyword,isUp})
}
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
export function _addProductList(values){ //拿二级分类

    const url = '/product/add';

    return request.post(url,values)
}
export function _editProductList(values){ //编辑数据
 
    const url = '/product/edit';

    return request.post(url,values)
}
export function _delProductlList(values){ //删除数据
    
    const url = '/product/del';

    return request.delete(url,{
        params:values
    })
}
