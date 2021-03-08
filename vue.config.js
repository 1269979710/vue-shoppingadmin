// const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            // '任意名称': {
            // 步骤1：写一个任意名称
            // 步骤2：去接口那边真是的地址
            // 步骤3：查看以前的完成接口地址 有没有api  没有api就重写替换掉
            '/api': {
                target: 'http://kg.zhaodashen.cn/v2/',
                changeOrigin: true, // 是否允许跨域
                ws: true, //websoket是否启用
                // secure: false,      // 关闭SSL证书验证https协议接口需要改成true 
                pathRewrite: {     // 重写路径请求
                    // '^/任意名称': '' //路径重写 
                    '^/api': '' //路径重写 
                }
            },
            // ....
        }
    }
};