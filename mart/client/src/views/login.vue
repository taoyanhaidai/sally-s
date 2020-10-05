<template>
  <div class="login">
    <h3>校园超市</h3>
    <van-tabs>
      <van-tab title="用户名密码登录">
        <van-form @submit="(values)=>onSubmit(values,{msg:'user'})">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"

          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"

          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :style="{margin:'.1rem 0'}">提交</van-button>
            <van-button round block type="primary" native-type="submit" @click="()=>{this.$router.push('/registry')}">注册</van-button>
          </div>
        </van-form>
      </van-tab>
      
      <van-tab title="手机号验证码登录">
        <van-form @submit="(values)=>{onSubmit(values,{msg:'tel'})}">
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
            <van-button round block type="primary" native-type="submit">注册</van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { _login,_codeLogin } from "../api/home.js";
import { clearInterval } from "timers";
export default {
  data() {
    return {
      username: "",
      password: "",
      second: -1, //验证码秒数
      mobile: null, //手机号
      identifyCode: null, //验证码
      disable: false, //是否禁用验证码按钮
      timer:null, //计时器
      randomCode:null //获取到的验证码
    };
  },
  
  methods: {
    onSubmit(values,msg) {

      if(msg.msg === "user"){
      _login(values).then(res => {
        if (res.data.code) {
          //如果登陆成功

          this.saveCookies(res)
     
        }
      })
      }else{
  
        _codeLogin(values).then(res=>{
          if (res.data.code && values.identifyCode === this.randomCode) {
          //如果登陆成功
          
          this.saveCookies(res)
     
        }
        })
      }
      
    },
    saveCookies(res){
     this.$cookies.set("token", res.data.token);
          this.$cookies.set("uid", res.data.result[0].uid);
          this.$notify({ type: 'success', message: '登陆成功' });
          this.$router.push("/position");
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
    }
  }
};
</script>
<style lang='scss'>
</style>
