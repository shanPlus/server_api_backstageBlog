const express = require('express')
const server = express()
// 下载body-parser, 处理post的请求参数
const bodyParser = require('body-parser')
// 导入数据库连接
require('./mongodb/mongoose.js')
// 导入express-jwt, 验证token
const jwt = require('express-jwt')
// 导入路由模块
const router = require('./routes/index')
// 设置跨域和相应数据格式
server.all('*', function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})
// 解析application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: false}))
// 解析application/json
server.use(bodyParser.json())
// 配置jwt: 加密token, 校验的时候使用,除了'/register'地址, 其他的url都需要验证
server.use(jwt({ secret: 'jwtToken' }).unless({path: ['/login','/register']}))
// 把路由规则添加到中间件中
server.use(router)
// 如果没有路径处理就返回 Not Found
// server.use(function(req, res, next) {
//     res.sendResult(null, 404, 'Not Found')
//   })
const port = 7000

server.listen(port, () => {
    console.log('+---> 1. 服务器监听port: ' + port)
    console.log('+---> 3. 表单登录 ---- post --- /login')
    console.log('+---> 4. 表单注册 ---- post --- /register')
})