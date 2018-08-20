<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="因子" name="first">
      <first></first>
    </el-tab-pane>
    <el-tab-pane label="方法" name="second">
      <second></second>
    </el-tab-pane>
    <el-tab-pane label="分析" name="third">
      <third></third>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// 导入子组件
import first from '.././views/first.vue';
import second from '.././views/second.vue';
import third from '.././views/third.vue';

export default {
  data() {
    return {
      activeName: 'first',
    };
  },
  components: {
    first,
    second,
    third,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less">
nav{
    width:600px;
    background:#eeeeee;
    padding:0 10px;
    >a {
        text-decoration: none;
        color:#000;
        display: inline-block;
        width:150px;
        text-align:center;
        background:#aaaaaa;
        padding:10px;
    }
}
</style>
