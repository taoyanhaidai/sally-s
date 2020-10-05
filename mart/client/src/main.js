import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Vant from 'vant';
import {Dialog,CountDown,Notify,Popup,Empty,Toast,AddressEdit,Checkbox, CheckboxGroup,Card,SubmitBar,CouponCell, CouponList,Rate,Sidebar, SidebarItem,Search,GoodsAction, GoodsActionIcon, GoodsActionButton,ShareSheet,Field, Cell, Swipe, SwipeItem,Form,Button,Tab,Tabs,Icon } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueCookies);
Vue.use(Field);
Vue.use(Cell);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Form);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(ShareSheet);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Rate);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(AddressEdit);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Popup)
Vue.use(Notify);
Vue.use(CountDown);
Vue.use(Dialog)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


