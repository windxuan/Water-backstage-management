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
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <!-- 标准号 -->
        <el-form-item label="标准号">
          <el-input v-model="ruleForm.standard"></el-input>
        </el-form-item>

        <!-- 版本 -->
        <el-form-item label="版本">
          <el-input v-model="ruleForm.version"></el-input>
        </el-form-item>

        <!-- 发布日期 -->
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="releaseDate"
            align="right"
            type="date"
            placeholder="请选择发布日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <!-- 失效日期 -->
        <el-form-item label="失效日期">
          <el-date-picker
            v-model="expiryDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
         name: '',      // 名称
         standard: '',  // 标准号
         version: '',   // 版本
         weight: '0',    // 权重
       },
       rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        releaseDate: '', //发布日期
        expiryDate: '',  //失效日期
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
