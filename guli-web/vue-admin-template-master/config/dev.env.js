'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
     BASE_API: '"http://localhost:9001"',    //nginx服务器地址，由他来进行请求转发
     OSS_PATH: '"deu-guli.oss-cn-hongkong.aliyuncs.com"'  //oss访问地址，后面跟/文件夹名/文件名
})
