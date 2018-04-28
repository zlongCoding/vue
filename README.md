### 知音宝贝教师端

```
.
├── README.md
├── build
├── config
├── package.json
├── src
│   ├── assets
│   ├── components
│   ├── config.js
│   ├── filter
│   ├── index.html
│   ├── index.js
│   ├── production.js
│   ├── router.js
│   ├── store
│   ├── utils.js
│   ├── views
│   └── weixin.js
├── static
└── teacher
    ├── index.html
    └── static
```

11 directories, 22 files

大概的文件目录结构乐享成人学生端一样的。如果有疑问[请移步](https://gitee.com/Danieltang/enjoy_adult_h5/tree/lexiang_student/)

> 具体使用的项目技术可以查看package.json里面的依赖

大概流程

1. 检测用户是否登录过，或者是否已经登录过期
2. 如果没有登录过，或者登录已经过期就跳转到登录页面。在登录页面登录成功之后会调微信授权，然后进入主流程
3. 主流程大概分为了个人中心，课程页面
4. 具体流程可以询问产品经理。