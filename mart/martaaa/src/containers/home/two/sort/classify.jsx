import React, { Component } from 'react'
import {Form,Input,Modal, Button, Table, Space, Col, Row, Popconfirm, message } from 'antd'

import { _getOneList, _delOneSort, _getTwoListAll,_addOneList,_editOneList,_addTwoList,_editTwoList,_delTwoSort } from '@/api/sort.js'

const { Column } = Table;
export default class classify extends Component {
    state = {
        pageList: [], //拿到的数据
        oneList: [], //一级分类列表
        twoList: [], //二级分类列表
        visible: false,
        twoVisible:false,
        message: {
            title: '添加',
            type: 'add',
            
        },
        num:1, //判断是一级列表还是二级列表的操作
        tid:null,//操作的id
        fields:[
            {
                "name": [
                  "t_text"
                ],
                "value": ''
              },
              {
                  "name": [
                    "t_type"
                  ],
                  "value": ''
                },
        ],
        twoFields:[
            {
                "name": [
                  "t_type"
                ],
                "value": ''
              },
              {
                  "name": [
                    "s_text"
                  ],
                  "value": ''
                },
                {
                    "name": [
                      "s_type"
                    ],
                    "value": ''
                  }
        ],
        changeRecord:[]
    }
    render() {
        return (
            <div className="classify">
                <h2>分类管理</h2>

                <Row>

                    <Col span={12}>
                        <Button type="primary" onClick={() => { this.showModal({ type: 'add',num:1 }) }}>
                            +添加一级分类
                        </Button>
                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            <Form
                                name="fromss"
                                style={{ display: 'flex', justifyContent: 'space-around' }}
                                onFinish={(values) => { this.handleOk(values) }}
                                layout="vertical"
                                initialValues={{
                                    remember: true,
                                }}
                                fields={this.state.fields}
                                 onFieldsChange={(changedFields, allFields) => {
                                    
                                   this.changeValue(allFields)
                                 }}
                            >
                                <Form.Item
                                    label="一级分类"
                                    name="t_text"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="类型"
                                    name="t_type"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Table
                            dataSource={this.state.oneList}
                            rowKey='t_type'
                            scrollToFirstRowOnChange={false}
                            pagination={{ defaultPageSize: 5 }}

                        >
                            <Column title="一级分类" dataIndex="t_text" key="t_text" />
                            <Column title="类型" dataIndex="t_type" key="t_type" />

                            <Column
                                title="操作"
                                key="action"
                                render={(text, record,index) => (
                                    <Space size="middle">
                                        <span style={{ color: 'deepskyblue' }} onClick={() => { this.showModal({ type: 'edit',num:1, record,index }) }}>编辑</span>
                                        <Popconfirm
                                            title="你确定要删除吗?"
                                            onConfirm={() => { this.delConfirm(1, record) }}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type="primary" style={{ marginRight: '3px' }}>删除</Button>
                                        </Popconfirm>
                                    </Space>
                                )}
                            />

                        </Table>
                    </Col>
                    {/* 二级分类 */}
                    <Col span={12}>
                        <Button type="primary" style={{ float: 'right' }} onClick={() => { this.showModal({ type: 'add',num:2 }) }}>+添加二级分类</Button>
                        <Modal
                            title="Basic Modal"
                            visible={this.state.twoVisible}
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            <Form
                                name="fromssw"
                                style={{ display: 'flex', justifyContent: 'space-around' }}
                                onFinish={(values) => { this.handleOk(values) }}
                                layout="vertical"
                                initialValues={{
                                    remember: true,
                                }}
                                fields={this.state.twoFields}
                                 onFieldsChange={(changedFields, allFields) => {
                                    
                                   this.changeValue(allFields)
                                 }}
                            >
                                <Form.Item
                                    label="一级类型"
                                    name="t_type"

                                >
                                    <Input />
                                </Form.Item>
                             
                                <Form.Item
                                    label="二级分类"
                                    name="s_text"

                                >
                                    <Input />
                                </Form.Item>
                             
                                <Form.Item
                                    label="二级类型"
                                    name="s_type"

                                >
                                    <Input />
                                </Form.Item>
                               
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Table
                            dataSource={this.state.twoList}
                            rowKey='s_type'
                            scrollToFirstRowOnChange={false}
                            pagination={{ defaultPageSize: 5 }}

                        >
                            <Column title="一级类型" dataIndex="t_type" key="t_type" />
                            <Column title="二级分类" dataIndex="s_text" key="s_text" />
                            <Column title="二级类型" dataIndex="s_type" key="s_type" />

                            <Column
                                title="操作"
                                key="action"
                                render={(text, record,index) => (
                                    <Space size="middle">
                                        <span style={{ color: 'deepskyblue' }} onClick={() => { this.showModal({ type: 'edit',num:2,record,index })  }}>编辑</span>
                                        <Popconfirm
                                            title="你确定要删除吗?"
                                            onConfirm={() => { this.delConfirm(2, record) }}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type="primary" style={{ marginRight: '3px' }}>删除</Button>
                                        </Popconfirm>
                                    </Space>
                                )}
                            />

                        </Table>
                    </Col>
                </Row>




            </div>




        )
    }
    showModal({ type, record,index,num}) { //弹出框
      
       
        this.setState({
            num:num
        })
        if (type === 'add') { //如果是添加
          
            
            if(num === 1) {
                this.setState({
                    visible: true,
                    message: {
                        title: '添加',
                        type: type,
                    },
                  
                })
            }else{
                this.setState({
                    twoVisible: true,
                    message: {
                        title: '添加',
                        type: type,
                    },
                })
            }
           
            
        } else { //如果是编辑,携参
            this.setState({
              
                message: {
                    title: '编辑',
                    type: type,
                },
                
            })
            if(num === 1) { //如果是一级列表的
                
                this.setState({
                    tid:this.state.oneList[index].tid,
                    visible: true,
                    fields:[
                        {
                            "name": [
                              "t_text"
                            ],
                            "value": record.t_text
                          },
                          {
                              "name": [
                                "t_type"
                              ],
                              "value": record.t_type
                            },
                    ]
                })
            }else{ //如果是二级列表的
         
                this.setState({
                    tid:this.state.twoList[index].s_type,
                    twoVisible:true,
                    twoFields:[
                        {
                            "name": [
                              "t_type"
                            ],
                            "value": record.t_type
                          },
                          {
                              "name": [
                                "s_text"
                              ],
                              "value": record.s_text
                            },
                            {
                                "name": [
                                  "s_type"
                                ],
                                "value": record.s_type
                              }
                    ]
                })
            }
            
        }

    };
    changeValue(allFields){ //更改值
        this.setState({
            changeValue:allFields
        })
    }
    async add(data) { //添加数据
      
        if(this.state.num === 1 ){ //如果操作一级分类
            const result = await _addOneList(data)
        
      
            if (result.data.code) {
                this.setState({
                    visible:false,
                    fields:[]
                })
                message.success('添加成功')
                this.getOneList();
            }
        }else{
            const result = await _addTwoList(data)
        
      
            if (result.data.code) {
                this.setState({
                    twoVisible:false,
                    twoFields:[]
                })
               
                this.getTwoListAll();
            }else{
                message.success('添加失败')
            }
        }
       
        
    }
    async editProduct(){ //编辑数据
   
        if(this.state.num === 1){ //如果是一级列表的操作
            const result = await _editOneList(Object.assign(this.state.changeRecord,{tid:this.state.tid}))

            if (result.data.code) {
                this.setState({
                    visible:false,
                    fields:[]
                })
                message.success('更新成功')
                this.getOneList();
            }
        }else{
            const result = await _editTwoList(Object.assign(this.state.changeRecord,{tid:this.state.tid}))

            if (result.data.code) {
                this.setState({
                    twoVisible:false,
                    twoFields:[]
                })
                message.success('更新成功')
                this.getTwoListAll();
            }
        }
        
    }
    handleOk(values){ //确认添加或编辑
        if(this.state.message.type === 'add'){
            const data = Object.assign(values, this.state.value) //需要添加的数据
        
            this.add(data) //调用添加接口
           }else{ //如果是编辑
          
            this.setState({
                changeRecord:values,
                fields:[]
            },()=>{
                this.editProduct()
            })
           }
    }

    handleCancel = e => { //取消

        this.setState({
            visible: false,
            twoVisible:false
        });
    };
    async delConfirm(num,record) { //确认删除一级
        
        if(num === 1){ //如果是一级列表操作
            const result = await _delOneSort({ tid: record.tid })

            if (result.data.code) {
                message.success('删除成功');
    
            }
        }else{ //如果是二级列表操作
            const result = await _delTwoSort({ s_type:record.s_type})

            if (result.data.code) {
                message.success('删除成功');
    
            }
        }
        this.getOneList();
        this.getTwoListAll();
        

    }
   
    componentDidMount() {
        this.getOneList();
        this.getTwoListAll();
    }
    async getOneList() { //拿一级分类数据
        const result = await _getOneList()
      
        if (result.data.code) {

            this.setState({
                oneList: result.data.result,

            })

        }
    }
    async getTwoListAll() { //拿二级分类数据
        const result = await _getTwoListAll()
      
        if (result.data.code) {

            this.setState({
                twoList: result.data.result,

            })

        }
    }
}
