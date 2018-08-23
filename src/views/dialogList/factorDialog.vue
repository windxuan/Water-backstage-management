<template>
    <div class="analyseDialog">
      <!-- dialog -->
       <!-- 这里是factorDialog因子弹框内容 -->
      <el-dialog
      title="add"
      :visible.sync="dialogVisible"
      @close="close"
      width="28%">
      <el-form
       :model="ruleForm"
       :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="right">

        <!-- 名称 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <!-- 标准号 -->
        <el-form-item label="标准号">
          <el-input v-model="ruleForm.sn"></el-input>
        </el-form-item>

        <!-- 别名 -->
        <el-form-item label="别名">
          <el-input v-model="ruleForm.alias"></el-input>
        </el-form-item>

        <!-- 优先级 -->
        <el-form-item label="weight">
          <el-input v-model="ruleForm.weight"></el-input>
        </el-form-item>
      </el-form>

      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addDataList()">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    dialogVisible: Boolean, // 此处用来接收父组件中的值
  },
  data() {
    return {
      ruleForm: {
        title: '', // 名称
        sn: '', // 标准号
        alias: '', // 别名
        weight: '', // 优先级
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    this.$emit('isPopEvent');
  },
  methods: {
    close () {
      this.$emit('dialogHide')
    },
    addDataList() { // 新增
      // 发送请求：发送数据 -- 发请求给后台 -- 关闭弹框
      console.log('新增');
    },
  },
};
</script>
<style lang="less">
</style>
