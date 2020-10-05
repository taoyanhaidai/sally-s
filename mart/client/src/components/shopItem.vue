<template>
    <dl class="shopItem">
        <van-checkbox v-model="checked" ></van-checkbox>
        <van-card
            :num="item.num"
            :price="item.sale_price"
            :desc="item.desc"
            :title="item.pname"
            :thumb="item.imgUrl"
        >
        
            <template #tags>
               
                <van-tag plain type="danger">{{item.mode}}</van-tag>

            </template>
            <template #footer>
                <van-button size="mini">-</van-button>
                <van-button size="mini" @click="add">+</van-button>
            </template>
        </van-card>
    </dl>
</template>
<script>
export default {
  props: ["item"],
  data() {
      return {
          checked:false
      }
  },
  methods: {
    // sert(){ //加入购物车
    //     this.$store.dispatch('add',this.item)
    // }
    add(){
    
        this.$store.dispatch('add',this.item)
    
    }
  }
};
</script>
<style >
.shopItem{
    width: 100%;
    display: flex;
}
.van-card{
    flex: 1;
    margin: 10px;
}
</style>
