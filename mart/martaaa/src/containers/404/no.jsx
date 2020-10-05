import React, { Component } from 'react'

export default class no extends Component {
    render() {
        
        return (
            <div>

                <h1 style={{textAlign:'center'}}>您权限不够，无法访问</h1>
                <button style={{margin:'0 45%'}} onClick={()=>{this.props.history.push('/user/login')}}>重新登录</button>
            </div>
        )
    }
}
