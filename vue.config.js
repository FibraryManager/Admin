const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8888, //端口
        open: true, //是否启动后浏览器自动打开
        https: false, //
        host: "localhost", //主机名
        proxy:{
            '/api':{
                target:'http://localhost:8089/',//目标服务器地址
                changeOrigin:true, //开启代码里服务进行转发
                pathRewrite:{ //进行路径重写
                    '^/api':'' //重写路径
                }
            }
        },
    },
    lintOnSave: false,//是否在保存的时候使用 `eslint-loader` 进行检查
    productionSourceMap: false//打包时不生成map文件，加快打包构建
})
