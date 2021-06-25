import request from '@/utils/request'

export default{
  // 1.获取全部课程分类
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/educourse/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getTeacherAll() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  }
}
