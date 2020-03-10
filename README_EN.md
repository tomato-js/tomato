# tomato-js [![npm](https://img.shields.io/npm/v/@tomato-js/entry.svg?maxAge=2592000)](https://www.npmjs.com/package/@tomato-js/entry)

⚡️Simple, Modular Utils for Web Applications. [API Docs](https://tomato-js.github.io/tomato/index.html)

## Usage

In browser with UMD:

```html
<script src="https://unpkg.com/@tomato-js/entry/dist/umd/index.umd.min.js"></script>
```

install all modules with npm:

```sh
npm i @tomato-js/entry
```

install single module with npm:

```sh
npm i @tomato-js/element
```

## Modules

### @tomato-js/entry

Contains all modules. Use module'api through `window.tomato.moduleName.apiName` in UMD style.

It also support commonjs:

```js
const tomato = require("@tomato-js/entry");
```

and esm:

```js
import { element, path } from "@tomato-js/entry";
```

### @tomato-js/array

Methods for array, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_array.html)

### @tomato-js/cookie

Methods for cookie, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_cookie.html)

### @tomato-js/element

Methods for dom, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_element.html)

### @tomato-js/env

Methods for judge environment, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_env.html)

### @tomato-js/math

Methods for math operation, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_math.html)

### @tomato-js/object

Methods for object, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_object.html)

### @tomato-js/path

Methods for path such as queryString/url, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_path.html)

### @tomato-js/shared

Methods for common type and func, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_shared.html)

### @tomato-js/string

Methods for string, [API Docs](https://tomato-js.github.io/tomato/modules/_tomato_js_string.html)

## Examples

[examples](https://github.com/tomato-js/examples/blob/master/README.md).