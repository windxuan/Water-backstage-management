import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '', // 获取token
    disabled: false, // 第三弹框编辑禁用状态 -- 默认为不禁用
    dialogVisible: false, // 弹框显示隐藏的状态 -- 默认为隐藏
    firstListData: [], // 因子列表数据
    secondListData: [], // 方法列表数据
    thirdListData: [], // 分析列表数据
  },
  getters: {},
  mutations: {
    // 获取 token
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
  //   // 因子Tab数据
  //   getFactorData(state) {
  //     // 获取Factor请求数据
  //     this.$http.get('/api/factor', {
  //       responseType: 'json', // 将数据json格式转化为对象
  //       timeout: 5000, // 请求时间在5秒内
  //       headers: {
  //         Authorization: state.token,
  //       },
  //     })
  //       .then((response) => { // 请求成功
  //         if (response) {
  //           console.log(response);
  //           console.log('成功!');
  //           this.pushData(response); // 开启数据渲染
  //           this.tableLoading = false; // 关闭列表loading
  //           this.refreshLoading = false; // 关闭按钮loading
  //         }
  //       })
  //       .catch((error) => { // 报出异常
  //         console.log(error);
  //         console.log('错误!');
  //         if (error.response.data.message) {
  //           this.$message.error(error.response.data.message);
  //         } else {
  //           this.$message.error('服务器连接错误！');
  //           this.refreshLoading = false;
  //         }
  //       });
  //   },
    // 方法Tab数据
    getMethodData(state) {
      // 获取Method请求数据
      this.$http.get('/api/method', {
        responseType: 'json', // 将数据json格式转化为对象
        timeout: 5000, // 请求时间在5秒内
        headers: {
          Authorization: state.token,
        },
      })
        .then((response) => { // 请求成功
          console.log(response);
        })
        .catch((error) => { // 爆出异常
          console.log(error);
        });
    },
    // 分析Tab数据
    getAnalyseData(state) {
      // 获取Analyse请求数据
      this.$http.get('/api/analyse', {
        responseType: 'json', // 将数据json格式转化为对象
        timeout: 5000, // 请求时间在5秒内
        headers: {
          Authorization: state.token,
        },
      })
        .then((response) => { // 请求成功
          console.log(response);
        })
        .catch((error) => { // 爆出异常
          console.log(error);
        });
    },
  },
});
