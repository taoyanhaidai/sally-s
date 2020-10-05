import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/index/Home.vue'
import Login from '../views/login.vue'
import Detail from '../views/detail.vue'
import Position from '../views/position.vue'
import Registry from '../views/registry.vue'
import Search from '../views/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/index/home',
    children: [
      {
        path: '/index/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/index/classify',
        name: 'Classify',
        component: () => import('../views/index/Classify.vue')
      },
      {
        path: '/index/shop',
        name: 'Shop',
        component: () => import('../views/index/Shop.vue')
      },
      {
        path: '/index/my',
        name: 'My',
        component: () => import('../views/index/My.vue')
      },
      {
        path: '/index/list',
        name: 'List',
        component: () => import('../views/index/List.vue')
      },
      {
        path: '/index/allist',
        name: 'allList',
        component: () => import('../views/index/allList.vue'),
        redirect:'/index/allist/listall',
        children:[
    
          {
            path: '/index/allist/listall',
            name: 'listAll',
            component: () => import('../views/index/allist/listAll.vue')
          },
          {
            path: '/index/allist/listawit', //待付款
            name: 'listAwit',
            component: () => import('../views/index/allist/listAwit.vue')
          },
          {
            path: '/index/allist/listsend', //已发货
            name: 'listSend',
            component: () => import('../views/index/allist/listSend.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registry',
    name: 'Registry',
    component: Registry
  },
  {
    path: '/position', //定位页面
    name: 'Position',
    component: Position
  },
  {
    path:'/search', //搜索页面
    name:Search,
    component:Search
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,  next) => {
  if (to.path != '/login') {
    if ($cookies.get('token')) {
      next()
    } else {
      if(to.path !== '/registry'){
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }else{
        next()
      }
      
    }
  } else {
    next()
  }
})

export default router
