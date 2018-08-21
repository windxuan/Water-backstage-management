<template>
    <div class="analyse">
        我是第三个子组件
        <div class="container">
          <!-- 新增 -->
          <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="increase()">新增</el-button>
          <!-- 因子 --查询 -->
          因子<el-input class="ipt-factor" v-model="inputFactor" size="medium" placeholder="按输入名称查找"></el-input>
          <!-- 方法 --查询 -->
          查询<el-input class="ipt-query" v-model="inputQuery" size="medium" placeholder="按输入名称查找"></el-input>
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
        :current-page="staffCurrentPage"
        :page-sizes="[8 , 16, 32, staffTotalCount]"
        :page-size="staffPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="staffTotalCount">
        </el-pagination>

        <!-- 表格 -->
        <!-- 报数据渲染数据 -->
        <!-- el-table -- 报入总数据 -->
        <el-table
        stripe
        :data="listData"
        style="width: 100%">

        <!-- 第一行：key -->
        <el-table-column
        prop="date"
        label="key"
        width="150">
        </el-table-column>

        <!-- 第二行：因子 -->
        <el-table-column
        prop="name"
        label="因子"
        width="280">
        </el-table-column>

        <!-- 第三行：方法 -->
        <el-table-column
        prop="name"
        label="方法"
        width="150">
        </el-table-column>

        <!-- 第四行：章节 -->
        <el-table-column
        prop="chapter"
        label="章节"
        width="150">
        </el-table-column>

        <!-- 第五行：单位 -->
        <el-table-column
        prop="standard"
        label="单位"
        width="150">
        </el-table-column>

        <!-- 第六行：有效位数 -->
        <el-table-column
        prop="digit"
        label="有效位数"
        width="150">
        </el-table-column>

        <!-- 第七行：精度 -->
        <el-table-column
        prop="precision"
        label="精度"
        width="150">
        </el-table-column>

        <!-- 第八行：优先级 -->
        <el-table-column
        prop="priority"
        label="优先级"
        width="150">
        </el-table-column>

        <!-- 第九行：操作 -->
        <!-- 编辑 -- handleEdit -->
        <!-- 删除 -- handleDelete -->
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

      <!-- Dialog弹框内容 -->
      <analyse-dialog></analyse-dialog>
    </div>
</template>
<script>
// 导入子组件
import analyseDialog from './dialogList/analyseDialog.vue';

export default {
  data() {
    return {
      listData: [ // 源数据
        {
          date: '01', // 因子
          name: '王小虎', // 方法
          chapter: '1518', // 章节
          standard: '11', // 单位
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0', // 优先级
        }, {
          date: '02',
          name: '王小虎',
          chapter: '1517',
          standard: '11',
          digit: '3',
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '03',
          name: '王小虎',
          chapter: '1519',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '04',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '05',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '06',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '07',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '08',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        }, {
          date: '09',
          name: '王小虎',
          chapter: '1516',
          standard: '11',
          digit: '3', // 有效位数
          precision: '1', // 精度
          priority: '0',
        },
      ],
      inputFactor: '', // 查询框
      inputQuery: '',
      staffPageSize: 8, // 每页显示多少条数据 -- 默认为8条
      staffCurrentPage: 1, // 第几页 -- 默认在第一页
      staffTotalCount: 0, // 表示显示页码总数
    };
  },
  components: {
    analyseDialog, // Dialog弹框内容 -- 提取为子组件 -- 分析analyseDialog
  },
  methods: {
    handleSizeChange(val) { // 改变每页显示条数
      this.staffPageSize = val;
    },
    handleCurrentChange(val) { // 改变当前页码
      this.staffCurrentPage = val;
    },
    handleEdit(index, row) { // 编辑
      console.log(index, row);
    },
    handleDelete(index, row) { // 删除
      console.log(index, row);
    },
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
