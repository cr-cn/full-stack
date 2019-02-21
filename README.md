# fullstack

## Bugs

### 'Uncaught Error: [HMR] Hot Module Replacement is disabled.'

- 在 webpack-dev-server 后面添加 '--hot --inline'

### webpack-dev-server 默认是刷新网页，而非热更新，如何实现热更新

- 在 config.devServer 配置中添加一项：'hotOnly: true'，热更新被 dev-server 的自动刷新给盖过了

### 空格 + \ 可以在命令行里换行

### git init 命令 就可以把项目变成一个 git 的仓库

### husky: 可以在 commit 前做一个钩子，先执行预制的命令

### github 绿格子不显示解决办法： git config user.email 查看邮箱是不是 github 上默认的邮箱

- 修改命令：git config --global user.email "chengrui.xjw@gmail.com"

### 将远程 git 仓库里的指定分支拉取到本地（本地不存在的分支）

- 修改命令：`git checkout -b 本地分支名 origin/远程分支名`
- 如拉取不成功，首先执行 git fetch 命令
- 删除远程分支：`git push origin -d 远程分支名`
- 删除本地分支： `git branch -d 本地分支` （在 master 中）
- 合并某分支到当前分支：`git merge 被合并的分支名`
- 分支改名： `git branch -m (非当前：原分支名) 新分支名`

### You should not use <Link> outside a <Router> `server-entry.js`

- 原因：由于 App.js export 的是一个数组，所以 Link 标签被暴露，需要用一个 Router 标签包裹
- 解决：`import StaticRouter` 去包裹 `<App />`

### Javascript 语法规范错误提示代码

https://www.jianshu.com/p/b02f6b15cd09

### axios.post 上传字段 得到 status === 200 ,但返回的数据 success: false

- 未解决

### mobx warning: there are multiple mobx instances active...

- 有多个 mobx 实例被启动了
- `externals: Object.keys(require('../package.json').dependencies)`

### 使用了 externals 配置项后，出现 Cannot find module 'react'

-

### react-helmet

### material-ui

- 用于 每个页面 title 的设置

### Warning: Failed prop type: Invalid prop `jss` of type `Jss` supplied to `JssProvider`, expected instance of `Jss`.

- 存在两个版本不同的 jss 引用，下一个版本会 fix

---

## 项目基本目录结构

### views

- views 目录用于存放项目功能模块的页面，需要根据路由配置情况分割子级目录

### config

- config 目录存放一些配置目录，比如第三方类库引用，路由配置等

### store

- store 目录用于存放项目 store 相关的文件，包括数据获取的封装等

### components

- components 目录用于存放非业务组件，或者在多个业务间都需要用到的公用组件

---

## 路由

### 什么是路由

路由是用来区分一个网站不用功能模块的地址，浏览器通过访问同一站点下的不同路由，来访问网站不同的功能。同样路由也让开发者区分返回的内容

### 如何做前端路由

HTML5 API 中的 history 能够让我们控制 url 跳转之后并不刷新页面，而是交给我们的 JS 代码进行相应操作。在 history api 出现之前，我们可以使用 hash 跳转来实现

---

## store

伴随着 React 一起诞生的，是 facebook 推出的一套前端数据流方案，叫做 flux，在其中数据存储的地方，叫做 store，flux 又叫做单项数据流

### Mobx

Mobx 是 flux 实现的后起之秀，其以更简单的使用和更少的概念，让 flux 使用起来变得更加简单。相比 Redux 有 mutation、action、dispatch 等概念，Mobx 则更符合对一个 store 增删改查的操作概念

### cnodejs.org/api

## 服务端渲染优化

### 路由跳转

使用者可能从任意路由进入我们的网站，所以在服务端中也必须处理路由的跳转，在返回给客户端的时候就是指定页面

### store 数据同步

每个页面会有对应的数据，在服务端渲染时已经请求过对应数据，所以要让客户端知道这些数据，在客户端渲染的时候直接使用，而不是通过 API 再次请求，造成浪费。

### React 16

- 相对于 15，更小了，react + react-dom 在 gzipped 之后小了 10k 左右
- 整个代码都用 Fiber 重写了
- 更新了一堆非常有用的功能
- error boundary
  `componentDidCatch`
- New render return types
- 直接返回 字符串
- Portals
- Better server-side rendering ( streaming )
- reactjs.org/blog/2017/09/26/react-v16.0.html

### Promise

- Promise 是构造函数，new 出来的实例有 then 方法
- new Promise 时，传递一个参数，这个参数是函数，又被称为执行器函数（executor），并且这个执行器会被立即调用。
- executor 是函数，它接受两个参数 resolve / reject，同时这两个参数也是函数。
- new Promise 后的实例具有状态，默认状态是等待，当执行器调用 reslove 后，实例状态变为成功状态，当执行期调用 reject 后，实例状态变为失败状态。
- Promise 就是 承若 的意思，实例的状态一旦发生改变，不能再次被修改。
- 每一个 Promise 实例都有方法 then，then 中有两个参数，这两个参数也都是函数，当执行器调用 resolove 后，then 中第一个参数函数会执行，当调用 reject 后，then 中第二个参数函数会执行。

### 链式调用

- jQuery 的链式调用是因为 jQuery 返回了 this，pormise 能一直 then 下去，是因为 promise 的 then 方法返回了 promise 对象。
- 返回的是新的 promise 对象，因为 promise 对象的状态一经修改将不可变，所以需要返回新的 promise 对象。
- then 方法中的两个参数，也就是 resolve 回调和 reject 回调，如何处理他们的返回值？
- 以 resolve 为例，返回普通值，即常量或者对象，这个值将会传到下一个 then 方法中，作为成功的结果。如果返回的不是普通值？
- 返回 promise 对象，会根据这个 promise 对象的状态是 resolve 还是 reject，来决定调用下一个 then 方法中的第一个参数还是第二个。
- 返回 err，则会直接调用下一个 then 方法中的 reject 参数函数。
