<template>
    <div class="factor">
        我是第一个子组件
        <div class="container">
            <!-- 新增 -->
            <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="isPop()">新增</el-button>
            <!-- 按模糊查询 -->
            <el-input class="ipt-factor" v-model="input" size="medium" placeholder="按输入名称查找"></el-input>
            <!-- 重置 -->
            <el-button class="btn-reset" size="medium" @click="reset()" :loading="refreshLoading">重置</el-button>
            <!-- 查找 -->
            <el-button class="btn-searth" type="primary" size="medium" icon="el-icon-search" @click="searth()">查找</el-button>
        </div>
        <!-- 分页 -->
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

        <!-- 表格 -->
        <!-- 报数据渲染数据 -->
        <!-- el-table -- 报入总数据 : listData -->
        <el-table
        stripe
        border
        :data="listData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        height="600"
        style="height: 100%;margin-left: auto; margin-right: auto;text-align: left;">

        <!-- 第一行：key -->
        <el-table-column
        prop="id"
        label="key">
        </el-table-column>

        <!-- 第二行：名称 -->
        <el-table-column
        prop="title"
        label="名称">
        </el-table-column>

        <!-- 第三行：标准号 -->
        <el-table-column
        prop="sn"
        label="标准号">
        </el-table-column>

        <!-- 第四行：发布日期 -->
        <el-table-column
        prop="issued_at"
        label="发布日期">
        </el-table-column>

        <!-- 第五行：失效日期 -->
        <el-table-column
        prop="expire_at"
        label="失效日期">
        </el-table-column>

        <!-- 第六行：版本 -->
        <el-table-column
        prop="version"
        label="版本">
        </el-table-column>

        <!-- 第七行：优先级 -->
        <el-table-column
        prop="weight"
        label="优先级">
        </el-table-column>

        <!-- 第八行：操作 -->
        <!-- 编辑 -- handleEdit -->
        <!-- 删除 -- handleDelete -->
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

      <div class="methodDialog">
      <!-- dialog -->
       <!-- 这里是methodDialog方法弹框内容 -->
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
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      listData: [], // 源数据
      current_page: 1, // 当前分页 -- 默认为第1页
      pageSize: 15, // 当前页面数据数 -- 当前后台分页默认为单页15条
      total: 0, // 当前页面数据总数 -- 默认为0: --从后台获取到数据总数
      currentData: [],
      input: '', // 模糊查询框
      // staffCurrentPage: 1, // 第几页 -- 默认在第一页
      refreshLoading: false, // 按钮的loadding旋转效果 -- 默认为 -- false
      tableLoading: false, // 表单的loadding旋转效果 -- 默认为 -- true
      tempData: [], // 存放源数据
      result: [],// 存放满足查询条件的数据
    };
  },
  computed: {
    ...mapState(['token']), // 获取到token
  },
  created() {
    this.getData(); // 在页面开始时获取导数据
  },
  methods: {
    // 功能:重置
    reset() { // 刷新函数
      this.refreshLoading = true; // 开启loading效果
      this.current_page = 1; // 分页回到第一页
      this.getData(); // 重新获取数据
    },
    // 功能: 数据获取
    getData() {
      this.tableLoading = true; // 开启table刷新动态效果
      // 开始获取后台数据
      // 获取Factor请求数据
      console.log(this.$store.state.token);
      console.log(this.current_page);
      this.$http.get('/api/method', {
        // responseType: 'json', // 将数据json格式转化为对象  
        params: {
          page: this.current_page, // 获取到分页页数 -- 后台已分页 -- 数据量过大时依据后台分页
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${this.$store.state.token}`,
        },
      })
        .then((response) => { // 请求成功
          if (response) {
            console.log(response);
            console.log(response.data);
            // console.log('成功!');
            this.pushData(response.data); // 开启数据渲染
            this.tableLoading = false; // 关闭列表loading
            this.refreshLoading = false; // 关闭按钮loading
          }
        })
        .catch((error) => { // 报出异常
          console.log(error);
          console.log('错误!');
          if (error.response.data.message) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error('服务器连接错误！');
            this.refreshLoading = false;
          }
        });
    },
    pushData(data) { // 数据处理函数
      this.listData.splice(0, this.listData.length); // 1.清空数组
      this.pageSize = data.per_page; // 2.获取当前页面数据数 per_page
      this.total = data.total; // 3.获取数据总数 total
      // 开启循环: 循环遍历当页数据
      for (var i = 0;i < data.data.length; i++) {
        this.currentData = []; // 设置一个空数组
        this.currentData = data.data[i]; // 将循环遍历的数据传入数组
        // console.log(this.currentData);
        this.listData.push({
          id : this.currentData.id, // key
          title : this.currentData.title, // 名称
          sn : this.currentData.sn, // 标准号
          issued_at : this.currentData.issued_at, // 发布日期
          expire_at : this.currentData.expire_at, // 失效日期
          version : this.currentData.version, // 版本
          weight : this.currentData.weight, // 优先级
        });
        // console.log(this.listData);
      };
      // console.log(this.listData);
    },
    handleSizeChange(val) { // 改变每页显示条数
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) { // 改变当前页码
      console.log(val);
      this.current_page = val;
      this.getData(); // 每一次点击改变页码都获取一次数据，并重新渲染
    },
    handleEdit(index, row) { // 编辑
      console.log(index, row);
    },
    handleDelete(index) { // 删除
      this.listData = this.listData.splice(index, 1);
    },
    ...mapMutations(['setToken']),
  },
};
</script>
<style lang="less">
.factor {
    font-family: "Microsoft YaHei";
    >.container {
        width: 100%;
        height: 65px;
        border: 1px solid #000;
        >.increase {
            margin-top: 20px;
            border: 1px solid #eee;
            float: left;
        }
        >.btn-searth,.btn-reset {
            margin-top: 20px;
            border: 1px solid #666;
            float: right;
        }
        >.ipt-factor {
            border: 1px solid #eee;
            margin-top: 20px;
            width: 250px;
        }
    }
    >.el-pagination {
        margin-top: 10px;
        border: 1px solid #000;
        float: right;
    }
}
</style>