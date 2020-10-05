<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-09-17 11:08:30
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-18 08:11:57
-->
<template>
  <div class="pos">
    <h3>
      <span @click.stop="$router.push($route.query.pathname?$route.query.pathname:'/index/home')">&lt;</span>校园超市
    </h3>
    <div class="pos_search">
      <van-search
        v-model="value"
        show-action
        label="地址"
        placeholder="请输入搜索关键词"
        @input="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="pos_act" @click="currentLocation">定位到当前位置</div>
    <h5>历史记录</h5>
    <div
      class="pos_address"
      v-show="addressList.length"
    >
      <van-radio-group v-model="radio">
        <addressItem
          v-for="(item,index) in addressList"
          :key="index"
          :item="item"
          :index="index"
          @isShowAlert="(str)=>isShowAlert(str)"
          @saveAddress="(values)=>saveAddress(values)"
        ></addressItem>
      </van-radio-group>
    </div>
    <div v-show="!addressList.length">
      <van-empty
        image="error"
        description="您还没有收货地址哦！"
      />
    </div>
    <div></div>
    <div
      class="pos_add"
      @click="isShowAlert({type:'add'})"
    >新增地址</div>
    <div id="pos_map"></div>
    <dl
      id="p_content"
      v-if="visibe"
    >
      <li
        v-for="(item,index) in searchList"
        :key="index"
        @click="changeInput(item)"
      >
        <p>{{item.split(',')[0]}}</p>
        <p>{{item.split(',')[1]}}</p>
      </li>
    </dl>
    <!-- 新增或编辑地址 -->
    <div
      v-if="isShow"
      class="editAdd"
    >
      <h3>
        <span @click.stop="close">&lt;</span>校园超市
      </h3>
      <van-address-edit
        show-set-default
        show-search-result
        :show-delete="this.addOREdit === 'edit'"
        :area-list="areaList"
        :address-info="AddressInfo"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="(content)=>{onSave(content)}"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <h4 :style="{padding:'0 .1rem'}">选择地址
        <span
          @click="cancel"
          :style="{color:'red',float:'right'}"
        >取消</span>
      </h4>
      <div class="pop_content">
        <li
          v-for="(item,index) in searchList"
          :key="index"
          @click="changeInput(item)"
        >
          <p>{{item.split(',')[0]}}</p>
          <p>{{item.split(',')[1]}}</p>
        </li>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  _getAddress,
  _getEdit,
  _addAdress,
  _editAdressh,
  _delAddress
} from "../api/address.js";
import addressItem from "../components/addressItem.vue";
import editAddress from "../components/editAddress.vue";
import city from "../utils/city.js";

export default {
  data() {
    return {
      value: this.$store.state.pos || "",
      searchList: [], //查找的数据
      map: "",
      aid: "",
      addressList: [], //地址列表
      visibe: false,
      areaList: city(),
      isShow: false, //是否显示组件
      searchResult: [],
      addOREdit: "", //删除还是编辑
      AddressInfo: {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: ""
      },
      radio: "1",
      show: false //是否显示底部弹框
    };
  },
  computed: {},
  components: {
    addressItem,
    editAddress
  },
  mounted() {
    this.map = new BMapGL.Map("pos_map"); // 创建Map实例
    this.map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
    this.search("八维");
    this.getAddressList();
    this.$store.state.pos === "请选择地址"?this.show = true:'';//如果未保存地址，显示弹出框
    console.log(this.$store.state.pos)
  },
  methods: {
    currentLocation(){ //定位到当前位置
    this.search("八维");
    this.getAddressList();
    this.show = true
    },
    cancel() {
      //取消底部弹框
      this.show = false;
    },
    saveAddress({ item, index }) {
      //将地址保存到store
      this.$store.commit("saveAddress", item);
      this.radio = index;
      this.value = `${item.province}${item.city}${item.county}`;

      if (this.$route.query.pathname) {
        this.$router.push(this.$route.query.pathname);
      } else {
        this.$router.push("/index/home");
      }
    },
    close() {
      this.isShow = false;
    },
    isShowAlert({ type, item, aid }) {
      //显示弹框
      this.isShow = true;
      this.addOREdit = type;
      if (type === "add") {
        //如果是添加
        this.AddressInfo = {};
      } else {
        //如果是编辑
        this.AddressInfo = {
          name: item.auser,
          tel: item.mobile,
          province: item.province,
          city: item.city,
          county: item.county,
          addressDetail: item.street
        };

        this.aid = aid;
      }
    },
    getAddressList() {
      //拿地址列表

      _getAddress({ uid: this.$cookies.get("uid") }).then(res => {
        if (res.data.code) {
          this.addressList = res.data.result;
        }
      });
    },

    search(inputValue) {
      this.options = {
        onSearchComplete: results => {
          // 判断状态是否正确
          if (this.local.getStatus() == BMAP_STATUS_SUCCESS) {
            var s = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              s.push(
                results.getPoi(i).title + ", " + results.getPoi(i).address
              );
            }

            this.searchList = s;
          }
        }
      };
      this.local = new BMapGL.LocalSearch(this.map, this.options);
      this.local.search(inputValue);
    },
    onSearch(inputValue) {
      if (!inputValue || inputValue === "") {
        //如果值不存在
        this.search(""); //将搜索的值设置为空
        this.searchList = [];
        this.visibe = false;
      } else {
        this.search(inputValue);
        this.visibe = true;
      }
    },
    changeInput(item) {
      //点击地址
      this.show = false;
      this.isShowAlert({ type: "add" });
      this.AddressInfo = {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: item.split(",")[1]
      };
      this.visibe = false;
      this.value = item.split(",")[0];
      this.searchList = [];
      this.$store.commit("changePos", this.value);

      // this.$router.push("/index/home");
    },
    onSave(content) {
      let values = {
        auser: content.name,
        mobile: content.tel,
        street: content.addressDetail,
        province: content.province,
        city: content.city,
        county: content.county,
        uid: this.$cookies.get("uid"),
        aid: this.aid
      };

      if (this.addOREdit === "add") {
        //如果是添加

        _addAdress(values).then(res => {
          if (res.data.code) {
            this.$toast.success("添加成功");
            this.isShow = false;
            this.getAddressList();
          }
        });
      } else {
        //如果是编辑
        _editAdressh(values).then(res => {
          if (res.data.code) {
            this.$toast.success("编辑成功");
            this.isShow = false;
            this.getAddressList();
          }
        });
      }
    },
    onDelete() {
      //删除
      _delAddress({ aid: this.aid }).then(res => {

        if (res.data.code) {
          this.$toast.success("删除成功");
          this.isShow = false;
          this.getAddressList();
        }
      });
    },
    onChangeDetail() {}
  }
};
</script>

