import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox } from 'antd';



@connect((store) => {
    return store.home
})
class Login extends Component {
    state = {
        name:'',
        passw:'',
        layout: {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 10,
            },
        },
        tailLayout: {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        },
    }
    render() {
        
        return (
            <div>
                <Form
                    {...this.state.layout}
                    name="basic"


                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input onChange={(e)=>{this.toName(e)}}/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={(e)=>{this.pwd(e)}}/>
                    </Form.Item>

                    <Form.Item {...this.state.tailLayout} name="remember" >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...this.state.tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={() => { this.login() }}>
                            登录
        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
    toName(e){
        this.setState({
            name:e.target.value
        })
    }
    pwd(e){
        this.setState({
            passw:e.target.value
        })
 
    }
    login() {
        this.props.dispatch({type:'home/toLogin',payload:{username:this.state.name,password:this.state.passw}})
    
    }

}

export default Login;