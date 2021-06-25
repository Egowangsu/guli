<template>
  <div id="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!--网关信息-->
      <el-form-item>
        <el-select v-model="model" clearable placeholder="网关信息">
          <el-option :value="1" label="网关信息"/>
          <el-option :value="2" label="传感器信息"/>
          <el-option :value="3" label="数据点信息"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      v-if="model===1"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          <!-- scope相当于一行的数据， scope.row相当于当前行的数据对象。 -->
          {{ (page - 1) * size + scope.$index + 1 }}   <!--取到当前单元格，scope.$index是索引-->
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="80" />

      <el-table-column prop="name" label="name" width="80" />

      <el-table-column prop="status" label="status" />

    </el-table>
  </div>
</template>

<script>
import testdataApi from '@/api/edu/testdata'
export default {
  // 写核心代码位置
  // data:{

  // }
  data() { // 定义变量和初始值
    return {
      list: [], // 查询之后接口返回集合
      model: '',
      data: { 'ak': 'E42D876BFB16BB3E2A87FBA67AB07056' }
    }
  },
  created() { // 页面渲染前执行，一般调用methods中的方法
  },
  methods: { // 创建具体的方法，调用teacher.js（api）定义的方法
    doSearch() {
      if (this.model === 1) {
        // 执行网关查询
        console.log('执行了')
        this.getGatewayList()
      }
      if (this.model === 2) {
        // 执行传感器查询
        this.getDataPointList()
      }
      if (this.model === 3) {
        // 执行数据点信息
        this.getPointList()
      }
    },
    // chaxun网关信息
    getGatewayList() {
      testdataApi.getGatewayList(this.data)
        .then(res => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '查询成功'
          })
        })
    },
    // 查询感应器信息
    getDataPointList() {
      testdataApi.getDataPointList(this.data)
        .then(res => {
          console.log('=================================')
          console.log(res)
          this.list = res.result
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询数据点信息
    getPointList() {
      testdataApi.getPointList(this.data)
        .then(res => {
          console.log('=================================')
          console.log(res)
          this.list = res.result
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
