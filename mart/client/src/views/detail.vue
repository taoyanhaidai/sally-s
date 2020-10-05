<template>
  <div class="detail">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="d_price">
      <p>
        ￥{{detaiData.original_price}}
        <span
          :style="{marginLeft:'.1rem',textDecoration: 'line-through',color:'#ccc'}"
        >￥{{detaiData.sale_price}}</span>
      </p>
      <p>累计销售{{detaiData.sales}}</p>
    </div>
    <div class="d_tit">
      <h2>{{detaiData.pname}}</h2>
      <van-cell title="分享好友" @click="showShare = true"/>
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect"/>
    </div>
    <div class="d_comment">
      <h3>商品评价 ( {{commentList.length}} )</h3>
      <dl v-for="(item,index) in commentList" :key="index">
        <p>{{item.uname}}</p>
        <p>星级：
          <van-rate
            :v-model="item.score"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="yellow"
          />
          <span>{{item.score>=3?'很满意':'一般'}}</span>
        </p>
        <p>{{item.cont}}</p>
      </dl>
    </div>
    <div class="d_like">
      <h3>猜你喜欢</h3>
      <dl v-for="(item,index) in commentList" :key="index">
        
      </dl>
    </div>
    <div class="d_nav">
      <van-goods-action>
        <van-goods-action-icon icon="shop-o" text="首页" @click="onClickIcon"/>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/index/shop')"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton"/>
        <van-goods-action-button type="danger" text="立即购买" @click="buyNow"/>
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { _getCarousel, _getDetaiData, _getComment } from "../api/home.js";
import { log } from "util";
export default {
  data() {
    return {
      bannerList: [], //轮播图数据
      detaiData: [], //详情数据
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ],
      commentList: [] //用户评论列表
    };
  },
  mounted() {
    this.getCarousel();
    this.getItems();
    this.getComment();
  
  },
  methods: {
    getCarousel() {
      //拿轮播数据
      _getCarousel().then(res => {
        if (res.data.code) {
          this.bannerList = res.data.result;
        }
      });
    },
    getItems() {
      //拿详情数据

      _getDetaiData({ pid: this.$route.params.id }).then(res => {
        if (res.data.code) {
          this.detaiData = res.data.result[0];
        }
      });
    },
    getComment() {
      //拿商品评论
      _getComment({ pid: this.$route.params.id }).then(res => {
        if (res.data.code) {
          this.commentList = res.data.result;
        }
      });
    },
    onSelect(option) {
      this.showShare = false;
    },
    onClickIcon() {
      
      this.$router.push('/index')
    },

    onClickButton() { //加入购物车
      
      this.$store.commit('addShop',this.detaiData);
    },
    buyNow(){ //立即购买

      this.$store.commit('addShop',Object.assign(this.detaiData,{isCheck:true}));
      this.$router.push("/index/list")
    }
  }
};
</script>