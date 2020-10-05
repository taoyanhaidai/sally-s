/*
 * @Author: heinan 
 * @Date: 2019-12-06 13:37:51 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Tu 09:33:15
 */
//一级路由
import Home from '@/containers/home';
import Login from '@/containers/user/login';
import No from '@/containers/404/no'
//二级路由
import First from '@/containers/home/two/first'
import Shop from '@/containers/home/two/shop'
import List from '@/containers/home/two/list'
import Avatar from '@/containers/home/user/avatar'
//三级路由
import Plist from '@/containers/home/two/shop/pList'
import Classify from '@/containers/home/two/sort/classify'
import Comment from '@/containers/home/two/com/comment'
export default [
    {
        path: '/',
        redirect: '/home',
        
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        auth:true,
        children:[
            {
                path:'/home',
                redirect:'/home/first',
            },
            {
                path:'/home/first',
                name:'first',
                component:First
            },
            {
                path:'/home/avatar',
                name:'avatar',
                component:Avatar
            },
            {
                path:'/home/shop',
                name:'shop',
                component:Shop,
                
                children:[
                    {
                        path:'/home/shop',
                        redirect:'/home/shop/plist',
                    },
                    {
                        path:'/home/shop/plist',
                        name:'plist',
                        component:Plist
                    },
                    {
                        path:'/home/shop/classify',
                        name:'classify',
                        component:Classify
                    },
                    {
                        path:'/home/shop/comment',
                        name:'comment',
                        component:Comment
                    }
                ]
            },
            {
                path:'/home/list',
                name:'list',
                component:List
            }
        ]
    }, {
        path: '/user/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/no',
        name: 'no',
        component: No, //无权访问的页面
    }
]