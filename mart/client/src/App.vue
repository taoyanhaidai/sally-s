<template>
  <div id="app">
    <router-view/>
    <div id="loading" v-show="loading">
    <van-loading class="loading" type="spinner" size="24px" />
 
  </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
   data(){
    return {
 
    }
  },

  computed : {
    ...mapState(["loading"])
 
  },

}
</script>
<style lang="scss">
// @import './scss/reset.scss';
@import './scss/style.scss';

*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}
html,body,#app{
  width: 100%;
  height: 100%;


}
body{
  font-size: 14px;
  
}
html{
  font-size: calc(100/375*100vw);
}
</style>
