/*
 * @Author: heinan 
 * @Date: 2019-12-06 13:38:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Tu 09:35:31
 */
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import "@/assets/css/bootstrap.min.css";
import "@/assets/css/iconfont.css";
import "@/assets/css/reset.css";
import "@/assets/css/common.css";
import "@/assets/css/style.css";

class Layout extends Component {
    render() {
   
        return (
            <div className="wraper">
                <header className="header">12313
                <span style={{float:"right"}} onClick={this.props.history.push('/login')}>用户名</span>
                </header>
                
                <section>{this.props.children}</section>
            </div>
        )
    }
}
export default withRouter(Layout);