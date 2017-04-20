## 使用方法


* Step 1 安装依赖
```
npm install 
```

* Step 2 启动服务
```
npm run dev
```

* Step 3 浏览器上的地址
```
访问  http://localhost/8084

* Step 4 打包文件
```
npm run build

```

* 项目结构
  static目录

```
  如果在项目中有静态图片需要动态改变的话就放在static里面

```

src 目录





```
    vuex目录里面是各个模块的状态管理。每个模块都对应一个状态文件
```
    router目录是每个模块的路由。每个模块都对应一个路由地址
```
    utils 目录不用管
```
    components存放页面的目录。每个模块都对应一个文件夹
```
    common 目录存放公共的资源
```
    assets目录存放的静态的图片
```
    api 目录存放的所有后端请求的api 。在api文件中每个模块都对应一个api文件夹
```
dist 目录
```
  文件打包之后上传到服务器上的文件




