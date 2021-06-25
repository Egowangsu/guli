<template>
  <div id="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teachrQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="teachrQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teachrQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teachrQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
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

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}    <!--scope.row取到了该单元格的对象，就是数组里的元素对象-->
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
export default {
  // 写核心代码位置
  // data:{

  // }
  data() { // 定义变量和初始值
    return {
      list: [], // 查询之后接口返回集合
      page: 1, // 当前页
      size: 4, // 每页记录数
      total: 0, // 总记录数
      teachrQuery: {} // 条件封装对象
    }
  },
  created() { // 页面渲染前执行，一般调用methods中的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js（api）定义的方法
    getList(page = 1) { // 要加一个默认值page，上面分页调用该方法会自动把参数page传入，所以要加一个参数接收，默认为1
      this.page = page
      teacherApi.getTeacherListByCondition(this.page, this.size, this.teachrQuery)
        .then(res => {
          console.log(this.teachrQuery)
          this.list = res.data.pageList.records
          this.total = res.data.pageList.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetData() {
      // 清空所有条件，因为数据是双向绑定的，所以可以从teacherQuery中获取到所有条件
      this.teachrQuery = {}

      // 查询所有讲师
      this.getList()
    },
    // 删除讲师
    removeDataById(id) {
      // 调用接口删除讲师,删除前后提示
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacherApi.deleteTeacherById(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          this.getList()
        })
      })
    }
  }
}
</script>
