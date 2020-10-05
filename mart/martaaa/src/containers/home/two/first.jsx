import React, { Component } from 'react'
import { _getCarouselList, _delCarouselList, _addCarouselList,_getDefaultValue,_editCar } from '@/api/home.js'
import {Row, Col, Pagination, Modal, Form, Input, DatePicker, Upload, message, Button, Popconfirm } from 'antd';
import { connect } from 'dva'
const { RangePicker } = DatePicker;
const style = { background: '#fff', height: '160px', width: '200px' };

@connect((store) => store.home)
class First extends Component {
    state = {
        carouselList: [], //轮播图列表
        pageSize: 8, //一页条数
        page: 1, //页码
        visible: false,
        rangeConfig1: {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        },
        rangeConfig2: {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        },
        props: {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }

        },
        isShow: false,
 
        fields:[
            {
              "name": [
                "tit"
              ],
              "value": "Ant Design"
            },
            {
                "name": [
                  "img"
                ],
                "value": "Ant Design"
              },
              {
                "name": [
                  "type"
                ],
                "value": "Ant Design"
              }
          ],
          changeValue:{}, //改变后的数据
          cid:null //编辑的商品id

    }
   
    render() {

        return (
            <div>
                <h2>首页Banner<Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>+添加Banner</Button></h2>
                <Row gutter={[10, 15]}>
                    {
                        this.state.carouselList.map((item, index) => {
                            return <Col key={index} className="gutter-row" offset={1} span={5}>
                                <div style={style}>
                                    <img src={item.img} alt="" style={{ width: '100%', height: '50%' }} />
                                    <p>{item.tit}</p>
                                    <p> <Popconfirm
                                        title="你确定要删除吗?"
                                        onConfirm={() => { this.delConfirm(item.cid) }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="primary" style={{ marginRight: '3px' }}>删除</Button>
                                    </Popconfirm>
                                        <Button type="primary" onClick={() => { this.showAlert(item.cid) }}>编辑</Button></p>

                                </div>
                            </Col>
                        })
                    }


                </Row>
                <Pagination onChange={this.onChange} total={10} defaultPageSize={6} />

                {/* 编辑 */}
                <Modal
                    title="编辑"
                    visible={this.state.isShow}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form 
                 
                         fields={this.state.fields}
                         onFieldsChange={(changedFields, allFields) => {
                            
                           this.changeValue(allFields)
                         }}
                         onFinish={()=>{this.editFinish()}}
                    >
                        <Form.Item name="tit">
                            <Input placeholder="活动标题" />
                        </Form.Item>
                        <Form.Item name="img">
                            <Input placeholder="轮播图片" />
                        </Form.Item>
                        <Form.Item name="type">
                            <Input placeholder="轮播类型" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                确认
                             </Button>
                        </Form.Item>
                    </Form>

                </Modal>

                {/* 添加Banner */}
                <Modal
                    title="添加Banner"
                    visible={this.state.visible}
     
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        name="global_state"
                        layout="vertical"
                        onFinish={(values) => { this.onFinish(values) }}

                    >
                        <Form.Item name="img">
                            <Upload {...this.state.props} >
                                <Button>+添加图片</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="tit">
                            <Input placeholder="活动标题" />
                        </Form.Item>

                        <Form.Item name="start_time" label="起止时间" {...this.state.rangeConfig1}>
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item name="end_time" label="活动链接" {...this.state.rangeConfig2}>
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                确认
                         </Button>
                        </Form.Item>
                    </Form>



                </Modal>

            </div>
        )
    }
    componentDidMount() {
        this.getCarouselList()
    }
    async getCarouselList() { //拿轮播数据


        const result = await _getCarouselList({ page: this.state.page, pageSize: this.state.pageSize })

        if (result.data.code) {
            this.setState({
                carouselList: result.data.result
            })
        }
    }
    onChange = (page) => { //更改页码时

        this.setState({
            page: page
        }, () => {
            this.getCarouselList()
        })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = e => { //取消
        console.log(e);
        this.setState({
            visible: false,
            isShow: false,
       
        })

    }
    async delConfirm(cid) { //确认删除

        const result = await _delCarouselList({ cid: cid })

        if (result.data.code) {
            message.success('删除成功');
        }

    }

    async onFinish(values) { //确认添加

        let start_time = values.start_time[0]._d.getTime() //开始时间
        let end_time = values.start_time[1]._d.getTime() //结束时间
        let img = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3545168918,2289094124&fm=26&gp=0.jpg' //img名
        let tit = values.tit //标题

        const result = await _addCarouselList({ tit, start_time, end_time, img })

        if (result.data.code) {
            this.getCarouselList()
        }
        this.setState({
            visible: false,
        })
    }
    async showAlert(cid) { //显示编辑弹框
       
        const result = await _getDefaultValue({cid}) //拿默认参数
        
        if(result.data.code){
         
            this.setState({
                fields:[
                    {
                      "name": [
                        "tit"
                      ],
                      "value": result.data.result[0].tit
                    },
                    {
                        "name": [
                          "img"
                        ],
                        "value": result.data.result[0].img
                      },
                      {
                        "name": [
                          "type"
                        ],
                        "value": result.data.result[0].type
                      }
                  ],
                  cid:cid
            })
        
        }
        this.setState({
            isShow: true
        })
    }
    changeValue(allFields){ //更改值
        this.setState({
            changeValue:allFields
        })
    }
    async editFinish(){ //确认编辑

        let cid = this.state.cid //要修改的轮播cid
        let tit = this.state.changeValue[0].value
        let img = this.state.changeValue[1].value
        let type = this.state.changeValue[2].value

        const result = await _editCar({cid,tit,img,type})
    
        if(result.data.code){
         
            this.setState({
                isShow: false
            },()=>{
                this.getCarouselList()
            })
            
        }
    }

}
export default First
