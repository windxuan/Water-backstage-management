import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firstListData: [],
    secondListData: [],
    thirdListData: [],
  },
  getters: {},
  mutations: {
  },
  actions: {
    // 因子Tab数据
    getFactorData() {
      // 获取Factor请求数据
      axios.get('http://192.168.6.163:8080/api/factor', {
        headers: { // 此处需要一个合法请求头
          // Authorization:  token,
        },
      })
        .then((response) => { // 请求成功
          console.log(response);
          console.log('成功!');
        })
        .catch((error) => { // 爆出异常
          console.log(error);
          console.log('错误!');
        });
    },
    // 方法Tab数据
    getMethodData() {
      // 获取Method请求数据
      axios.get('http://192.168.6.163:8080/api/method')
        .then((response) => { // 请求成功
          console.log(response);
        })
        .catch((error) => { // 爆出异常
          console.log(error);
        });
    },
    // 分析Tab数据
    getAnalyseData() {
      // 获取Analyse请求数据
      axios.get('http://192.168.6.163:8080/api/analyse')
        .then((response) => { // 请求成功
          console.log(response);
        })
        .catch((error) => { // 爆出异常
          console.log(error);
        });
    },
  },
});
