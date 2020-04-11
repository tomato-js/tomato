const fs = require("fs");
const utilList = fs.readdirSync("./packages");
const version = fs.readFileSync("./package.json").version;
const { kebabCase } = require("../packages/string");
module.exports = {
  description: "generate vue component",
  prompts: [
    {
      type: "list",
      message: "请选择新增的函数位于哪个文件夹下:",
      name: "scope",
      choices: utilList
    },
    {
      type: "input",
      name: "name",
      message: "请输入函数名称（采用驼峰命名如isArray或者curry）:"
    }
  ],
  actions: data => {
    const { scope, name } = data;
    const actions = [
      {
        type: "add",
        path: `packages/${scope}/src/${kebabCase(name)}.ts`,
        templateFile: "plop-templates/util/util.hbs",
        data: {
          name,
          scope,
          version
        }
      },
      {
        type: "add",
        path: `packages/${scope}/__tests__/${kebabCase(name)}.test.ts`,
        templateFile: "plop-templates/util/test.hbs",
        data: {
          name,
          scope
        }
      },
      {
        type: "append",
        path: `packages/${scope}/src/index.ts`,
        templateFile: "plop-templates/util/index.hbs",
        data: {
          name,
          kebabName: kebabCase(name)
        }
      }
    ];

    return actions;
  }
};
