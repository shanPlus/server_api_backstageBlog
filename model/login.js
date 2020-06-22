/*
    1. bcrypt依赖环境
        - 安装: python2.x, 安装完放入环境变量path中
        - node-gyp全局安装: npm install node-gyp -g
        - window-build-tools: npm install --global --production windows-build-tools
        - npm install bcrypt --save
*/
const bcrypt = require('bcrypt')
// 导入用户集合构造函数
const {User} = require('./../mongodb/mongoose')
const jwtoken = require('jsonwebtoken')
module.exports = async (req,res) => {
    console.log('111111111111')
    // 接收请求参数, 接收用户名和密码
    const {username, password} = req.body
    if(username.trim().length == 0 || password.trim().length == 0){
        return res.json({code: '0', data: null, meta:{status: 400, msg: '登录名或密码不能为空'}})
    } 
    // 邮箱查询
    let user = await User.findOne({email: username})
    // 没有查询到返回null
    if(!user) return res.json({code: '0', data: null, meta:{status: 400, msg: '登录名不存在'}})
    if(await bcrypt.compare(password, user.password)) {
        // 登录成功
        console.log('登录成功')
        // 验证用户名或者密码之后, 生成token
        const token = jwtoken.sign({
            // 参数1: 载荷, 用于编码后存储在token中的数据,也是验证token之后可以拿到的数据
            username: user.username,
            // 参数2: 秘钥,自己定义,验证的时候相同密码才能解码
            }, 'my_token',{
            // 参数3: option, token过期时间
                expiresIn: '2h'
            })
        res.send({code: 1, data: {id: user._id, username: user.username, token }, 
                meta: {msg: '登录成功',status: 200} 
            })
    }else {
        res.json({code: '0', data: null, meta: {msg: '用户名或者密码错误', status: 400}})
    } 
}