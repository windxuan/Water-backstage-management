<template>
    <div class="analyse">
        我是第三个子组件
        <div class="container">
          <!-- 新增 -->
          <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="isPop()">新增</el-button>
          <!-- 因子 --查询 -->
          因子<el-input class="ipt-factor" size="medium" placeholder="按输入名称查找"></el-input>
          <!-- 方法 --查询 -->
          查询<el-input class="ipt-query" size="medium" placeholder="按输入名称查找"></el-input>
          <!-- 重置 -->
          <el-button class="btn-reset" size="medium" @click="reset()">重置</el-button>
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
        border
        stripe
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

        <!-- 第二行：因子 -->
        <el-table-column
        prop="factor_title"
        label="因子">
        </el-table-column>

        <!-- 第三行：方法 -->
        <el-table-column
        prop="method_title"
        label="方法">
        </el-table-column>

        <!-- 第四行：章节 -->
        <el-table-column
        prop="chapter"
        label="章节">
        </el-table-column>

        <!-- 第五行：单位 -->
        <el-table-column
        prop="uom"
        label="单位">
        </el-table-column>

        <!-- 第六行：有效位数 -->
        <el-table-column
        prop="significand"
        label="有效位数">
        </el-table-column>

        <!-- 第七行：精度 -->
        <el-table-column
        prop="decimals"
        label="精度">
        </el-table-column>

        <!-- 第八行：优先级 -->
        <el-table-column
        prop="weight"
        label="优先级">
        </el-table-column>

        <!-- 第九行：操作 -->
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

      <!-- Dialog弹框内容 -->
      <factor-dialog></factor-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

// 导入子组件
import factorDialog from './dialogList/factorDialog.vue';

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
  components: {
    factorDialog, // Dialog弹框内容 -- 提取为因子子组件
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
      this.$http.get('/api/analyse', {
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
          factor_title : this.currentData.factor_title, // 因子
          method_title : this.currentData.method_title, // 方法
          chapter : this.currentData.chapter, // 章节
          uom : this.currentData.uom, // 单位
          significand : this.currentData.significand, // 有效位数
          decimals : this.currentData.decimals, // 精度
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
.analyse {
    font-family: "Microsoft YaHei";
    color: #000;
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
        >.el-input {
            margin-top: 20px;
            width: 225px;
        }
    }
    >.el-pagination {
        margin-top: 10px;
        border: 1px solid #000;
        float: right;
    }
}
</style>
