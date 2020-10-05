import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {_userUpload} from '@/api/home.js'
import { connect } from 'dva';

@connect((store) => {
    return store.home
})
class avatar extends Component {
    state = {
        loading: false, //加载
        imageUrl:''
    }
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={(file)=>{this.beforeUpload(file)}}
                    customRequest={(obj)=>{this.handleChange(obj)}}
                    // action="/user/upload"
                    // headers={{authorization:sessionStorage.getItem('token')}}
                    
                  
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>

            </div>
        );
    }
    beforeUpload(file) { //上传头像之前
      
        
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' ||file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('您只能上传格式为jpg/jpeg/png的头像！');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('您上传的图片过大，只能上传2k内的图片！');
        }
        

        return isJpgOrPng && isLt2M;
    }
    async handleChange({file}){
       
        // 创建一个空的FormData对象
        var formData = new FormData(); // 当前为空
        formData.append('files',file)
   
        const result = await _userUpload(formData)

     
        if(result.data.code){
            this.setState({
                imageUrl:result.data.imgUrl
            })
        }
       
      
    };
}

export default avatar;