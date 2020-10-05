import React, { Component } from 'react'
import {_getComList,_editComList,_addComList,_delComList} from '@/api/comment'
import {Form,Input,Modal, Button, Table, Space,Popconfirm, message,Avatar } from 'antd';
const { Column } = Table;
export default class comment extends Component {
    state={
        comList:[], //评论列表
        visible:false,
        fields:[
            {
                "name": [
                  "cid"
                ],
                "value": ''
              },
              {
                  "name": [
                    "pid"
                  ],
                  "value": ''
                },
                {
                    "name": [
                      "uid"
                    ],
                    "value": ''
                  },
                  {
                    "name": [
                      "uphoto"
                    ],
                    "value": ''
                  },
                  {
                    "name": [
                      "uname"
                    ],
                    "value": ''
                  },
                  {
                    "name": [
                      "comment"
                    ],
                    "value": ''
                  },
                  {
                    "name": [
                      "score"
                    ],
                    "value": ''
                  }
        ],
        message: {
            title: '添加',
            type: 'add',
        }
    }
    render() {
        return (
            <div>
                <h2>评论管理</h2>
                 <Button type="primary"  style={{float:'right'}} onClick={() => { this.showModal({ type: 'add' }) }}>
                            +添加评论
                        </Button>
                        <Modal
                            title={this.state.message.titles}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={null}
                            centered={true}
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
                                    label="评论id"
                                    name="cid"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="商品id"
                                    name="pid"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="用户id"
                                    name="uid"

                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="用户头像"
                                    name="uphoto"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="用户昵称"
                                    name="uname"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="评论"
                                    name="comment"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="星级"
                                    name="score"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Table
                            dataSource={this.state.comList}
                            rowKey='cid'
                            scrollToFirstRowOnChange={false}
                            pagination={{ defaultPageSize: 5 }}
                     
                            scroll={{x:true}}

                        >
                            <Column title="评论id" dataIndex="cid" key="cid" />
                            <Column title="商品id" dataIndex="pid" key="pid" />
                            <Column title="用户id" dataIndex="uid" key="uid" />
                            <Column title="用户头像" dataIndex="uphoto" key="uphoto"  
                            render={(text, record,index) => (
                                    <Space size="middle">
                                        <Avatar src={record.uphoto}></Avatar>
                                    </Space>
                                )}/>
                            
                            <Column title="用户昵称" dataIndex="uname" key="uname" />
                            <Column title="评论" dataIndex="comment" key="comment" />
                            <Column title="星级" dataIndex="score" key="score" />
                            <Column
                                title="操作"
                                key="action"
                                render={(text, record,index) => (
                                    <Space size="middle">
                                        <Button type="primary" onClick={() => { this.showModal({ type: 'edit',record,index }) }}>编辑</Button>
                                        <Popconfirm
                                            title="你确定要删除吗?"
                                            onConfirm={() => { this.delConfirm(record) }}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type="primary" >删除</Button>
                                        </Popconfirm>
                                    </Space>
                                )}
                            />

                        </Table>
            </div>
        )
    }
    async add(data) { //添加数据
      
 
            const result = await _addComList(data)
        
      
            if (result.data.code) {
                this.setState({
                    visible:false,
                    fields:[]
                })
                message.success('添加成功')
                this.getComList();
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
            visible: false
        })
    }
    showModal({ type, record,index}) { //弹出框
 
        if (type === 'add') { //如果是添加
    
                this.setState({
                    visible: true,
                    message: {
                        title: '添加',
                        type: type,
                    },
                    fields:[]
                  
                })   
            
        } else { //如果是编辑,携参
            this.setState({
                visible: true,
                message: {
                    title: '编辑',
                    type: type,
                },
                cid:this.state.comList[index].cid,
                fields:[
                    {
                        "name": [
                          "cid"
                        ],
                        "value": record.cid
                      },
                      {
                          "name": [
                            "pid"
                          ],
                          "value": record.pid
                        },
                        {
                            "name": [
                              "uid"
                            ],
                            "value": record.uid
                          },
                          {
                            "name": [
                              "uphoto"
                            ],
                            "value": record.uphoto
                          },
                          {
                            "name": [
                              "uname"
                            ],
                            "value": record.uname
                          },
                          {
                            "name": [
                              "comment"
                            ],
                            "value": record.comment
                          },
                          {
                            "name": [
                              "score"
                            ],
                            "value": record.score
                          }
                ]
            })
    
        }

    }
    async delConfirm(record) { //确认删除
  
            const result = await _delComList({ cid: record.cid })

            if (result.data.code) {
                message.success('删除成功');
    
            }
       
        this.getComList();

        

    }
    async editProduct(){ //编辑数据
   
       
            const result = await _editComList(Object.assign(this.state.changeRecord,{tid:this.state.tid}))

            if (result.data.code) {
                this.setState({
                    visible:false,
                    fields:[]
                })
                message.success('更新成功')
                this.getComList();
            }
        
    }
    async getComList(){ //拿评论列表
        const result = await _getComList()

        this.setState({
            comList:result.data.result
        })
    }
    componentDidMount(){
        this.getComList()
    }
    
}
