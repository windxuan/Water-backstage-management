<template>
    <div class="analyse">
        <div class="container">
          <!-- 新增 -->
          <el-button class="increase" type="primary" size="medium" icon="el-icon-plus" @click="isPop();addEmptyData()">新增</el-button>
          <!-- 因子 --查询 -->
          <el-input
             class="ipt-factor"
             v-model="factorValue"
             size="medium" 
             placeholder="按输入名称查找"
            @keyup.enter.native="factorHandleRefer"
             clearable>
            <el-button class="btn-searth" slot="append" size="medium" icon="el-icon-search" @click="factorHandleRefer()">因子</el-button>
          </el-input>
          <!-- 方法 --查询 -->
          <el-input
             class="ipt-query"
             v-model="methodValue"
             size="medium" 
             placeholder="按输入名称查找"
             @keyup.enter.native="methodHandleRefer"
             clearable>
            <el-button class="btn-searth" slot="append" size="medium" icon="el-icon-search" @click="methodHandleRefer()">方法</el-button>
          </el-input>
          <!-- 重置 -->
          <el-button class="btn-reset" size="medium" @click="reset()">重置</el-button>
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

      <div class="analyseDialog">
       <!-- add -- analyse弹框 -->
      <el-dialog
      title="add"
      :visible.sync="dialogVisible"
      width="28%">

      <!-- from -->
      <el-form
       :model="ruleForm"
       :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">

        <!-- 因子 -->
        <el-form-item label="因子" prop="factor_title">
          <!-- 因子 -->
          <!-- 获取数据的下拉框 -->
          <el-input
          :disabled="disabled"
          v-model="ruleForm.factor_title"
          placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <!-- 方法 -->
        <el-form-item label="方法" prop="method_title">
          <!-- 方法 -->
          <!-- 获取数据的下拉框 -->
          <el-input
          :disabled="disabled"
          v-model="ruleForm.method_title"
          placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <!-- 单位 -->
        <el-form-item label="单位">
          <el-select v-model="ruleForm.uom" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 章节 -->
        <el-form-item label="章节">
          <el-input v-model="ruleForm.chapter"></el-input>
        </el-form-item>

        <!-- 有效位数 -->
        <el-form-item label="有效位数">
          <el-input v-model="ruleForm.significand"></el-input>
        </el-form-item>

        <!-- 精度 -->
        <el-form-item label="精度">
          <el-input v-model="ruleForm.decimals"></el-input>
        </el-form-item>

        <!-- 优先级 -->
        <el-form-item label="优先级">
          <el-input v-model="ruleForm.weight"></el-input>
        </el-form-item>

      </el-form>
      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addDataList()">确定</el-button>
      </span>
      </el-dialog>
    </div>

    <div class="analyseDialog">
      <!-- edit -- analyse弹框 -->
      <el-dialog
      title="edit"
      :visible.sync="editDialogVisible"
      width="28%">

      <!-- from -->
      <el-form
       :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">

        <!-- 因子 -->
        <el-form-item label="因子">
          <el-input
           :disabled="!disabled"
           v-model="ruleForm.factor_title">
          </el-input>
        </el-form-item>

        <!-- 方法 -->
        <el-form-item label="方法">
          <el-input
          :disabled="!disabled"
          v-model="ruleForm.method_title"
          ></el-input>
        </el-form-item>

        <!-- 单位 -->
        <el-form-item label="单位">
          <el-select v-model="ruleForm.uom" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 章节 -->
        <el-form-item label="章节">
          <el-input v-model="ruleForm.chapter"></el-input>
        </el-form-item>

        <!-- 有效位数 -->
        <el-form-item label="有效位数">
          <el-input v-model="ruleForm.significand"></el-input>
        </el-form-item>

        <!-- 精度 -->
        <el-form-item label="精度">
          <el-input v-model="ruleForm.decimals"></el-input>
        </el-form-item>

        <!-- 优先级 -->
        <el-form-item label="优先级">
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
      tempData: [], // 存放源数据
      result: [],// 存放满足查询条件的数据
      restaurants: [],
      timeout: null,
      layout: "total, prev, pager, next, jumper",
      dialogVisible: this.$store.state.dialogVisible, // 弹出显示隐藏状态 -- 默认为 -- 隐藏/false
      editDialogVisible: this.$store.state.editDialogVisible,
      disabled: this.$store.state.disabled, // 禁用状态
      factorValue: '', // 因子查询
      methodValue: '', // 方法查询
      result: [], // 存放满足查询条件的数据
      options: [{
        value: 'cm',
        label: 'cm',
      }, {
        value: 'mol/L',
        label: 'mol/L',
      }, {
        value: 'L',
        label: 'L',
      }, {
        value: 'mm',
        label: 'mm',
      }, {
        value: 'mol/KG',
        label: 'mol/KG',
      }],
      ruleForm: {
        id: '',
        factor_id: '',
        method_id: '',
        factor_title: '',
        method_title: '',
        method_sn: '',
        chapter: '',
        uom: '',
        significand: '',
        decimals: '',
        weight: '',
      },
      rules: {
        factor_title: [
          { required: true, message: '请输入因子名称', trigger: 'blur' },
        ],
        methodName: [
          { required: true, message: '请输入方法名称', trigger: 'blur' },
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
      this.factorValue = ''; // 清空搜索框
      this.methodValue = '';
      this.layout = "total, prev, pager, next, jumper";
    },
    getData() { // 数据获取
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
          this.$message.error('服务器连接错误！');
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
          factor_id : this.currentData.factor_id, // 因子
          method_id : this.currentData.method_id, // 方法
          method_sn: this.currentData.method_sn,
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
    addEmptyData() { // 每次更新清空列表
      this.ruleForm = {
        id: '',
        factor_id: '',
        method_id: '',
        factor_title: '',
        method_title: '',
        method_sn: '',
        chapter: '',
        uom: '',
        significand: '',
        decimals: '',
        weight: '',
      };
    },
    editDialog(scope) { // 编辑框获取到数据
      console.log(scope);
      console.log(scope.row);
      this.ruleForm = {
        id: scope.row.id,
        factor_id: scope.row.factor_id,
        method_id: scope.row.method_id,
        factor_title: scope.row.factor_title,
        method_title: scope.row.method_title,
        method_sn: scope.row.method_sn,
        chapter: scope.row.chapter,
        uom: scope.row.uom,
        significand: scope.row.significand,
        decimals: scope.row.decimals,
        weight: scope.row.weight,
      };
    },
    addDataList() { // 新增
      // 发送请求：发送数据 -- 发请求给后台 -- 关闭弹框
      console.log('新增');
      console.log(this.$store.state.token);
      this.$http.post('/api/analyse', 
      {
        id: this.ruleForm.id,
        factor_id: this.ruleForm.factor_id,
        method_id: this.ruleForm.method_id,
        factor_title: this.ruleForm.factor_title,
        method_title: this.ruleForm.method_title,
        method_sn: this.ruleForm.method_sn,
        chapter: this.ruleForm.chapter,
        uom: this.ruleForm.uom,
        significand: this.ruleForm.significand,
        decimals: this.ruleForm.decimals,
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
      this.$http.put(`/api/analyse/${scope.id}`,
      {
        id: this.ruleForm.id,
        factor_id: this.ruleForm.factor_id,
        method_id: this.ruleForm.method_id,
        factor_title: this.ruleForm.factor_title,
        method_title: this.ruleForm.method_title,
        method_sn: this.ruleForm.method_sn,
        chapter: this.ruleForm.chapter,
        uom: this.ruleForm.uom,
        significand: this.ruleForm.significand,
        decimals: this.ruleForm.decimals,
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
            this.$message({ //message进入弹框 ：显示 '成功！'
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
      this.$http.delete(`/api/analyse/${this.index}`,
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
    factorHandleRefer() { // 查询
      console.log('基于因子查询');
      console.log(this.$store.state.token);
      if (this.factorValue != '') {
        // 获取数据
      this.$http.get('/api/analyse', {
        // responseType: 'json', // 将数据json格式转化为对象  
        params: {
          // return_list: 1,
          factor_title: this.factorValue,
          method_title: this.methodValue,
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
    //   console.log(this.factorValue);
    //   data.forEach((element, index) => {
    //     if (element.factor_title.indexOf(this.factorValue) >= 0) { // 当条件满足 -- 有一个元素能被匹配到时
    //       this.result = data[index]; // 将循环遍历的数据放入空数组
    //       console.log(data[index]);
    //       this.listData.push({
    //         id : this.result.id,
    //         factor_title : this.result.factor_title,
    //         method_title : this.result.method_title,
    //         chapter : this.result.chapter,
    //         uom : this.result.uom,
    //         significand : this.result.significand,
    //         decimals : this.result.decimals,
    //         weight : this.result.weight,
    //       });
    //     }
    //   })
    //   this.layout = "total";
    //   this.total = this.listData.length;
    //   console.log(this.total);
    // },
    methodHandleRefer() { // 查询
      console.log('基于因子查询');
      console.log(this.$store.state.token);
      if (this.methodValue != '') {
        // 获取数据
      this.$http.get('/api/analyse', {
        // responseType: 'json', // 将数据json格式转化为对象  
        params: {
          // return_list: 1,
          factor_title: this.factorValue,
          method_title: this.methodValue,
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
    // methodData(data) { // 查询数据渲染
    //   console.log('查询数据渲染!');
    //   this.listData.splice(0, this.listData.length); // 1.清空数组
    //   this.total = data.total; // 查询后总数据
    //   this.result = [];
    //   console.log(this.listData);
    //   console.log(data);
    //   console.log(this.factorValue);
    //   data.forEach((element, index) => {
    //     if (element.method_title.indexOf(this.methodValue) >= 0) { // 当条件满足 -- 有一个元素能被匹配到时
    //       this.result = data[index]; // 将循环遍历的数据放入空数组
    //       console.log(data[index]);
    //       this.listData.push({
    //         id : this.result.id,
    //         factor_title : this.result.factor_title,
    //         method_title : this.result.method_title,
    //         chapter : this.result.chapter,
    //         uom : this.result.uom,
    //         significand : this.result.significand,
    //         decimals : this.result.decimals,
    //         weight : this.result.weight,
    //       });
    //     }
    //   })
    //   this.layout = "total";
    //   this.total = this.listData.length;
    //   console.log(this.total);
    // },
    // loadAll() { // 弹窗搜索 -- 此处需要匹配到后台数据
    //   return [
    //     { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    //     { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
    //     { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
    //     { value: '泷千家(天山西路店)', address: '天山西路438号' },
    //     { value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
    //     { value: '贡茶', address: '上海市长宁区金钟路633号' },
    //     { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
    //     { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
    //     { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
    //     { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
    //     { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
    //     { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
    //     { value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
    //     { value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
    //     { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
    //     { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
    //     { value: '快乐柠檬（神州智慧店）', address: '上海市长宁区天山西路567号1层R117号店铺' },
    //     { value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
    //     { value: '猫山王（西郊百联店）', address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
    //     { value: '枪会山', address: '上海市普陀区棕榈路' },
    //     { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
    //     { value: '钱记', address: '上海市长宁区天山西路' },
    //     { value: '壹杯加', address: '上海市长宁区通协路' },
    //     { value: '唦哇嘀咖', address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
    //     { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
    //     { value: '爱茜茜里(近铁广场)', address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
    //     { value: '鲜果榨汁（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-6' },
    //     { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
    //     { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
    //     { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
    //     { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
    //     { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
    //     { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
    //     { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
    //     { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
    //     { value: '饭典*新简餐（凌空SOHO店）', address: '上海市长宁区金钟路968号9号楼地下一层9-83室' },
    //     { value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
    //     { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
    //     { value: '浏阳蒸菜', address: '天山西路430号' },
    //     { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
    //     { value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
    //     { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
    //     { value: '福荣祥烧腊（平溪路店）', address: '上海市长宁区协和路福泉路255弄57-73号' },
    //     { value: '速记黄焖鸡米饭', address: '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
    //     { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
    //     { value: '(小杨生煎)西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
    //     { value: '阳阳麻辣烫', address: '天山西路389号' },
    //     { value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' },
    //   ];
    // },
    // querySearchAsync(queryString, cb) {
    //   const restaurants = this.restaurants;
    //   const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

    //   clearTimeout(this.timeout);
    //   this.timeout = setTimeout(() => {
    //     cb(results);
    //   }, 3000 * Math.random());
    // },
    // createStateFilter(queryString) {
    //   return state => (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    // },
    // handleSelect(item) {
    //   console.log(item);
    // },
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
        >.increase {
            margin-top: 20px;
            border: 1px solid #eee;
            float: left;
        }
        >.btn-searth,.btn-reset {
            margin-top: 20px;
            border: 1px solid #e1e1e1;
            float: right;
        }
        >.el-input {
            margin-top: 20px;
            width: 225px;
        }
    }
    >.el-pagination {
        margin-top: 10px;
        border: 1px solid #eee;
        float: right;
    }
}
</style>
