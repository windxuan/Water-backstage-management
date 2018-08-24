import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '', // 获取token
    disabled: false, // 第三弹框编辑禁用状态 -- 默认为不禁用
    dialogVisible: false, // 新增弹框
    editDialogVisible: false, // 编辑弹框
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
  actions: {},
});
