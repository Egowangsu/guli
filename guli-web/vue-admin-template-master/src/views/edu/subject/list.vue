<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="subjectTree"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subjectApi from '@/api/edu/subject'
export default {

  data() {
    return {
      filterText: '',
      data2: [],   //返回所有分类数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },

  created() {
    this.getAllSubjectList()
  },

  methods: {
      getAllSubjectList(){
        subjectApi.getAllSubject()
        .then(res =>{
                this.data2= res.data.list
        })
      },
    
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1   //将结果全部变为小写进行比较
    }
  }
}
</script>