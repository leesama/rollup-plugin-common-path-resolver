# rollup-plugin-common-path-resolver

[English](README.md) | [中文](README_CN.md)

`rollup-plugin-common-path-resolver` 是一个为 Rollup 打包工具设计的插件，旨在提高项目中公共路径的解析效率。通过自定义配置，该插件能够在项目的不同部分之间智能地解析和共享代码，特别适用于大型项目或多包仓库，其主要用途在于支持在大型项目或多包管理场景下（如 Monorepo 结构）中灵活地复用代码。特别适用于那些基于标准版产品进行开发的场景，当需要从标准版中导入代码或功能模块以构建特定的产品版本时，该插件能够提供极大的便利和效率。

## 场景示例

想象你正在维护一个具有多个版本的产品，比如一个标准版和多个定制版。每个版本都需要复用标准版中的大量代码和组件，同时添加一些特定功能或者修改某些特性。使用 rollup-plugin-common-path-resolver，你可以轻松地在项目的不同部分之间共享和复用代码，只需简单地配置路径解析规则，无需复杂的相对路径导入，使得代码管理变得更加简洁和高效。

## 功能

- **路径自动解析**：自动解析项目中的共享路径，避免手动指定路径的复杂性。
- **高度可配置**：提供多种配置选项，以适应不同的项目结构和需求。
- **提高代码共享性**：促进项目内部的代码复用，简化项目结构。
- **易于集成**：可以轻松集成到现有的 Rollup 构建流程中。

## 安装

使用 npm:

```bash
npm install rollup-plugin-common-path-resolver --save-dev
```

使用 yarn:

```bash
yarn add rollup-plugin-common-path-resolver --dev
```

使用 pnpm:

```bash
pnpm add rollup-plugin-common-path-resolver --dev
```

## 使用方法

在 Rollup 配置文件中引入并配置 `rollup-plugin-common-path-resolver`：

```js
import commonPathResolver from 'rollup-plugin-common-path-resolver';

export default {
  // 其他配置...
  plugins: [
    commonPathResolver({
      // 配置选项
      packagePathSegment: 'packages',
      sourcePathSegment: 'src',
      commonFolderName: 'common',
      pathPrefix: '@',
    })
  ]
};
```

## 配置选项

- **packagePathSegment** (`string`): 示例路径部分，用于定位项目中的包以及公共包所在路径。默认为 `'packages'`。
- **sourcePathSegment** (`string`): 源代码路径部分，通常是项目中存放源代码的目录。默认为 `'src'`。
- **commonFolderName** (`string`): 公共文件夹的名称，用于共享代码的目录。默认为 `'common'`。
- **pathPrefix** (`string`): 路径前缀，用于替换源路径前缀。默认为 `'@'`。
- **exclude** (`RegExp`): 排除特定路径的正则表达式，匹配的路径将不会被插件处理。

## 示例

假设你的项目结构如下：

```
my-project/
  module1/
    src/
      index.js
  module2/
    src/
      index.js
  common/
    src/
      utils.js
```

你可以使用 `rollup-plugin-common-path-resolver` 插件，配置路径前缀 `@` 指向 `common` 目录，从而在 `module1` 和 `module2` 中轻松共享 `utils.js` 文件。

## 进一步探索

为了更好地理解如何使用 rollup-plugin-common-path-resolver，建议查看项目的 packages 目录，那里提供了更详细的示例代码，可以帮助你快速上手和深入了解该插件的使用方式。

## 支持和贡献

如果你遇到任何问题或有改进建议，欢迎在项目的 GitHub 仓库中提出 issue 或 pull request。

## 许可证

本项目采用 MIT 许可证。有关详细信息，请查看 LICENSE 文件。
