import request from '@/utils/request'

export default{
  // 1.讲师列表
  getTeacherListByCondition(current, limit, teacherQuery) {
    return request({
      url: `eduservice/teacher/queryByCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery // 这样就是把teacherQuery对象以json格式传到后台
    })
  },

  // 删除讲师
  deleteTeacherById(id) {
    return request({
      url: `eduservice/teacher/removeById/${id}`,
      method: 'delete'
    })
  },

  // 新增讲师
  addTeacher(teacher) {
    return request({
      url: `eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher // 这样就是把teacher对象以json格式传到后台，后台用了注解@RequestBody
    })
  },

  // 教师信息回调
  getTeacherInfo(id) {
    return request({
      url: `eduservice/teacher/getById/${id}`,
      method: 'get'
    })
  },
  // 教师信息更新
  updateTeacherInfo(teacher) {
    return request({
      url: `eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
