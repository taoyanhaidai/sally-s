<template>
    <div class="allist">
        
        <div id="all_nav">
            <router-link tag="div" to="/index/allist/listall">全部</router-link>
            <router-link tag="div" to="/index/allist/listawit">待付款</router-link>
            <router-link tag="div" to="/index/allist/listsend">已发货</router-link>

        </div>
        <div id="all_content">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>