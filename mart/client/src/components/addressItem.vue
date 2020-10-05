<template>
    <dl class="addressItem" @click="saveAddress">
        <van-radio :name="index"></van-radio>
        <div class="d_con">
            <p :style="{color:'black'}">{{item.auser}}</p>
            <p>{{item.mobile}}</p>
            <p><span>{{item.province}}</span><span>{{item.city}}</span><span>{{item.county}}</span><span>{{item.street}}</span></p>
        </div>
        <van-icon name="records" @click.stop="parents"/>
    </dl>
</template>
<script>
export default {
    props:["item","index"],
    methods:{
        parents(){

            this.$emit('isShowAlert',{
                type:'edit',
                item:this.item,
                aid:this.item.aid
            })
        },
        saveAddress(){
            // console.log(this)
            this.$emit('saveAddress',{item:this.item,index:this.index})
        }
    }
}
</script>
<style>

</style>
