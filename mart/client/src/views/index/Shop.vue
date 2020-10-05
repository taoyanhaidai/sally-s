<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-09-08 11:03:54
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-17 11:06:48
-->
<template>
  <div class="shop">
    <h3>校园超市</h3>
    <div
      class="s_content"
      v-show="shopList.length"
    >

      <div
        v-for="(item,index) in shopList"
        :key="index"
        class="shopItem"
      >
        <van-checkbox
          :value="item.isCheck"
          @click="oneCheck(index)"
        ></van-checkbox>
        <van-card
          :num="item.num"
          :price="item.sale_price"
          :desc="item.desc"
          :title="item.pname"
          :thumb="item.imgUrl"
        >

          <template #tags>

            <van-tag
              plain
              type="danger"
            >{{item.mode}}</van-tag>

          </template>
          <template #footer>
            <van-button
              size="mini"
              @click="add(index,-1)"
            >-</van-button>

            <van-button
              size="mini"
              @click="add(index,1)"
            >+</van-button>
          </template>
        </van-card>
      </div>

    </div>
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="什么都没有呢~什么都没了意义~"
      v-show="!shopList.length"
    />
    <van-submit-bar
      :price="allPrice"
      button-text="结算"
      @submit="onSubmit"
      v-show="shopList.length"
    >
      <van-checkbox
        :value="allCheck"
        @click="changeAllCheck"
      >全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>

  </div>
</template>
<script>
import { mapState } from "vuex";
import shopItem from "../../components/shopItem.vue";
export default {
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      //点击结算

      this.$router.push("/index/list");
    },
    onClickEditAddress() {},
    add(index, val) {
      // console.log(item)
      this.$store.commit("add", { index, val });
    },
    changeAllCheck() {
      //全选
      this.$store.commit("changeAllCheck");
    },
    oneCheck(index) {
      //单选
      this.$store.commit("oneCheck", index);
    }
  },
  computed: {
    ...mapState(["shopList", "allCheck"]),
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
    }
  },
  mounted() {
    //初始化将所有的商品的选中状态变为false，全选状态变为false
    this.$store.commit('changeStatus')
  },
  components: {
    shopItem
  }
};
</script>
<style >
.shop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-submit-bar {
  position: absolute;
  bottom: 50px;
}
.s_content {
  width: 100%;
  height: calc(100% - 123px);
  overflow-y: scroll;
}
</style>
