import React, { Component } from 'react'
import RouterView from '@/router'
export default class Shop extends Component {
    render() {
        return (
            <div>
           
                <RouterView routes={this.props.routes} history={this.props.history}/>
            </div>
        )
    }
}
