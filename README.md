# taro-plugin-tailwind

Taro 接入 tailwindcss 插件，支持大多数小程序（已测试微信、支付宝、百度小程序） / H5，React Native 暂未测试。

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i taro-plugin-tailwind --save-dev
$ # 或使用 yarn
$ yarn add -D taro-plugin-tailwind
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 3 的最新版本（3.5+），确保 `taro-plugin-tailwind` 版本在 `v1.3.0` 及以上。

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
            // 具体参数为 tailwind postcss 配置项，见：https://github.com/tailwindlabs/tailwindcss/blob/master/types/config.d.ts#L352
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

在项目主 CSS 文件（如 `style.css / main.css`）引入 `tailwindcss`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

由此即可在项目任意位置使用 `tailwindcss`，并**不再**需要手动引入其它文件。

### 参数

插件接受如下参数：

| 参数项 | 类型   | 是否可选 | 用途                                                                     |
| :----- | :----- | :------- | :----------------------------------------------------------------------- |
| config   | Object | 是       | `tailwindcss` 的 PostCSS 可选配置（[Config](https://github.com/tailwindlabs/tailwindcss/blob/master/types/config.d.ts#L352)）。 |

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

此外，部分小程序平台由于所支持的选择器非常有限（如微信小程序，详见 [WXSS | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)），不能使用 `tailwindcss` 的某些特性（如 `Attributify Mode`、`space-*` 等），并非插件问题，有此类需求可考虑使用其它优秀方案：[mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)。

## 常见问题

**Q：为什么 Intellisense 失效了？**

A：根据所使用的版本选择安装 [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)。

**Q：保存后新样式没有生效？**

A：请暂时设置 `NODE_ENV` 为 `production` 解决此问题，例：`NODE_ENV=production npm run build:weapp -- --watch`，具体参见[示例](https://github.com/pcdotfan/taro-plugin-tailwind/tree/main/example)。
