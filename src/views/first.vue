<template>
    <div class="factor">
        <div class="container">
            <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="isPop();addEmptyData()">新增</el-button>
            <!-- 按模糊查询 -->
            <el-input
             class="ipt-factor"
             v-model="value"
             size="medium"
             placeholder="按输入名称查找"
             @keyup.enter.native="handleRefer"
             clearable>
              <!-- 查找 -->
              <el-button class="btn-searth" slot="append" size="medium" icon="el-icon-search" @click="handleRefer">查找</el-button>
             </el-input>
            <!-- 重置 -->
            <el-button class="btn-reset" size="medium" @click="reset()" :loading="refreshLoading">重置</el-button>
        </div>
        <!-- 分页 -->
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-size="pageSize"
        :layout="layout"
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

        <!-- 第三行：别名 -->
        <el-table-column
        prop="alias"
        label="别名">
        </el-table-column>

        <!-- 第四行：标准号 -->
        <el-table-column
        prop="sn" 
        label="标准号">
        </el-table-column>

        <!-- 第五行：优先级 -->
        <el-table-column
        prop="weight"
        label="优先级">
        </el-table-column>

        <!-- 第六行：操作 -->
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="isEditPop();editDialog(scope);">编辑</el-button>
            <el-button
            @click.native.prevent="handleDelete(scope.row)"
            size="mini"
            type="danger">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

    <!-- add弹框 -->
    <div class="factorDialog">
      <!-- 这里是factorDialog因子弹框内容 -->
      <!-- dialog -->
      <el-dialog
      title="add"
      :visible.sync="dialogVisible"
      width="28%">
      <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">

      <!-- 名称 -->
      <el-form-item label="名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <!-- 标准号 -->
      <el-form-item label="标准号" prop="sn">
        <el-input v-model="ruleForm.sn"></el-input>
      </el-form-item>

      <!-- 别名 -->
      <el-form-item label="别名" prop="alias">
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

    <!-- edit弹框 -->
    <div class="editFactorDialog">
      <!-- 这里是editFactorDialog因子弹框内容 -->
      <!-- dialog -->
      <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="28%">
      <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">

      <!-- 名称 -->
      <el-form-item label="名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <!-- 标准号 -->
      <el-form-item label="标准号" prop="sn">
        <el-input v-model="ruleForm.sn"></el-input>
      </el-form-item>

      <!-- 别名 -->
      <el-form-item label="别名" prop="alias">
        <el-input v-model="ruleForm.alias"></el-input>
      </el-form-item>

      <!-- 优先级 -->
      <el-form-item label="weight">
        <el-input v-model="ruleForm.weight"></el-input>
      </el-form-item>
      </el-form>

      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
         @click.native.prevent="editDialogVisible = false;handleEdit(ruleForm)">确 定</el-button>
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
      refreshLoading: false, // 按钮的loadding旋转效果 -- 默认为 -- false
      tableLoading: false, // 表单的loadding旋转效果 -- 默认为 -- true
      value: '', // 搜索查询
      result: [], // 存放满足查询条件的数据
      scoperows: [],
      dialogVisible: this.$store.state.dialogVisible,
      editDialogVisible: this.$store.state.editDialogVisible,
      layout: "total, prev, pager, next, jumper",
      ruleForm: {
        title: '', // 名称
        sn: '', // 标准号
        alias: '', // 别名
        weight: '', // 优先级
      },
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        sn: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        alias: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  computed: {
    ...mapState(['token']), // 获取到token
  },
  created() {
    this.getData(); // 在页面开始时获取导数据
  },
  methods: {
    reset() { // 重置
      this.refreshLoading = true; // 开启loading效果
      this.current_page = 1; // 分页回到第一页
      this.getData(); // 重新获取数据
      this.value = ''; // 清空搜索框
      this.layout = "total, prev, pager, next, jumper";
    },
    getData() {  // 数据获取
      this.tableLoading = true; // 开启table刷新动态效果
      // 开始获取后台数据
      // 获取Factor请求数据
      console.log(this.$store.state.token); // 检查获取token
      console.log(this.current_page); // 由于是进行的后台分页 -- 此处要注意当前数据是第几页
      this.$http.get('/api/factor', {
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
            // console.log(response);
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
            this.$message.error('数据获取失败！');
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
          id : this.currentData.id,
          title : this.currentData.title,
          alias : this.currentData.alias,
          sn : this.currentData.sn,
          weight : this.currentData.weight,
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
    isPop(dialogVisible) {
      if(dialogVisible == true) {
        this.dialogVisible = false;
      }else {
        this.dialogVisible = true;
      }
    },
    isEditPop(editDialogVisible) {
      if(editDialogVisible == true) {
        this.editDialogVisible = false;
      }else {
        this.editDialogVisible = true;
      }
    },
    editDialog(scope) { // 编辑框获取到数据
      console.log(scope);
      console.log(scope.row);
      this.ruleForm = {
        id: scope.row.id,
        title: scope.row.title,
        sn: scope.row.sn,
        alias: scope.row.alias,
        weight: scope.row.weight,
      };
    },
    addEmptyData() { // 每次更新清空列表
      this.ruleForm = {
        title: '',
        sn: '',
        alias: '',
        weight: '',
      };
    },
    addDataList() { // 新增
      // 发送请求：发送数据 -- 发请求给后台 -- 关闭弹框
      console.log('新增');
      console.log(this.$store.state.token);
      this.$http.post('/api/factor',
      {
        title: this.ruleForm.title,
        sn: this.ruleForm.sn,
        alias: this.ruleForm.alias,
        weight: this.ruleForm.weight,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${this.$store.state.token}`,
        },
      })
        .then((response) => { // 请求成功
          if (this.$store.state.token) {
            console.log(response);
            this.$message({ //message进入弹框 ：显示 '登录成功！'
              message: '添加成功！',
              type: 'success',
              duration: 1500,
            });
            this.getData();
          }
        })
        .catch((error) => { // 报出异常
          console.log(error);
          console.log('错误!');
          this.addEmptyData();
          this.$message.error('新增失败！');
        });
    },
    handleEdit(scope) { // 编辑
      console.log(scope);
      console.log('编辑');
      console.log(scope.id);
      console.log(this.$store.state.token);
      this.$http.put(`/api/factor/${scope.id}`,
      {
        title: this.ruleForm.title,
        sn: this.ruleForm.sn,
        alias: this.ruleForm.alias,
        weight: this.ruleForm.weight,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${this.$store.state.token}`,
        },
      })
        .then((response) => { // 请求成功
          if (this.$store.state.token) {
            console.log(response);
            this.$message({ //message进入弹框 ：显示 '登录成功！'
              message: '编辑成功！',
              type: 'success',
              duration: 1500,
            });
          this.getData();
          }
        })
        .catch((error) => { // 报出异常
          console.log(error);
          console.log('错误!');
          this.$message.error('编辑失败！');
        });
    },
    handleDelete(scope, index) { // 删除
      this.scoperows = scope;
      console.log('删除');
      this.index = scope.id;
      console.log(scope);
      console.log(this.index);
      console.log(this.$store.state.token);
      this.$http.delete(`/api/factor/${this.index}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${this.$store.state.token}`,
        },
      })
        .then((response) => { // 请求成功
          if (this.$store.state.token) {
            console.log(response);
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1500,
            });
          this.getData();
          }
        })
        .catch((error) => { // 报出异常
          console.log(error);
          console.log('错误!');
          this.$message.error('删除失败！');
        });
    },
    handleRefer() { //查询
      console.log('查询');
      console.log(this.$store.state.token); // 检查token
      if (this.value != '') {
        // 获取数据
      this.$http.get('/api/factor', {
        // responseType: 'json', // 将数据json格式转化为对象  
        params: {
          // return_list: 1,
          // where: {title:`${this.value}`}, // 基于后台数据进行搜索
          query: this.value,
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
          this.$message.error('数据获取失败！');
          this.refreshLoading = false;
        });
      } else {
        this.layout = "total, prev, pager, next, jumper";
        this.getData();
      }
    },
    // referData(data) { // 查询数据渲染
    //   console.log('查询数据渲染!');
    //   this.listData.splice(0, this.listData.length); // 1.清空数组
    //   this.total = data.total; // 查询后总数据
    //   this.result = [];
    //   console.log(this.listData);
    //   console.log(data);
    //   console.log(this.value);
    //   // 开启循环: 循环遍历当页数据
    //   data.forEach((element, index) => {
    //     if (element.title.indexOf(this.value) >= 0) { // 当条件满足 -- 有一个元素能被匹配到时
    //       this.result = data[index]; // 将循环遍历的数据放入空数组
    //       console.log(data[index]);
    //       this.listData.push({
    //         id : this.result.id,
    //         title : this.result.title,
    //         alias : this.result.alias,
    //         sn : this.result.sn,
    //         weight : this.result.weight,
    //       });
    //     }
    //   })
    //   this.layout = "total";
    //   this.total = this.listData.length;
    //   console.log(this.total);
    // },
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
        >.increase {
            margin-top: 20px;
            float: left;
        }
        >.btn-searth,.btn-reset {
            margin-top: 20px;
            float: right;
        }
        >.ipt-factor {
            margin-top: 20px;
            width: 250px;
        }
    }
    >.el-pagination {
        margin-top: 10px;
        float: right;
    }
}
</style>
