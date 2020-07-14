# h5-libs

基于 React 实现的供移动端使用的相关组件，服务于各移动端业务。

## 环境

```
node = 6+
npm = 3+
```

## 代码风格

### 目录结构
```
├── demo 组件运行示例
├── gulpfile.js 组件编译打包发布脚本
├── CHANGELOG.md 变更记录文档
├── README.md 自述文档
├── scripts 编译打包辅助脚本
└── src
   ├── components 组件代码
   │   ├── refresh
   │   │   ├── style 样式文件
   │   │   ├── index.js 组件导出，可导出多个组件
   │   │   └── PullToRefresh.jsx 组件代码
   │   ├── assets
   │   │   ├── css 公共样式
   │   │   ├── img 资源图片
   │   │   └── js 第三方js
   │   ├── table
   │   └──
   └── utils 工具类
```

### API 规范

### 组件实现

1. 组件文件夹采用英文小写字母命名，多个单词使用`-`拼接
2. 一个组件统一放在一个文件夹下

### 编码基础规范

1. 统一采用 ES6
2. 参考 [Airbnb React/JSX 编码规范](https://github.com/JasonBoy/javascript/tree/master/react)

### 命名规范
1. 文件夹名：采用英文小写字母命名，多个单词使用`-`拼接
2. 组件文件名：大驼峰式。
3. 类名：大驼峰式。如 Button、AlertDialog
4. 函数名：小驼峰式。如 format、formatDate
5. 变量名：小驼峰式。如 height、curHeight
6. 常量名：全部大写并单词间用下划线分隔。如 NODE_ENV

## 开发流程

```bash
$ npm install
$ npm run start
```

## 注意事项

- 图片请勿超过10kb，超过无法打包进去

## 组件调试方法

1. 编译打包
```bash
$ npm run build
$ mkdir -p temp
$ cp -R dist es lib package.json CHANGELOG.md README.md temp
$ tar czf h5-libs.tar.gz temp
```

2. 拷贝至项目根目录并安装
```bash
$ npm uninstall h5-libs
$ npm install ./h5-libs.tar.gz --save
```

### 提交代码

从 develop 新开一个分支开发，分支命名参考GitLab 分支命名规范

```bash
git checkout -b feature/***
```

开发完成后。

```bash
$ git add .
$ git commit -m "描述"
$ git pull --rebase origin develop
# 解决冲突
$ git push origin feature/***:feature/***
```

提交 PR，指定相应人员 review，根据反馈进一步修改提交。

由 review 人合并进主干后

```bash
$ git checkout develop
$ git pull
```

### 编译发布
由 master 拉取 develop 代码，并在本地由编译提交

```bash
$ git checkout develop
$ git pull
# 修改 `package.json`中的`version`
$ npm install
$ npm run pub
```

### eslint使用
在vscode编辑器中，下载eslint拓展

