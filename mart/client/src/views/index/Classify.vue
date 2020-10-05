<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-07-21 10:35:38
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-25 15:59:58
-->
<template>
  <div class="classify">
    <h3>校园超市</h3>
    <van-search placeholder="请输入搜索关键词" @click="$router.push('/search')"/>
    <div class="c_con">
      <div class="c_left">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item v-for="(item,index) in tabList" :key="index" :title="item.t_text"/>
        </van-sidebar>
      </div>
      <div class="c_right">
        <van-tabs @click="onClick">
          <van-tab title="全部"></van-tab>
          <van-tab v-for="(item,index) in sortList" :key="index" :title="item.s_text"></van-tab>
        </van-tabs>
        <div class="c_content">
          <Item v-for="(item,index) in content" :key="index" :item="item"></Item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getTabList, _getTwoList, _getProductByOne } from "../../api/home.js";
import Item from "../../components/Item.vue";
export default {
  components: {
    Item
  },
  data() {
    return {
      activeKey: 0,
      tabList: [], //一级分类
      sortList: [], //二级列表
      content: [] //请求的数据
    };
  },
  mounted() {
    this.getTabList();
  },
  methods: {
    onChange(index) {
      this.getTwoList();
      this.getAllproductList();
    },
    getTabList() {
      //拿一级分类
      _getTabList().then(res => {
        if (res.data.code) {
          this.tabList = res.data.result;

          this.getAllproductList();
        }
      });
      this.getTwoList(); //拿二级分类
    },
    getTwoList() {
      //拿二级分类
      _getTwoList({ t_type: this.activeKey }).then(res => {
        if (res.data.code) {
          this.sortList = res.data.result;
        }
      });
    },
    getAllproductList() {
      //拿商品数据
      _getProductByOne({ t_type: this.activeKey }).then(res => {
        if (res.data.code) {
          this.content = res.data.result;
        }
      });
    },
    getTabTwoList(index) {
      _getProductByOne({ s_type: index }).then(res => {
       
        if (res.data.code) {
        
          this.content = res.data.result;
        }else{
          alert('没有数据')
        }
      })
    },
    onClick(index) {
      //点击二级的切换
      if (index === 0) {
        this.getAllproductList();
      } else {
        this.getTabTwoList(this.sortList[index-1].s_type);
      }
    }
  }
};
</script>
