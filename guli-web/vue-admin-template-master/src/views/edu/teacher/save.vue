<template>
    <div id="app-container">
 
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
        <!-- 讲师头像 -->
     <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

    <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
@crop-upload-success：上传成功后的回调 -->
        <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduoss/upload'"
                   field="file"
                   @close="close"  
                   @crop-upload-success="cropSuccess"/>

     </el-form-item>
     <el-form-item>  
         <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
         </el-form-item>
     </el-form>
    
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'   //引入组件
export default {
    components: { ImageCropper, PanThumb }, //声明组件，只有在引入声明之后，组件才能被使用
    data(){
        return{
            teacher:{
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            imagecropperShow:false, //判断是否显示上传框
            imagecropperKey:0,  //图片id值
            BASE_API:process.env.BASE_API, //获取dev.env.js中的base_api值
            saveBtnDisabled:false   //disabled 只能点击一次，防止误错做多次提交
        }
    },
    created() {  //数据渲染之前,多次访问同一个页面只执行一次created
       this.init();
    },

//路由监听事件
    watch:{
        $route(to,from){  //路由发生改变，方法执行
        this.init();
        }
    },
    //监听
    methods: {
        close(){  //关闭头像上传弹出框
            this.imagecropperShow = false;
            this.imagecropperKey = this.imagecropperKey+1  //上传组件初始化,解决小bug
        },
        cropSuccess(data){  //成功保存头像时执行的方法
        //该方法已经做了封装，上传头像成功后返回上传地址到data中，存入到avatar中
        this.teacher.avatar = data.url;   //这个url是接口中自己定义的名称
        this.imagecropperKey = this.imagecropperKey+1
        },
        init(){
        //因为修改和添加都是进入到save页面，所以根据url的是否有id值来判断是否执行讲师信息回显
        if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id;
            this.getTeacher(id);
        }else{
            //清空回显数据
            this.teacher={}
        }
        },

        //根据id查询讲师，回显数据
        getTeacher(id){
            teacherApi.getTeacherInfo(id)
            .then(res =>{
                console.log(res)
                this.teacher = res.data.teacher   //将查询到的结果对象赋值给teacher,数据双向绑定完成数据回显
            })
        },


        saveOrUpdate(){
            //根据当前teacher对象有无id值判断是更新还是保存操作
            if(!this.teacher.id){
                 this.addTeacher()  //保存
            }else{
                this.updateTeacher()
            }
           
        },

        //更新讲师信息
        updateTeacher(){
            teacherApi.updateTeacherInfo(this.teacher)
            .then(res =>{
            //提示更新成功
             this.$message({
                 message: '更新成功',
                 type: 'success'
             })
             //路由跳转到讲师查询页面
            this.$router.push({path:'/teacher/list'})
            })
        },

        //新增讲师方法
        addTeacher(){
         teacherApi.addTeacher(this.teacher)
         .then(res =>{
             //提示保存成功
             this.$message({
                 message: '保存成功',
                 type: 'success'
             })
             //路由跳转到讲师查询页面
            this.$router.push({path:'/teacher/list'})
         })   
        }
    },
}
</script>