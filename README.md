# taro-plugin-tailwind

> Taro 接入 [tailwindcss](https://tailwindcss.com/) (2.0) 插件，支持 H5 / 小程序，RN 端未测试。

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i taro-plugin-tailwind --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 3 的最新版本。

修改项目 `config/index.js` 中的 `plugins` 配置如下：

```js
const config = {
  ...
  plugins: [
    ...其余插件

    'taro-plugin-tailwind'
  ]
  ...
}
```

### 生成配置

执行 `taro tailwind --init` 生成必要的配置文件：

```bash
$ taro tailwind --init // 默认生成 mini, h5 两种配置文件且必须存在
$ taro tailwind --init weapp,tt,swan // 生成其它平台以 (,) 分隔
```

`tailwind.src.css` 文件自行放置在项目 `/src` 目录下，正常引用即可。

### 参数

插件可以接受如下参数：

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| test | RegExp | 是 | `postcss-loader` 的 `Rule.test`，默认值： `/\/src\/tailwind\.src\.css$/`  |
