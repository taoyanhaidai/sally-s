<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-09-08 11:04:42
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-25 09:03:31
-->
<template>
  <div class="my">
    <h3>校园超市</h3>
    <dl class="m_top">
      <dd>{{userInfo.nickname}}</dd>
      <dt>
        <img
          :style="{width:'.5rem',height:'.5rem',borderRadius:'50%'}"
          :src="userInfo.avatar"
          alt=""
          @click="showSecond"
        >
      </dt>
      <transition name="van-slide-down">
        <div
          class="secondList"
          v-if="showSecondList"
        >
          <li>更改资料</li>
          <li @click="exit">退出登录</li>
        </div>
      </transition>
    </dl>
    <div class="m_center">
      <h3>
        我的订单
        <span @click="$router.push('/index/allist')">查看全部&gt;</span>
      </h3>
      <div class="m_content">
        <dl>
          <dt>
            <van-icon name="pending-payment" />
          </dt>
          <dd>待付款<span class="logi_span" v-show="awaitPay">{{'('+awaitPay+')'}}</span></dd>
        </dl>
        <dl>
          <dt>
            <van-icon name="send-gift-o" />
          </dt>
          <dd>待配送</dd>
        </dl>
        <dl>
          <dt>
            <van-icon name="logistics" />
          </dt>
          <dd>已发货<span class="logi_span" v-show="alrightSend">{{'('+alrightSend+')'}}</span></dd>
        </dl>
        <dl>
          <dt>
            <van-icon name="cash-on-deliver" />
          </dt>
          <dd>退款/售后</dd>
        </dl>
      </div>
    </div>
    <div class="m_bottom">
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
import { _getUid, _getUserInfo } from "../../api/home.js";
import { _getawaitPay } from "../../api/order.js";
export default {
  data() {
    return {
      userInfo: {}, //用户信息
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      showSecondList: false, //是否显示下拉列表
      awaitPay: null, //待付款
      alrightSend: null //已发货
    };
  },
  mounted() {
    this.getUserUid();
    this.getawaitPay();
    this.getalrightSend()
  },
  methods: {
    getUserUid() {
      //拿用户uid

      _getUid({ token: $cookies.get("token") }).then(res => {
        if (res.data.code) {
          this.getUserInfo(res.data.uid.uid);
        }
      });
    },
    getUserInfo(uid) {
      //拿用户信息

      _getUserInfo({ uid: uid }).then(res => {
        if (res.data.code) {
          this.userInfo = res.data.data;
        }
      });
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    showSecond() {
      //显示下拉菜单
      this.showSecondList = !this.showSecondList;
    },
    exit() {
      //退出登录
      this.$cookies.remove("token");
      this.$cookies.remove("uid");

      this.$router.push("/login"); //跳转到登录页面
    },
    getawaitPay() {
      //拿待付款数据
      this.getNum(1);
    },
    getalrightSend() {
      //已发货数据
      this.getNum(2);
    },
    getNum(little) {
      //拿待付款和已发货的数量
      _getawaitPay({ uid: this.$cookies.get("uid"), status: little }).then(res => {
        
        if (res.data.code) {
          let num = res.data.result.map(item => JSON.parse(item.list)).flat().length
      
          if (little === 1) {
            this.awaitPay = num;
          } else {
            this.alrightSend = num;
          }
 
        }
      });
    }
  }
};
</script>
<style lang="scss">
.logi_span{
  color: orangered;
  font-weight: 800;
}
</style>
