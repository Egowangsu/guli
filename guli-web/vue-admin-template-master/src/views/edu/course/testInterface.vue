<template>
  <div id="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" style="margin:25px">
      <!--网关信息-->
      <el-form-item v-if="display">
        <el-select v-model="model" clearable placeholder="网关信息">
          <el-option :value="1" label="网关信息"/>
          <el-option :value="2" label="传感器信息"/>
          <el-option :value="3" label="数据点信息"/>
        </el-select>
      </el-form-item>
      <el-button v-if="display" type="primary" icon="el-icon-search" @click="doSearch()">查询</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item >
        <el-select v-model="model3" clearable placeholder="推送实时数据" @change="doSearch2()">
          <el-option :value="1" label="查询实时数据"/>
          <el-option :value="2" label="推送维保数据"/>
          <el-option :value="3" label="推送报警数据"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="model3===1" >
        <el-select v-model="data.gwId" clearable placeholder="网关编号"  @change="doSearch3()" width="70">
          <el-option
            v-for="(item,index) in gwIds"
            :key="index"
            :value="item.id"
            :label="item.id"
          />
        </el-select>
        <el-select v-model="data.dpId" clearable placeholder="传感器编号">
          <el-option
            v-for="(item,index) in dpIds"
            :key="index"
            :value="item"
            :label="item"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="doSearch4()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <span margin-right="20px">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="isDisplay()"/>
      </span>
    </el-form>
    <el-table
      v-if="model2===1 && display"
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
          {{ scope.$index + 1 }}   <!--取到当前单元格，scope.$index是索引-->
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="200" />

      <el-table-column prop="name" label="name" width="200" />

      <el-table-column prop="status" label="status" width="200"/>

    </el-table>
    <el-table
      v-if="model2===2 && display"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="200"
        align="center">
        <template slot-scope="scope">
          <!-- scope相当于一行的数据， scope.row相当于当前行的数据对象。 -->
          {{ scope.$index + 1 }}   <!--取到当前单元格，scope.$index是索引-->
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="200" />

      <el-table-column prop="name" label="name" width="200" />

      <el-table-column prop="ver" label="ver" width="200"/>

      <el-table-column prop="gwId" label="gw_id" width="200"/>

    </el-table>

    <el-table
      v-if="model2===3 && display"
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
          {{ scope.$index + 1 }}   <!--取到当前单元格，scope.$index是索引-->
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="200" />

      <el-table-column prop="name" label="name" width="200" />

    </el-table>

    <el-table
      v-if="current === 1"
      :data="currentDataList"
      border
      fit
      highlight-current-row>
      <el-table-column label="实时数据信息" align="center" >
      <el-table-column  prop="g" align="center" label="gwId(网关id)" width="200" />
      <el-table-column  prop="d" align="center" label="dpId(传感器id)" width="200" />
      <el-table-column  prop="t"  label="dataTime(数据时间)" width="200" />
      <el-table-column  align="center" label="value(数据值)" >
         <el-table-column
          prop="v[0]"
          label="X轴振动原始值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[1]"
          label="Y轴振动原始值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[2]"
          label="Z轴振动原始值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[3]"
          label="X轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[4]"
          label="Y轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[5]"
          label="Z轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[6]"
          label="X轴振动有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[7]"
          label="Y轴振动有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[8]"
          label="Z轴振动有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[9]"
          label="X轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[10]"
          label="Y轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[11]"
          label="Z轴旋转有效值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[12]"
          label="XYZ振动综合值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[13]"
          label="XYZ旋转综合值(mD)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[14]"
          label="XYZ振动峰值(mG)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[15]"
          label="XYZ旋转峰值(mD)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[16]"
          label="XYZ振动锐度"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[17]"
          label="XYZ旋转锐度"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[18]"
          label="温度(mC)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[19]"
          label="湿度(PH%)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[20]"
          label="气压(Pa)"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="v[21]"
          label="光强(mLux)"
          align="center"
          width="160">
        </el-table-column>       
      </el-table-column>
    </el-table-column>
    </el-table>

    <el-table
      v-if="current === 2"
      :data="currentDataList"
      border
      fit
      highlight-current-row>
      <el-table-column label="维保数据信息" align="center">
      <el-table-column prop="g" align="center" label="gwId(网关id)" width="200"/>
      <el-table-column prop="d" align="center" label="dpId(传感器id)" width="200" />
      <el-table-column prop="dpName" align="center" label="p(数据点)" width="200" />
      <el-table-column prop="t" align="center" label="t(数据时间)" width="200"/>
      <el-table-column prop="z" align="center" label="z(维保指数)" width="200"/>
      <el-table-column prop="vd" align="center" label="vd(负载状态)" width="200"/>
      <el-table-column prop="vh" align="center" label="vh(振动峰值)" width="200"/>
      <el-table-column prop="va" align="center" label="va(振动均值)" />
      </el-table-column>
    </el-table>

    <el-table
      v-if="current === 3"
      :data="currentDataList"
      border
      fit
      highlight-current-row>
      <el-table-column label="报警数据信息" align="center">
      <el-table-column prop="g" align="center" label="gwId(网关id)" width="200" />
      <el-table-column prop="d" align="center" label="dpId(传感器id)" width="200" />
      <el-table-column prop="dpName" align="center" label="p(数据点)" width="200" />
      <el-table-column prop="t" align="center" label="t(报警时间)" width="200"/>
      <el-table-column prop="w" align="center" label="w(0:正常,10:预警,20:报警)"/>
      </el-table-column>
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
      model2: '',
      model3: '',
      gwIds: [],
      dpIds: [],
      data: { 'ak': 'E42D876BFB16BB3E2A87FBA67AB07056',
              'dpId': '',
              'gwId': ''},
      value: false,
      display: false,
      currentDataList: [],
      current: '',
      // 警告数据模拟请求参数
      warningData:{
        "ak":"E42D876BFB16BB3E2A87FBA67AB07056",
        "g": "gw_1",
        "d": "dp_6",
        "p": 16,
        "t": 1546272000,
        "w": 20
      },
      //维保数据模拟请求参数
      zScoreData:{
        "g": "gw_1",
        "d": "dp_6",
        "p": 16,
        "t": 1546272000,
        "z":1.06,
        "vd":157,
        "vh": 2290,
        "va": 1868
      },
      current2: '' 
    }
  },
  created() { // 页面渲染前执行，一般调用methods中的方法
  },
  methods: { // 创建具体的方法，调用teacher.js（api）定义的方法
    doSearch() {  
      if (this.model === 1) {
        // 执行网关查询
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
    doSearch2() {
      console.log('执行了')
      testdataApi.getGatewayList(this.data)
        .then(res => {
          this.gwIds = res.result
        })
    },
    // 根据gwId获取dpIds
    doSearch3() {
      console.log(this.data.gwId)
      if(this.data.gwId !== null) {
         testdataApi.getDpIds(this.data.gwId)
          .then(res => {
            console.log(res)
            this.dpIds = res.result
        })
      }   
    },
    // 查找实时数据
    doSearch4() {
      if(this.model3 ===1 && this.data.gwId && this.data.dpId) {
        // 查询实时数据信息
         let intval = setInterval(()=>{
           if(this.model3 !== 1 || this.current2!=='') {
             clearInterval(intval)
             return
           }
           this.queryRawData()
         },1000) 
         // this.queryRawData()
          }
      if(this.model3 ===2) {
        // 推送维保数据
        this.notificationZScore()
          }
      if(this.model3 ===3) {
        // 推送警告数据
        this.notificationWarningData()
          }
    },
    // chaxun网关信息
    getGatewayList() {
      testdataApi.getGatewayList(this.data)
        .then(res => {
          this.list = res.result
          this.model2 = this.model
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
          this.list = res.result
          this.model2 = this.model
          this.$message({
            type: 'success',
            message: '查询成功'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询数据点信息
    getPointList() {
      testdataApi.getPointList(this.data)
        .then(res => {
          this.list = res.result
          this.model2 = this.model
          this.$message({
            type: 'success',
            message: '查询成功'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    isDisplay(){
      this.display = this.value
    },
    // 查询实时数据信息
    queryRawData() {
      testdataApi.queryRawData(this.data)
        .then(res => {
          console.log(res)
          const item = res.result
          this.currentDataList = []
          this.currentDataList.push(item)
          this.currentDataList[0].v =  res.result.v.split(",");
          this.currentDataList[0].v[18] = this.currentDataList[0].v[18]/1000
          //将时间戳格式化时间
          this.currentDataList[0].t = new Date(this.currentDataList[0].t * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
          // this.currentDataList[0].t = Date(this.currentDataList[0].t * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').substr(11,14)
          console.log(this.currentDataList)
          this.current = 1
        })
        .catch(error => {
          this.current2 = 1
          console.log(error)
        })
    },
    // 查询维保数据信息
    notificationZScore() {
      testdataApi.notificationZScore(this.zScoreData)
        .then(res => {
          const item = res.result.dataSource
          this.currentDataList = []
          this.currentDataList.push(item)
          //将时间戳格式化时间
          this.currentDataList[0].t = new Date(this.currentDataList[0].t * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
          console.log(this.currentDataList)
          this.current = 2
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询警告数据信息
    notificationWarningData() {
      testdataApi.notificationWarningData(this.warningData)
        .then(res => {
           const item = res.result.dataSource
          this.currentDataList = []
          this.currentDataList.push(item)
          //将时间戳格式化时间
          this.currentDataList[0].t = new Date(this.currentDataList[0].t * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
          console.log(this.currentDataList)
          this.current = 3
        })
    },
    // 清空
    resetData() {
      this.current = ''
      this.model3 = ''
    },
  }
}
</script>
