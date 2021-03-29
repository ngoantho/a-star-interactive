import Vue from "vue";
import App from "./App.vue";
import "es6-promise/auto";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    showCellCost: false,
  },
  mutations: {
    setShowCellCost(state, newOp) {
      state.showCellCost = newOp;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
