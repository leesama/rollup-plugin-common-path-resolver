# rollup-plugin-common-path-resolver

[English](README.md) | [中文](README_CN.md)

`rollup-plugin-common-path-resolver` is a plugin designed for the Rollup bundling tool, aimed at improving the efficiency of resolving common paths in projects. Through custom configuration, this plugin can intelligently resolve and share code between different parts of a project, making it particularly suitable for large projects or multi-package repositories. Its main purpose is to support flexible code reuse in large projects or multi-package management scenarios (such as Monorepo structures), especially in scenarios where development is based on a standard product version. When it is necessary to import code or functionality modules from the standard version to build a specific product version, this plugin can offer great convenience and efficiency.

## Scenario Example

Imagine you are maintaining a product with multiple versions, such as a standard version and several customized versions. Each version needs to reuse a large amount of code and components from the standard version while adding some specific functions or modifying certain features. Using rollup-plugin-common-path-resolver, you can easily share and reuse code between different parts of the project by simply configuring path resolution rules, without the need for complex relative path imports, making code management more concise and efficient.

## Features

- **Automatic Path Resolution**: Automatically resolves shared paths in the project, avoiding the complexity of manually specifying paths.
- **Highly Configurable**: Provides a variety of configuration options to adapt to different project structures and needs.
- **Enhanced Code Shareability**: Promotes the reuse of code within the project, simplifying the project structure.
- **Easy to Integrate**: Can be easily integrated into the existing Rollup build process.

## Installation

Using npm:

```bash
npm install rollup-plugin-common-path-resolver --save-dev
```

Using yarn:

```bash
yarn add rollup-plugin-common-path-resolver --dev
```

Using pnpm:

```bash
pnpm add rollup-plugin-common-path-resolver --dev
```

## Usage

In the Rollup configuration file, import and configure `rollup-plugin-common-path-resolver`:

```js
import commonPathResolver from 'rollup-plugin-common-path-resolver';

export default {
  // Other configurations...
  plugins: [
    commonPathResolver({
      // Configuration options
      packagePathSegment: 'packages',
      sourcePathSegment: 'src',
      commonFolderName: 'common',
      pathPrefix: '@',
    })
  ]
};
```

## Configuration Options

- **packagePathSegment** (`string`): The example path segment is used to locate packages within the project as well as the path to common packages. The default is `'packages'`.
- **sourcePathSegment** (`string`): The source code path segment, usually the directory where source code is stored in the project. Default is `'src'`.
- **commonFolderName** (`string`): The name of the common folder, used for directories sharing code. Default is `'common'`.
- **pathPrefix** (`string`): The path prefix, used to replace the source path prefix. Default is `'@'`.
- **exclude** (`RegExp`): A regular expression to exclude specific paths, which will not be processed by the plugin.

## Example

Suppose your project structure is as follows:

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

You can use the `rollup-plugin-common-path-resolver` plugin, configuring the path prefix `@` to point to the `common` directory, thus easily sharing the `utils.js` file between `module1` and `module2`.

## Further Exploration

To better understand how to use `rollup-plugin-common-path-resolver`, it is recommended to check out the project's `packages` directory. There, you will find more detailed sample code that can help you quickly get started and gain a deeper understanding of how to use this plugin.

## Support and Contribution

If you encounter any problems or have suggestions for improvement, feel free to raise an issue or pull request in the project's GitHub repository.

## License

This project is licensed under the MIT License. For detailed information, please see the LICENSE file.