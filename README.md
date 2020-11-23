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
  /// ...
  plugins: [
    // ...其余插件
    'taro-plugin-tailwind'
  ]
  /// ...
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

插件接受如下参数：

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| test | RegExp | 是 | `postcss-loader` 的 `Rule.test`，默认值： `/\/src\/tailwind\.src\.css$/`  |

### 注意事项

#### 小程序

小程序不支持使用反斜杠和冒号作为类名，因此默认配置文件 `mini.config.js` 中，反斜杠修改成使用下划线 `_`（参考 [taro-tailwind](https://github.com/windedge/taro-tailwind)）

```jsx
<View className='w-1/3'></View>
```

应该写成:

```jsx
<View className='w-1_3'></View>
```

并且 `preflight` 选项应该始终保持关闭，不加载 [modern-normalize](https://github.com/sindresorhus/modern-normalize)。
