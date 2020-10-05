<template>
    <dl class="item" @click="$router.push(`/detail/${item.pid}`)">
      
        <dt>
            <img :src="item.imgUrl" alt=""/>
        </dt>
        <dd>
            <h3>{{item.pname}}</h3>
            <p :style="{color:'#444'}">累计出售{{item.sales}}份</p>
            <p><span>{{item.mode}}</span></p>
            <p :style="{color:'red'}">￥{{item.original_price}}<span :style="{marginLeft:'.1rem',textDecoration: 'line-through',color:'#ccc'}">￥{{item.sale_price}}</span></p>
        </dd>
        <dd>
            <van-icon name="cart-circle-o" @click.stop="sert"/>
        </dd>
    </dl>
</template>
<script>

export default {
    props:['item'],
    methods:{
        sert(){ //加入购物车
     
            this.$store.dispatch('add',this.item)
        }
    },
     
}
</script>
