<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" style="width:720px" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChange">  <!--这里框架自动帮我们封装了自动传参数，原来需要写@change=“xxx(this.value)”-->
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <el-select
          v-model="courseInfo.subjectId"
          placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" style="width:720px" controls-position="right" placeholder=""/>
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/upload'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
import subjectApi from '@/api/edu/subject'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: 'https://deu-guli.oss-cn-hongkong.aliyuncs.com/2021/06/01/61eff2b99d124988b7051ddec35f4ff4file.png',
        price: 0
      },
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
      BASE_API: process.env.BASE_API // 接口API地址,9001端口.nginx
    }
  },
  created() {
    this.getTeacherAll()
    this.getSubjectOneList()
  },
  methods: {
    saveOrUpdate() {
      courseApi.addCourseInfo(this.courseInfo)
        .then(res => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '添加课程信息成功'
          })
          // 跳转到下一页
          this.$router.push({ path: '/course/chapter/' + res.data.courseId })
        })
    },
    getTeacherAll() {
      courseApi.getTeacherAll()
        .then(res => {
          console.log(res)
          this.teacherList = res.data.teacherList
        })
    },
    getSubjectOneList() {
      subjectApi.getAllSubject()
        .then(res => {
          this.subjectOneList = res.data.list
        })
    },
    subjectLevelOneChange(value) { // 这里的value就是一级分类的id，框架帮我们封装了传参，可以直接接收
      subjectApi.getAllSubject()
        .then(res => {
          for (var i = 0; i < this.subjectOneList.length; i++) {
            if (value === this.subjectOneList[i].id) {
              this.courseInfo.subjectId = '' // 每次重新选择一级分类，在赋值二级分类之前要清空二级原先的选择内容
              this.subjectTwoList = this.subjectOneList[i].children
            }
          }
        })
    },
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }

}
</script>
