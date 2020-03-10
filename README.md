# tomato-js [![npm](https://img.shields.io/npm/v/@tomato-js/entry.svg?maxAge=2592000)](https://www.npmjs.com/package/@tomato-js/entry) [![Build Status](https://travis-ci.org/tomato-js/tomato.svg?branch=master)](https://travis-ci.org/tomato-js/tomato) [![Test coverage](https://img.shields.io/codecov/c/github/tomato-js/tomato.svg?style=flat-square)](https://codecov.io/gh/tomato-js/tomato) [![npm download](https://img.shields.io/npm/dm/@tomato-js/shared.svg?style=flat-square)]()

[English Document](./README_EN.md)

⚡️ 简洁、可拆分模块的针对 web 应用的 utils。[API 文档](https://tomato-js.github.io/tomato/index.html)

## 使用

通过 UMD 的方式应用在浏览器端：

```html
<script src="https://unpkg.com/@tomato-js/entry/dist/umd/index.umd.min.js"></script>
```

通过 npm 安装所有模块

```sh
npm i @tomato-js/entry
```

通过 npm 安装指定单个模块

```sh
npm i @tomato-js/element
```

## 模块划分

### @tomato-js/entry

包含所有模块，如果是 umd 方式，通过`window.tomato.moduleName.apiName`来使用具体模块的具体方法。

支持 commonjs：

```js
const tomato = require("@tomato-js/entry");
```

和 esm：

```js
import { element, path } from "@tomato-js/entry";
```

### @tomato-js/array

数组方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_array.html)

### @tomato-js/cookie

cookie 方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_cookie.html)

### @tomato-js/element

DOM 方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_element.html)

### @tomato-js/env

环境判断方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_env.html)

### @tomato-js/math

数学运算方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_math.html)

### @tomato-js/object

对象方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_object.html)

### @tomato-js/path

路径处理方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_path.html)

### @tomato-js/shared

公有方法和类型变量，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_shared.html)

### @tomato-js/string

字符串方法，[文档](https://tomato-js.github.io/tomato/modules/_tomato_js_string.html)

## 例子

全部例子参考[examples](https://github.com/tomato-js/examples/blob/master/README_ZH.md)。
