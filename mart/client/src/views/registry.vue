<template>
    <div class="registry">
        <div class="r_header">
            <h2>请填写您要注册的用户名和密码</h2>
            <p>亲，欢迎注册校园超市~</p>
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写要注册的用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写您要注册的密码' }]"
            />
            <div style="margin: 16px;">
                <van-button
                    round
                    block
                    type="info"
                    native-type="submit"
                    :style="{margin:'.1rem 0'}"
                    is-link
                >注册</van-button>
            </div>
        </van-form>
       
<van-popup v-model="show">
    <p>我们需要绑定手机号喔~</p>
    <van-form @submit="onbindSubmit">
          <van-field
            v-model="mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
           
          />
          <van-field
            v-model="identifyCode"
            name="identifyCode"
            label="验证码"
            placeholder="验证码"
        
          >
            <template #button>
              <van-button
                size="small"
                type="primary"
                @click="sendCode"
                :disabled="disable"
              >{{second>=0?second+'秒后可重发':'发送验证码'}}</van-button>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :style="{margin:'.1rem 0'}">提交</van-button>
          </div>
        </van-form>
</van-popup>
    </div>
</template>
<script>
import { _registry, _login,_toBindMobile } from "../api/home.js";
export default {
  data() {
    return {
      username: "", //用户名
      password: null, //密码
      show: false,
      mobile:null, //手机号验证码
      identifyCode:null,
      second: -1, //验证码秒数
      disable: false, //是否禁用验证码按钮
      timer:null, //计时器
      randomCode:null, //获取到的验证码
      userInfo:null, //用户信息
    };
  },
  
  methods: {
    onSubmit(values) {
      _registry(values).then(res => {
        if (res.data.code) {
          //如果注册成功，跳转到绑定手机号页面
          _login(values).then(red => {
      
            if (red.data.code) {
              //如果登陆成功
              this.saveCookies(red);
              this.userInfo = red.data.result[0]
             this.show = true;
            }
          });
        }else{
            alert('用户名已存在')
        }
      });
    },
    showPopup() { //展示弹出框
      this.show = true;
    },
     saveCookies(res){ //保存登录状态
     this.$cookies.set("token", res.data.token);
          this.$cookies.set("uid", res.data.result[0].uid);
        
  },
  sendCode() {
      //发送验证码
      this.randomCode = Math.random().toString(16).slice(2,6)
      alert(this.randomCode)
      this.disable = true;
      this.second = 30;
      this.timer = setInterval(() => {
        if (this.second < 0) {
          this.disable = false;
          this.timer = null
          
        } else {
          this.second--;
        }
      }, 1000);
    },
    onbindSubmit(values){ //绑定手机号的提交事件

        _toBindMobile(Object.assign(this.userInfo,values) ).then(res=>{
            if(res.data.code){
                this.$notify({ type: 'success', message: '您已注册并登陆' });
                 this.$router.push("/position");
            }
        })
    }
  }
};
</script>
<style>
</style>
