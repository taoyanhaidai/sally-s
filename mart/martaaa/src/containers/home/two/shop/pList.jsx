import React, { Component } from 'react'
import { Button, Table, Space, Form, Input, Select, Modal,message,Popconfirm } from 'antd'
import { _delProductlList,_editProductList,_addProductList, _getTwoList, _getOneList, _getProductList, _updateProductList, _findProductByKey } from '@/api/product.js'
import Add from '@/components/shop/add.jsx'
import Edit from '@/components/shop/edit.jsx'
import Del from '@/components/shop/del.jsx'
const { Option } = Select;
const { Column } = Table;

export default class pList extends Component {
    state = {
        show: {
            title: '添加',
            type: 'add'
        },
        pageList: [], //分页拿到的数据
        select: null, //选择上架或下架
        visible: false, //控制弹框显示和隐藏
        oneList: [], //一级列表
        oneSelect: 0, //一级列表的选择
        twoList: [], //二级列表
        value: {
            s_type: 0,
            t_type: 0
        },
        changeRecord:{},
        changeValue:{},//改变后的数据
        fields:[
            {
              "name": [
                "pid"
              ],
              "value": ''
            },
            {
                "name": [
                  "pname"
                ],
                "value": ''
              },
              {
                "name": [
                  "imgUrl"
                ],
                "value": ''
              },
              {
                "name": [
                  "sales"
                ],
                "value": ''
              },
              {
                "name": [
                  "original_price"
                ],
                "value": ''
              },
              {
                "name": [
                  "sale_price"
                ],
                "value": ''
              },
              {
                "name": [
                  "mode"
                ],
                "value": ''
              },
              {
                "name": [
                  "s_type"
                ],
                "value": ''
              },
              {
                "name": [
                  "t_type"
                ],
                "value": ''
              },
              {
                "name": [
                  "carousel"
                ],
                "value": ''
              },
              {
                "name": [
                  "desc"
                ],
                "value": ''
              }
          ]
    }


