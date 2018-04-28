###  乐享成人学生端

#### 文件主目录

```
├── README.md         介绍
├── build             构建工具
├── config            构建配置文件
├── package.json      配置信息文件
├── src               主开发文件
├── static            静态文件目录
└── student           打包之后的文件

```


#### 文件开发目录

```
.
├── assets               静态文件目录
│   ├── images           图片目录
│   └── style            样式目录
├── components           公共组件目录
│   ├── Loading.vue
│   ├── dialogbg.vue
│   ├── index.js
│   └── navigation.vue
├── config.js            后端项目错误码配置
├── filter               过滤器
│   └── index.js
├── index.html           html 入口
├── index.js             主入口
├── production.js        http请求url环境配置
├── router.js            路由
├── store                vuex目录
│   ├── actions 
│   ├── index.js
│   ├── mutations
│   └── state
├── utils.js            工具类
└── views               主要组件页面目录
    ├── appointment
    ├── common
    ├── haveProcess
    ├── home
    ├── login
    └── personalCenter
```

> 具体使用的项目技术可以查看package.json里面的依赖

> 因为是基于微信公众号开发的产品所以会用到微信的一些功能。

大概流程：

1. 检测用户是否登录过，或者是否已经登录过期
2. 如果没有登录过，或者登录已经过期就跳转到登录页面。在登录页面登录成功之后会调微信授权，然后进入主流程
3. 主流程大概分为了约课， 约琴，个人中心。
4. 具体流程可以询问产品经理。



