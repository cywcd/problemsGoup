## 问题3、实现后端 HTTP 接口

### 框架选用koa2
> 基于koa2 + mysql2 实现
启动mysql

```
// 启动服务
npm start

// 开发调试 nodemon
npm run dev
```

### 服务端日志
koa封装log4js中间件，打印请求相关信息
日志收集logs

### http接口
请求baseUrl： http://localhost:3000
可使用postMan测试请求

> 登陆接口

```
url： /accounts/signup
params：
{
  "username": "username",
  "password": "password"
}
```

> 注册接口

```
URL： /accounts/signup
params：{
  "username": "username",
  "password": "password"
}
```