    render() {
        const { show, value } = this.state;
        return (
            <div className="pList">
                <h2>商品列表<Button type="primary" style={{ float: 'right' }} onClick={() => { this.isShow() }}>+添加商品</Button></h2>
                {/* 查询栏 */}
                <Form
                    name="from2"
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                    onFinish={(values) => { this.search(values) }}

                >
                    <Form.Item
                        label="商品名称"
                        name="pname"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="isUp">
                        状态：
                        <Select defaultValue="请选择" style={{ width: 120 }} onChange={(value) => { this.handleChange(value) }}>
                            <Option value="上架">上架</Option>
                            <Option value="下架">下架</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                {/* 表格 */}
                <Table
                    dataSource={this.state.pageList}
                    rowKey='pid'
                    scrollToFirstRowOnChange={false}
                    pagination={{defaultPageSize:5 }}
                    
                >

                    <Column title="商品信息" dataIndex="pname" key="pname" />
                    <Column title="价格" dataIndex="sale_price" key="sale_price" />

                    <Column title="销量" dataIndex="sales" key="sales" />
                    <Column title="库存" dataIndex="sales" key="sales" />
                    <Column title="状态"
                        render={(text, record) => (
                            <p style={{ color: 'orangered' }}>{record.isUp == 0 ? '下架' : '上架'}</p>
                        )}
                        key="isUp" />
                    <Column title="描述信息" dataIndex="desc" key="desc" />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">

                                <span onClick={() => { this.update(record.isUp, record.pid) }} style={{ color: 'deepskyblue' }}>{record.isUp == 0 ? '上架' : '下架'}</span>
                                <span style={{ color: 'deepskyblue' }} onClick={() => { this.edit(record) }}>编辑</span>
                                <Popconfirm
                                        title="你确定要删除吗?"
                                        onConfirm={() => { this.delConfirm(record.pid) }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="primary" style={{ marginRight: '3px' }}>删除</Button>
                                    </Popconfirm>
                            </Space>
                        )}
                    />
                   
                </Table>

                {/* 编辑和添加框 */}
                <Modal
                    title={show.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}

                >
                    <Form
                        name="form3"
                        onFinish={this.onFinish}
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
                            label="商品名称:"
                            name="pname"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="图片:" name="imgUrl">
                            <Input />
                        </Form.Item>
                        <Form.Item label="商品销量:" name="sales">
                            <Input />
                        </Form.Item>
                        <Form.Item label="原价:" name="original_price">
                            <Input />
                        </Form.Item>
                        <Form.Item label="现价:" name="sale_price">
                            <Input />
                        </Form.Item>
                        <Form.Item label="经营模式:" name="mode">
                            <Input />
                        </Form.Item>
                        <Form.Item label="一级分类:" name="t_type">

                            <Select defaultValue={this.state.oneSelect} style={{ width: 120 }} onChange={this.handleChange}>
                                {
                                    this.state.oneList.map((item, index) => {
                                        return <Option value={item.t_type} key={index}>{item.t_text}</Option>
                                    })
                                }

                            </Select>

                        </Form.Item>
                        <Form.Item label="二级分类:" name="s_type">

                            <Select defaultValue={this.state.oneSelect} style={{ width: 120 }} onChange={this.twohandleChange}>
                                {
                                    this.state.twoList.map((item, index) => {
                                        return <Option value={item.s_type} key={index}>{item.s_text}</Option>
                                    })

                                }

                            </Select>

                        </Form.Item>

                        <Form.Item label="商品图片:" name="carousel">
                            <Input />
                        </Form.Item>
                        <Form.Item label="商品描述:" name="desc">
                            <Input />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                确认
                         </Button>
                        </Form.Item>
                    </Form>



                </Modal>
                {
                    show.type === 'add' ? <Add></Add> : <Edit></Edit>
                }
            </div>

        )
    }
    async delConfirm(pid) { //确认删除
     
        const result = await _delProductlList({ pid: pid })

        if (result.data.code) {
            message.success('删除成功');
            this.getProductList();
        }

    }
    componentDidMount() {

        this.getProductList();
        this.getOneList(); //拿一级列表
        this.getTwoList(0)

    }
    handleChange = (index) => { //选择一级列表
        this.setState({
            oneSelect: index,
            value: {
                s_type: 0,
                t_type: index
            }
        })
        this.getTwoList(index)
    }
    async getOneList() { //拿一级列表
        const result = await _getOneList()
        if (result.data.code) {
            this.setState({
                oneList: result.data.result,

            })

        }

    }
    async getTwoList(index) { //拿二级列表

        const result = await _getTwoList({ t_type: index })

        if (result.data.code) {
            this.setState({
                twoList: result.data.result,

            })
        
        }
    }
    twohandleChange = (index) => { //二级列表更改选择
        this.setState({
            value: {
                s_type: index,
                t_type: this.state.oneSelect
            }
        })
    }
    async getProductList() { //拿数据
        const result = await _getProductList()

        if (result.data.code) {
            this.setState({
                pageList: result.data.result
            })

        }
    }
    async update(isUp, pid) { //商品上下架

        const result = await _updateProductList({ isUp, pid })

        if (result.data.code) {
            this.getProductList()

        }
    }
    async search(values) { //查询
    
        const keyword = values.pname //关键字
        const isUp = this.state.select //上下架
        if (!keyword) {
            this.getProductList()
        } else {
            const result = await _findProductByKey({ keyword, isUp })
            this.setState({
                pageList: result.data.result
            })
        }



    }
    handleChange(value) { //选择

        this.setState({
            select: value == '上架' ? 1 : 0
        })
    }

    handleCancel = e => { //取消

        this.setState({
            visible: false,
            fields:[]
        })

    }
    onFinish = (values) => { //确认添加或编辑
       if(this.state.show.type === 'add'){
        const data = Object.assign(values, this.state.value) //需要添加的数据
    
        this.add(data) //调用添加接口
       }else{ //如果是编辑

        const change = this.state.changeRecord 
        this.state.changeValue.forEach((item,index)=>{
            if(item.touched){
                change[item.name] = item.value
                
            }
        })
        this.setState({
            changeRecord:change,
            fields:[]
        },()=>{
            this.editProduct()
        })
       }
        

    }
    async editProduct(){ //编辑数据
        const result = await _editProductList(this.state.changeRecord)

        if (result.data.code) {
            this.setState({
                visible:false,
                fields:[]
            })
            message.success('更新成功')
            this.getProductList();
        }
    }
    async add(data) { //添加数据
     
        const result = await _addProductList(data)

      
        if (result.data.code) {
            this.setState({
                visible:false,
                fields:[]
            })
            message.success('添加成功')
            this.getProductList();
        }
        
    }
    isShow() { //显示添加列表
        this.setState({
            visible: true,
            show: {
                title: '添加',
                type: 'add'
            }
        })
    }
    edit(record){ //编辑

        this.setState({
            visible: true,
            show: {
                title: '编辑',
                type: 'edit'
            },
            changeRecord:record,
            fields:[
                {
                  "name": [
                    "pid"
                  ],
                  "value": record.pid
                },
                {
                    "name": [
                      "pname"
                    ],
                    "value": record.pname
                  },
                  {
                    "name": [
                      "imgUrl"
                    ],
                    "value": record.imgUrl
                  },
                  {
                    "name": [
                      "sales"
                    ],
                    "value": record.sales
                  },
                  {
                    "name": [
                      "original_price"
                    ],
                    "value": record.original_price
                  },
                  {
                    "name": [
                      "sale_price"
                    ],
                    "value": record.sale_price
                  },
                  {
                    "name": [
                      "mode"
                    ],
                    "value": record.mode
                  },
                  {
                    "name": [
                      "s_type"
                    ],
                    "value": record.s_type
                  },
                  {
                    "name": [
                      "t_type"
                    ],
                    "value": record.t_type
                  },
                  {
                    "name": [
                      "carousel"
                    ],
                    "value": record.carousel
                  },
                  {
                    "name": [
                      "desc"
                    ],
                    "value": record.desc
                  }
              ]
        })
    }
    changeValue(allFields){ //更改值
        this.setState({
            changeValue:allFields
        })
    }
}
