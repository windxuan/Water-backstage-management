<template>
    <div class="analyseDialog">
      <!-- dialog -->
       这里是analyse分析弹框内容
      <el-dialog
      title="add"
      :visible.sync="dialogVisible"
      width="28%">
      <el-form
       :model="ruleForm"
       :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="right">

        <!-- 名称 -->
        <el-form-item label="名称" prop="title">
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

        <!-- 权重 -->
        <el-form-item label="权重">
          <el-input v-model="ruleForm.weight"></el-input>
        </el-form-item>

      </el-form>

      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: this.$store.state.dialogVisible,
      ruleForm: {
        title: '', // 名称
        sn: '', // 标准号
        alias: '', // 别名
        weight: '', // 优先级
      },
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
<style lang="less">
</style>
