<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-09-24 20:44:42
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-25 08:59:33
-->
<template>
  <div>
    <div
      v-for="(item,index) in list"
      :key="item.pid+index"
    >
      <listItem :item="item"></listItem>
    </div>
  </div>
</template>
<script>
import { _getawaitPay } from "../../../api/order.js";
import listItem from "../../../components/listItem.vue";

export default {
  data() {
    return {
      list: []
    };
  },

  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      //拿全部订单的列表

      _getawaitPay({ uid: this.$cookies.get("uid") }).then(res => {
        if (res.data.code) {
          this.list = res.data.result.map(item => JSON.parse(item.list)).flat();
        }
      });
    }
  },
  components: {
    listItem
  }
};
</script>