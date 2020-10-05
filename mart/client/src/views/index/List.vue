<template>
    <div class="list">
        <div class="l_address">
            <van-icon name="location" />
            <div>
                <p>{{saveAddress.auser}}<span>{{saveAddress.mobile}}</span></p>
                <p>{{saveAddress.province}}{{saveAddress.city}}{{saveAddress.county}}{{saveAddress.street}}</p>
                <p>收获不便时，可选择暂存服务..</p>
            </div>
            <van-icon
                name="arrow"
                @click="$router.push({
                path:'/position',
                query:{pathname:$route.fullPath}
                })"
            />
        </div>
        <div class="l_list">
            <div class="l_item">
                <van-card
                    v-for="(item,index) in shopList.filter(item=>item.isCheck)"
                    :key="index"
                    :num="item.num"
                    :price="item.sale_price"
                    :desc="item.desc"
                    :title="item.pname"
                    :thumb="item.imgUrl"
                />
                <p>配送方式：普通配送</p>
                <p>运费险：未选择</p>
                <p>订单备注：我不需要备注</p>
            </div>

        </div>
        <van-submit-bar
            :price="allPrice"
            button-text="提交订单"
            @submit="onSubmit"
        />

    </div>
</template>
<script>
import { mapState } from "vuex";
import {Dialog} from 'vant'
import gaterItem from "../../components/gaterItem.vue";
import Item from "../../components/Item.vue";
import { _addOrder } from "../../api/order.js";
export default {
  name: "list",
  data() {
    return {
      list:[], //提交订单商品列表
    };
  },
  computed: {
    ...mapState(["shopList", "saveAddress"]),

    allPrice() {
      return (
        this.shopList
          .map((item, index) => {
            if (item.isCheck) {
              return item.num * item.sale_price;
            } else {
              return 0;
            }
          })
          .reduce((a, b) => {
            return a + b;
          }, 0) * 100
      );
    },
    allNum() {
      return (
          this.shopList.filter(item => item.isCheck).reduce((a, b) => {
        return a += b.num;
      },0)
      )
    }
  },
  mounted() {
      this.list = this.shopList.filter(item => item.isCheck)
  },
  methods: {
   onSubmit() {
      Dialog.confirm({
        title: "确认付款",
      })
        .then(() => {
          this.success();
       
        })
        .catch((err) => {
 
         this.cancel()
        });
    },
    success(){ //提交成功，保存订单 status为2

          let params = {
            list: JSON.stringify(this.list),
            aid: this.saveAddress.aid,
            uid: this.saveAddress.uid,
            summary: this.allPrice/100,
            total: this.allNum,
            status: 2
          };
 
          _addOrder(params).then(res => {
 
            if(res.data.code){
                this.$toast.success('支付成功')
                this.$router.push('/index/my')
            }
          });
          //把提交的商品删除
          this.$store.commit('delShop',this.list)
    },
    cancel(){ //取消 
          let params = {
            list: JSON.stringify(this.list),
            aid: this.saveAddress.aid,
            uid: this.$cookies.get('uid'),
            summary: this.allPrice/100,
            total: this.allNum,
            status: 1
          };
 
          _addOrder(params).then(res => {

            if(res.data.code){
                this.$toast.success('记得付款哦~~')
                this.$router.push('/index/my')
            }
          });
          //把提交的商品删除
          this.$store.commit('delShop',this.list)
    }
  }
};
</script>