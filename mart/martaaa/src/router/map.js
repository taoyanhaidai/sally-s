/*
 * @Author: heinan 
 * @Date: 2019-12-06 13:37:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-We 10:46:25
 */
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import {getSession} from '@/utils/'
class RouterMap extends Component {
    render() {
        const { routes, history } = this.props;
        let reds=routes.filter(item=>item.redirect)
        let items=routes.filter(item=>item.component)
        return <Router history={history}>
            
            <Switch>
                {
                    items.map((item,index)=>{
                        return <Route key={item.path} path={item.path} render={(props)=>{
                   
                            if(item.auth){ //如果有路由守卫
                                if(!getSession('token')){
                                    return <Redirect to={{pathname:'/user/login',path:item.path}}></Redirect>
                                }
                            }
                            const children = item.children === undefined ? {} : {routes:item.children};
                            return <item.component {...props} {...children} history={history}></item.component>
                            
                            
                        }}></Route>
                    })
                }
                {
                     reds.map((item)=>{
                        return <Redirect key={item.path}  to={item.redirect}></Redirect>
                    })
                }
                {/* {
                    routes.map((item, index) => {
                        const children = item.children === undefined ? [] : item.children;
                        const Comp = item.component;
                        if(item.path ==='/'){
                            return <Redirect from="/" to={item.redirect} key={'default'}  exact></Redirect>
                        }
                        if(item.auth){
                            if(!getSession('token')){
                            
                                return <Redirect to="/login" key={item.path} exact></Redirect>
                            }
                        }
                        return <Route key={item.name} path={item.path} exact component={() => {
                              
                            return <Comp routes={children} history={history}></Comp>
                    }} />
                    })
                } */}

            </Switch>
        </Router>
    }
}
export default RouterMap;