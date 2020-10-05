import React, { Component } from 'react';

// import Layout from '@/components/layout';
import { getSession } from '@/utils'
import { _getUserByToken, _getInfoByUid } from '@/api/home'
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { NavLink } from 'dva/router'
import RouterView from '@/router'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Home extends Component {
  state = {
    collapsed: false,
    userInfo: {} //用户信息
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const {userInfo} = this.state;
    return <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >

          <Menu.Item key="1" >
            <NavLink to="/home/first">系统首页</NavLink>

          </Menu.Item>

          <SubMenu key="sub1" title="商品管理">

            <Menu.Item key="3">
              <NavLink to="/home/shop/plist">商品列表</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/home/shop/classify">分类管理</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/home/shop/comment">评论管理</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="6" >
            <NavLink to="/home/list">订单管理</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: 0 }}>
          <p style={{ color: '#fff', float: 'right' }}>
            {this.state.userInfo ? <Avatar src={userInfo.avatar} onClick={()=>{this.props.history.push('/home/avatar')}}/> : ''}

            {this.state.userInfo ? this.state.userInfo.nickname : '用户未登录'}
          </p>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ overflow: 'hidden' }}>
            <RouterView routes={this.props.routes} history={this.props.history} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  }
  componentDidMount() {
    this.getUserInfo()
   
  }
  async getUserInfo() {
    const token = getSession('token')

    const result = await _getUserByToken({ token })

    if (result.data.code) {
      const res = await _getInfoByUid({ uid: result.data.uid.uid })

      if (res.data.code) {
        this.setState({
          userInfo: res.data.data
        },()=>{
          console.log(this.state.userInfo)
        })
      }
    }
  }
}
export default Home;