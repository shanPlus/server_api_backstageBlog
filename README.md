## 1. 启动服务器

> npm install

> bcrypt(hash加密环境部署)

```text
- bcrypt依赖环境
    - 安装: python2.x, 安装完放入环境变量path中
    - node-gyp全局安装: npm install node-gyp -g
    - window-build-tools: npm install --global --production windows-build-tools
    - npm install bcrypt --save
```

> node app.js

## 应用的模块

- express(框架)
- body-parser(解析post的请求)
- mongoose (连接mongodb)
- express-jwt (验证token)
- bcrypt (hash加密)
- jsonwebtoken (生成token)
- 跨域(不是模块)

## git

生成git配置文件

> touch .gitignore

然后在里面写入: `node_modules/`

