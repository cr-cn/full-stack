# fullstack

## Bugs

- 'Uncaught Error: [HMR] Hot Module Replacement is disabled.'
  在 webpack-dev-server 后面添加 '--hot --inline'

- webpack-dev-server 默认是刷新网页，而非热更新，如何实现热更新
  在 config.devServer 配置中添加一项：'hotOnly: true'，热更新被 dev-server 的自动刷新给盖过了

- 空格 + \ 可以在命令行里换行

- git init 命令 就可以把项目变成一个 git 的仓库

- husky: 可以在 commit 前做一个钩子，先执行预制的命令

- github 绿格子不显示解决办法： git config user.email 查看邮箱是不是 github 上默认的邮箱
  修改命令：git config --global user.email "chengrui.xjw@gmail.com"

- 将远程 git 仓库里的指定分支拉取到本地（本地不存在的分支）
  修改命令：`git checkout -b 本地分支名 origin/远程分支名`
  如拉取不成功，首先执行 git fetch 命令

## 项目基本目录结构

- views
  views 目录用于存放项目功能模块的页面，需要根据路由配置情况分割子级目录

- config
  config 目录存放一些配置目录，比如第三方类库引用，路由配置等

- store
  store 目录用于存放项目 store 相关的文件，包括数据获取的封装等

- components
  components 目录用于存放非业务组件，或者在多个业务间都需要用到的公用组件
