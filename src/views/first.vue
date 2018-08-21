<template>
    <div class="factor">
        我是第一个子组件
        <div class="container">
            <!-- 新增 -->
            <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="increase()">新增</el-button>
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
        :current-page="staffCurrentPage"
        :page-sizes="[8 , 16, 32, staffTotalCount]"
        :page-size="staffPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="staffTotalCount">
        </el-pagination>

        <!-- 表格 -->
        <!-- 报数据渲染数据 -->
        <!-- el-table -- 报入总数据 : listData -->
        <el-table
        stripe
        :data="listData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        height="600"
        style="height: 100%;margin-left: auto; margin-right: auto;text-align: center;">

        <!-- 第一行：key -->
        <el-table-column
        prop="date"
        label="key"
        width="180">
        </el-table-column>

        <!-- 第二行：名称 -->
        <el-table-column
        prop="name"
        label="名称"
        width="480">
        </el-table-column>

        <!-- 第三行：别名 -->
        <el-table-column
        prop="name"
        label="别名"
        width="180">
        </el-table-column>

        <!-- 第四行：标准号 -->
        <el-table-column
        prop="standard"
        label="标准号"
        width="180">
        </el-table-column>

        <!-- 第五行：优先级 -->
        <el-table-column
        prop="priority"
        label="优先级"
        width="180">
        </el-table-column>

        <!-- 第六行：操作 -->
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
      input: '', // 模糊查询框
      staffPageSize: 8, // 每页显示多少条数据 -- 默认为8条
      staffCurrentPage: 1, // 第几页 -- 默认在第一页
      staffTotalCount: 0, // 表示显示页码总数
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
      this.getData(); // 重新获取数据
      this.staffCurrentPage = 1; // 分页回到第一页
    },
    // 功能: 数据获取
    getData() {
      this.tableLoading = true; // 开启table刷新动态效果
      // 开始获取后台数据
      // this.$store.dispatch('getFactorData');
      // 因子Tab数据
      // 获取Factor请求数据
      this.$http.get('/api/factor', {
        responseType: 'json', // 将数据json格式转化为对象
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then((response) => { // 请求成功
          if (response) {
            console.log(response);
            console.log('成功!');
            // this.pushData(response); // 开启数据渲染
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
    pushData() { // 数据处理函数
      
    },
    handleSizeChange(val) { // 改变每页显示条数
      this.staffPageSize = val;
    },
    handleCurrentChange(val) { // 改变当前页码
      this.staffCurrentPage = val;
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
