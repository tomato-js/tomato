const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const terser = require("rollup-plugin-terser");
const production = process.env.NODE_ENV === "production";
export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "tomato",
        file: `dist/umd/index.umd${production ? ".min" : ""}.js`,
        format: "umd"
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: [["@babel/preset-typescript"]]
      }),
      resolve(),
      commonjs(),
      production && terser.terser()
    ]
  }
];
