import request from '@/utils/request'

export default{
  // 1.获取全部网关信息
  getGatewayList(data) {
    return request({
      url: `/api/operate/getGatewayList`,
      method: 'post',
      data: data
    })
  },
  // 3.获取全部网关信息
  getPointList(data) {
    return request({
      url: `/api/operate/getPointList`,
      method: 'post',
      data: data
    })
  },
  // 2.获取全部传感器信息
  getDataPointList(data) {
    return request({
      url: `/api/operate/getDataPointList`,
      method: 'post',
      data: data
    })
  },
  // 根据gwid获取dpIds
  getDpIds(gwId) {
    return request({
      url: `/api/operate/getDpIds/${gwId}`,
      method: 'post'
    })
  },
  // 查询实时数据信息
  queryRawData(data) {
    return request({
      url: `/api/operate/queryRawData`,
      method: 'post',
      data: data
    })
  },
  // 获取维保数据信息
  notificationZScore(data) {
    return request({
      url: `/api/operate/notificationZScore`,
      method: 'post',
      data: data
    })
  },
  // 获取警告数据信息
  notificationWarningData(data) {
    return request({
      url: `/api/operate/notificationWarningData`,
      method: 'post',
      data: data
    })
  }
}
