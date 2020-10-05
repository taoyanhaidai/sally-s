<template>
    <div class="index">
        <div id="content">
            <router-view/>
        </div>
        <div id="nav">
            <router-link to="/index/home">首页</router-link>
            <router-link to="/index/classify">分类</router-link>
            <router-link to="/index/shop">购物车</router-link>
            <router-link to="/index/my">我的</router-link>
        </div>
    </div>
</template>
<script>
export default {};
</script>