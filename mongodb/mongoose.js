// 连接数据库, 引入mongoose模块
const mongoose = require('mongoose')
// 连接数据库, useCreateIndex: true: 弃用警告
mongoose.connect('mongodb://localhost:27017/Shop', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then( () => console.log('+---> 2. mongodb数据库连接成功 port: 27017') )    
.catch( () => console.log('数据库连接失败'))

// 创建用户集合 规则
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 6
    },
    email: {
        type: String,
        // 唯一
        unique: true,
        required: [true, '邮箱不能为空'],
        // 自定义验证规则
        validate: {
            validator: (value) => {
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
            },
            message: '邮箱格式不正确'
        }
    },
    password: {
        type: String,
        required: true,
        min: 7 
    },
    role: {// 权限: admin超级管理员, normal普通用户
        type: String,
        default: 'normal'
    },
    state: {// 0 启动, 1禁用
        type: Number,
        default: 0
    }
})
// 创建集合
const User = mongoose.model('user', schema)
module.exports = { User }



/*
async function createUser () {
    const bcrypt = require('bcrypt')
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10)
    // 参数1: 将要加密的密码 参数2: 随机字符串
    const result = await bcrypt.hash('123456', salt)
    // 插入数据
    User.create({
        username: 'admin',
        email: 'admin@qq.com',
        password: result,
        role: 'admin',
        state: 1
    }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log(doc)
        }
    })
}
createUser()
*/