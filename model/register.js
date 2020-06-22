/*
    1. bcrypt依赖环境
        - 安装: python2.x, 安装完放入环境变量path中
        - node-gyp全局安装: npm install node-gyp -g
        - window-build-tools: npm install --global --production windows-build-tools
        - npm install bcrypt --save
*/
const bcrypt = require('bcrypt')
const jwtoken = require('jsonwebtoken')
// 导入用户集合构造函数
const {User} = require('./../mongodb/mongoose')
module.exports = async (req, res) => {
    const {username, email, password, passwords} = req.body
    if(username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwords.trim().length ===0){
        return res.json({code: '0', data: null, meta: {msg: '信息未校验', status: 400}})
    }
    const userRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g
    if(!userRegExp.test(username)) return res.json({code: '0', data: null, meta: {msg: '用户名不能包含符号', status: 400}})
    if(passwords !== password) return res.json({code: '0', data: null, meta: {msg: '两次密码不一致', status: 400}})
    const user = await User.findOne({email})
    if(user === null) {
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)
        User.create({
            username,
            password: pass,
            email,
            role: 'normal',
            state: 1
        }, async (err, doc) => {
            if(err) {
                console.log(err)
                return res.json({code: '0', data: null, meta: {msg: '用户名重复', status: 400}})
            } else {
                const user = await User.findOne({email})
                const token = jwtoken.sign({
                    // 参数1: 载荷, 用于编码后存储在token中的数据,也是验证token之后可以拿到的数据
                    username: user.username,
                    // 参数2: 秘钥,自己定义,验证的时候相同密码才能解码
                    }, 'my_token',{
                    // 参数3: option, token过期时间
                        expiresIn: '2h'
                    })
                return res.json({code: '1', data: {id: user._id, username: user.username, token }, meta: {msg: '注册成功', status: 200}})
            }
        })
    }else {
        return res.json({code: '0', data: null, meta: {msg: '邮箱已经存在', status: 400}})
    }
}