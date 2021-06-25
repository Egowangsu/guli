import request from '@/utils/request'
export default {
  getBannerList() {
    return request({
      url: `/cmsservice/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}
