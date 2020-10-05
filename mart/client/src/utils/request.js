//拦截器
import axios from 'axios'
import store from '../store'
const request = axios.create({
    timeout: 5000
})
request.interceptors.request.use(
    config => {

        if ($cookies.get('token')) {
            store.commit('loading',true)
            config.headers['authorization'] = $cookies.get('token');
        }
        return config;
    }, err => {
        return Promise.reject(err)
    }
)

request.interceptors.response.use(config => {
   
 store.commit('loading',false)

    return config
 

}, err => {
    // const { status } = err.response

    
    // 判断响应的状态
    switch (status){
        case 401:
            window.location.href = '/login'
            break;
        
    }
    return Promise.reject(err)
})

export default request