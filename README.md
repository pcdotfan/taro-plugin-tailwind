# taro-plugin-tailwind

Taro 接入 windicss / tailwindcss 插件，支持小程序 / H5，React Native 暂未测试。

`1.1.x` 及之后版本使用 [windicss](https://windicss.org/)，`1.0.x（不再维护）` 版本使用 [tailwindcss](https://tailwindcss.com/)，相关问题请自行查阅对应文档。

`1.2.x` 仅支持 Taro 3.3 及以上版本，其它版本请自行降级。

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i taro-plugin-tailwind --save-dev
$ # 或使用 yarn
$ yarn add -D taro-plugin-tailwind
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 3 的最新版本，确保 `taro-plugin-tailwind` 版本在 `v1.1.0` 及以上。

修改项目 `config/index.js` 中的 `plugins` 配置如下：

```js
const config = {
    /// ...
    plugins: [
        // ...其余插件
        'taro-plugin-tailwind',
    ],
    /// ...
    /// 亦或是传入具体参数：
    plugins: [
        // ...其余插件
        ['taro-plugin-tailwind', {
            // 具体参数见：https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts#L10
        }]
    ],
};
```

### 生成配置

执行 `taro tailwind --init` 生成必要的配置文件：

```bash
$ taro tailwind --init // 默认生成 mini, h5 两种配置文件且必须存在
$ taro tailwind --init weapp,tt,swan // 生成其它平台以 (,) 分隔
```

在项目入口文件（如 `main.js / app.tsx`）引入 `windi.css`：

```js
import 'windi.css';
```

由此即可在项目任意位置使用 `windicss`，并**不再**需要手动引入其它文件。

### 参数

插件接受如下参数：

| 参数项 | 类型   | 是否可选 | 用途                                                                     |
| :----- | :----- | :------- | :----------------------------------------------------------------------- |
| config   | Object | 是       | `windicss-webpack-plugin` 的可选参数（[UserOption](https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts#L10)），默认值： `{ scan: { dirs: ['./src'], fileExtensions: ['vue', 'jsx', 'tsx'] } }`。 |

## 注意事项及限制

### 小程序

小程序不支持使用反斜杠和冒号作为类名，因此默认配置文件 `mini.config.js` 中，**冒号、反斜杠** 修改成使用下划线 `_`（参考 [taro-tailwind](https://github.com/windedge/taro-tailwind)）

```jsx
<View className="w-1/3"></View>
```

应该写成:

```jsx
<View className="w-1_3"></View>
```

配置文件中 `separator` 也设置为 `_`（[configuration#separator](https://tailwindcss.com/docs/configuration#separator)）并且 `preflight` 选项应该始终保持关闭，不加载 [modern-normalize](https://github.com/sindresorhus/modern-normalize)。

此外，部分小程序平台由于所支持的选择器非常有限（如微信小程序，详见 [WXSS | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)），不能使用 `windicss / tailwindcss` 的某些特性（如 `Attributify Mode`、`space-*` 等），并非插件问题，有此类需求可考虑使用其它优秀方案：[mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)。

## 常见问题

**Q：为什么 Intellisense 失效了？**

A：根据所使用的版本选择安装 [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) 或 [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)。

**Q：保存后新样式没有生效？**

A：请暂时设置 `NODE_ENV` 为 `production` 解决此问题，例：`NODE_ENV=production npm run build:weapp -- --watch`，具体参见[示例](https://github.com/pcdotfan/taro-plugin-tailwind/tree/main/example)。
