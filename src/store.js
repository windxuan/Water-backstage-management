import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disabled: false, // 第三弹框编辑禁用状态
    dialogVisible: true, // 弹框显示隐藏的状态 -- 默认为隐藏
    token: '',
    firstListData: [],
    secondListData: [],
    thirdListData: [],
  },
  getters: {},
  mutations: {
    // 获取 token
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    // 因子Tab数据
    getFactorData() {
      // 获取Factor请求数据
      axios.get('http://192.168.6.163:8080/api/factor')
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
