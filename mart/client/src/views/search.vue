<template>
    <div class="searchPage">
        <h3><span @click="()=>{$router.go(-1)}">&lt;</span>校园超市</h3>
        <van-search  @clear="clear" v-model="value" @input="inputEvent" show-action  placeholder="请输入搜索关键词">
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        <div class="s_con" v-show="!value">
            <div class="s_header">
                <span>历史搜索</span>
                <span @click="clearHistory">清空历史记录</span>
            </div>
            <ul>
                <li v-for="(item,index) in historyList" :key="index" @click="onHistory(item)">{{item}}</li>
            </ul>
        </div>
        
        <div class="s_lis" v-show="value && searchList.length">
            <Item v-for="(item,index) in searchList" :key="index" :item="item"></Item>
        </div>
        <van-empty image="search" v-show="showError" description="没有搜索到呢~~" />
    </div>
</template>
<script>
import { _searchPro } from "../api/product.js";
import Item from "../components/Item.vue";
export default {
  // name:'search',
  data() {
    return {
      value: "", //搜索的内容
      historyList: JSON.parse(localStorage.getItem("history")), //历史搜索记录
      searchList: [], //搜索到的数据
      showError:false //没有搜索到
    };
  },
  components: {
    Item
  },
  methods: {
 inputEvent(){
     if(this.value === ""){
         this.searchList = [];
         this.showError = false
     }
 },
    onSearch() {
      //点击搜索
      //存历史搜索
      let con = JSON.parse(localStorage.getItem("history")) || [this.value];
      let isExist = con.some(item => {
        return item === this.value;
      });
      !isExist ? con.push(this.value) : "";
      localStorage.setItem("history", JSON.stringify(con));

      this.find(this.value);
   
      this.historyList = con;
    },
    find(value) {
      //查找值

      _searchPro({ value: value }).then(res => {
        if (res.data.code) {
          this.searchList = res.data.result;
        }else{
            this.searchList = []
            this.showError = true
        }
      });
    },
    clearHistory() {
      //清空历史记录
      localStorage.removeItem("history");
      this.historyList = [];
      
    },
    clear(){
      
        this.searchList = []
    },
    onHistory(item){ //点击历史记录

        this.value = item 
        this.onSearch()
    }
  }
};
</script>
