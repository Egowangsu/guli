import request from '@/utils/request'

export default{
    //1.获取全部课程分类
    getAllSubject(){
        return request({
            url:`/eduservice/subject/getAllSubject`,
            method: 'get'
          })
    }
    }