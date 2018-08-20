<template>
    <div class="factor">
        我是第二个子组件
        <div class="container">
            <!-- 新增 -->
            <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="increase()">新增</el-button>
            <!-- 按模糊查询 -->
            <el-input class="ipt-factor" v-model="input" size="medium" placeholder="按输入名称查找"></el-input>
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

        <!-- 第二行：名称 -->
        <el-table-column
        prop="name"
        label="名称"
        width="450">
        </el-table-column>

        <!-- 第三行：标准号 -->
        <el-table-column
        prop="standard"
        label="标准号"
        width="150">
        </el-table-column>

        <!-- 第四行：发布日期 -->
        <el-table-column
        prop="release"
        label="发布日期"
        width="150">
        </el-table-column>

        <!-- 第五行：失效日期 -->
        <el-table-column
        prop="expiry"
        label="失效日期"
        width="150">
        </el-table-column>

        <!-- 第六行：版本 -->
        <el-table-column
        prop="expiry"
        label="版本"
        width="150">
        </el-table-column>

        <!-- 第七行：优先级 -->
        <el-table-column
        prop="priority"
        label="优先级"
        width="150">
        </el-table-column>

        <!-- 第八行：操作 -->
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
      <method-dialog></method-dialog>
    </div>
</template>
<script>
// 导入子组件
import methodDialog from './dialogList/methodDialog.vue';

export default {
  data() {
    return {
      listData: [ // 源数据
        {
          date: '01',
          name: '王小虎',
          address: '1518',
          standard: 'GBZ/T160.84', // 标准号
          release: '0', // 发布日期
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '02',
          name: '王小虎',
          address: '1517',
          standard: 'GBZ/T160.83',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '03',
          name: '王小虎',
          address: '1519',
          standard: 'GBZ/T160.82',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '04',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.80',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '05',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.79',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '06',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.84',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '07',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.84',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '08',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.84',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        }, {
          date: '09',
          name: '王小虎',
          address: '1516',
          standard: 'GBZ/T160.84',
          release: '0',
          expiry: '', // 失效日期
          priority: '0', // 优先级
        },
      ],
      input: '', // 模糊查询框
      staffPageSize: 8, // 每页显示多少条数据 -- 默认为8条
      staffCurrentPage: 1, // 第几页 -- 默认在第一页
      staffTotalCount: 0, // 表示显示页码总数
    };
  },
  components: {
    methodDialog, // Dialog弹框内容 -- 提取为子组件 -- 方法
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
