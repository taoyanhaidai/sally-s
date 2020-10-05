<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-07-21 10:35:38
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-08 11:03:10
-->
<template>
  <div class="home">
    <h3>校园超市</h3>
    <div class="search">
      <van-cell-group>
        <van-field :placeholder="this.$store.state.pos" @click="$router.push('/search')"/>
      </van-cell-group>
      <i class="iconfont icon-fangdajing"></i>
    </div>
    
    <div>
      <van-swipe class="my-swipe" height=".2rem" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.img" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="t_nav">
        <van-tabs @click="onClick">
          <van-tab v-for="(item,index) in tabList" :key="index" :title="item.t_text"></van-tab>
        </van-tabs>
      </div>
    
      
      <div class="t_content">
        <Item v-for="(item,index) in changeList" :key="index" :item="item"></Item>
      </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { _getCarousel, _getTabList, _getProductByOne } from "../../api/home.js";
import Item from "../../components/Item.vue";

export default {
  name: "Home",
  data() {
    return {
      bannerList: [], //轮播图列表
      tabList: [], //nav列表
      currentIndex: 0, //切换
      changeList: [] //切换列表
    };
  },
  mounted() {
    this.getCarouselList();
    this.getTabList();
    this.getProductByOne();
  },
  methods: {
    getCarouselList() {
      //拿轮播图数据
      _getCarousel().then(res => {
        if (res.data.code) {
          this.bannerList = res.data.result;
        }
      });
    },
    getTabList() {
      //拿一级分类
      _getTabList().then(res => {
        if (res.data.code) {
          this.tabList = res.data.result;
        }
      });
    },
    getProductByOne() {
      //通过一级分类拿商品数据

      _getProductByOne({ t_type: this.currentIndex }).then(res => {
        if (res.data.code) {
          this.changeList = res.data.result;
        }
      });
    },
    onClick(ind) {
      this.currentIndex = ind;
      this.getProductByOne();
    }
  },
  components: {
    Item
  }
};
</script>
<style lang='scss'>
@import "../../assets/fonts/iconfont.css";
.van-field__body{
  min-width: 200px;
}
</style>

