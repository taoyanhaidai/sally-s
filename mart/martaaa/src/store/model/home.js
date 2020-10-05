/*
 * @Author: heinan 
 * @Date: 2019-12-06 13:59:43 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Su 06:49:32
 */
import { getcarouselList,toLogin,_findIdentity } from '@/api/home';
import { setSession } from '@/utils';
import { routerRedux } from 'dva/router'
export default {
    //命名空间
    namespace: 'home',
    //仓库初始化状态
    state: {
        hometitle: "homepage",
        productList: [],
        token:'',
        uid:''
    },
    reducers: {
        update(state, { type, payload }) {
            return {
                ...state,
                hometitle: payload
            }
        },
        updateProdutList(state, { type, payload }) {
            return {
                ...state,
                productList: payload
            }
        },
        SET_TOKEN(state,{type,payload}){
            return {
                ...state,
                token:payload
            }
        },
        SET_UID(state,{type,payload}){
            return{
                ...state,
                uid:payload
            }
        }
    },
    effects: {
        *getProductList(action, { call, put }) {
            const result = yield call(getcarouselList)
            yield put({ type: 'updateProdutList', payload: result.data.currentUser })
        },
        *toLogin({payload},{call,put}){ //储存token到仓库
         
            const result = yield call(toLogin,payload)
            
            if(result.data.code){
                const identity_id = result.data.result[0].identity_id //身份id
                const res = yield call(_findIdentity,{identity_id}) //查看是否为管理员身份
                yield put({type:'SET_UID',payload:result.data.result[0].uid}) //存储uid
            
                setSession('uid',result.data.result[0].uid)

                if(res.data.result[0].identity_type === 1){ //如果是普通用户
                    yield put(routerRedux.push('/no'))
                }else{
                    setSession('token',result.data.token)
                    yield put(routerRedux.push('/home'))
                    yield put({type:'SET_TOKEN',payload:result.data.token})
                }
            }
        },
       
    }
}