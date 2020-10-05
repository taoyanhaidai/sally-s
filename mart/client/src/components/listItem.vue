<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-09-25 08:44:26
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-09-25 09:00:51
-->
<template>
    <div @click="$router.push(`/detail/${item.pid}`)">
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
                >自营</van-tag>
            </template>
            <template #footer>
                <van-button size="mini">评价</van-button>
                <van-button size="mini">删除</van-button>
            </template>
        </van-card>

    </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
      return {
          
      }
  },
};
</script>