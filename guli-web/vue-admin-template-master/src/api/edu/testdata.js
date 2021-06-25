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
  }
}
