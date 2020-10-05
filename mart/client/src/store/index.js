import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCheck:false,//全选
    shopList: [], //购物车数组
    pos:'请选择地址', //定位的地址
    saveAddress:{}, //保存的地址
    loading:false
  },
  mutations: {
    loading (state,extra) { //loading效果
			state.loading = extra
	
		},
    saveAddress(state,item){ //保存地址
      let newSaveAddress = JSON.parse(JSON.stringify(state.saveAddress));
      newSaveAddress = item
      state.saveAddress = newSaveAddress

      let newPos = JSON.parse(JSON.stringify(state.pos)); //深拷贝
      newPos = '送至：'+`${item.province}${item.city}${item.county}`;
      state.pos = newPos;
    },
    changePos(state,val){ //定位的地址
      let newPos = JSON.parse(JSON.stringify(state.pos)); //深拷贝
      newPos = '送至：'+val;
      state.pos = newPos;
    },
    addShop(state, item) { //添加数据到购物车数组

      const isExists = state.shopList.filter((ites, index) => { return ites.pid === item.pid }) //判断是否存在
      if (isExists.length <= 0) {
       
          item['num'] = 1
          item['isCheck'] = item.isCheck || false
          state.shopList.push(item)
        
          
        }else{
          state.shopList.forEach((ite, index) => {
            if (ite.pid === item.pid) {
              ++ite.num
            }
          })
        }

    },
    add(state,{index,val}){
      let newShop = JSON.parse(JSON.stringify(state.shopList)) //深拷贝
      newShop[index].num+=val
      newShop[index].num <=1?newShop[index].num=1:newShop[index].num
      state.shopList = newShop
    
    },
    changeAllCheck(state){ //改变全选状态
      let newAllCheck = JSON.parse(JSON.stringify(state.allCheck))
      newAllCheck = !newAllCheck
      state.allCheck = newAllCheck

      let newShop = JSON.parse(JSON.stringify(state.shopList))
      newShop.forEach((item,index)=>{
        item.isCheck = state.allCheck
      })
      state.shopList = newShop
    },
    oneCheck(state,index){ //单选
      let newShop = JSON.parse(JSON.stringify(state.shopList))
      let newAllCheck = JSON.parse(JSON.stringify(state.allCheck))
      newShop[index].isCheck = !newShop[index].isCheck
      newAllCheck = newShop.every((item)=>item.isCheck) //更改全选值
      state.allCheck = newAllCheck
      state.shopList = newShop
      
    },
    delShop(state,list){ //删除商品
      let newShopList = JSON.parse(JSON.stringify(state.shopList));
      for(let i = 0;i<newShopList.length;i++){
        for(let j = 0;j<list.length;j++){
          if(newShopList[i].pid === list[j].pid){

            newShopList.splice(i,1)
          }
        }
      }
      state.shopList = newShopList

    },
    changeStatus(state){ //改变商品列表以及全选按钮的选中状态
      let newShopList = JSON.parse(JSON.stringify(state.shopList));
      let newAllCheck = JSON.parse(JSON.stringify(state.allCheck));
      newShopList.forEach(item=>item.isCheck=false)
      newAllCheck = false
      state.shopList = newShopList
      state.allCheck = newAllCheck
    }
  },
  actions: {
    add({ commit }, item) {

      commit('addShop', item)

    }
  },
  modules: {
  }
})
