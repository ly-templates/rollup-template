const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const path = require('path')
const { addTestAnswers } = require('./scenarios')
module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  prompts: {
    name: {
      when: "isNotTest",
      type: "string",
      required: true,
      message: "项目名称"
    },
    description: {
      when: "isNotTest",
      type: "string",
      required: false,
      message: "项目描述",
      default: "a vue project"
    },
    version: {
      when: "isNotTest",
      type: 'string',
      message: "版本号",
      default: '1.0.0'
    },
    author: {
      when: "isNotTest",
      type: "string",
      message: "作者"
    },
    vue: {
      when: "isNotTest",
      type: 'confirm',
      message: '支持Vue开发?'
    },
    json: {
      when: "isNotTest",
      type: 'confirm',
      message: '支持json格式文件?'
    },
    image: {
      when: "isNotTest",
      type: 'confirm',
      message: '支持SVG、PNG、JPEG、WebP格式图片?'
    },
    terser: {
      when: "isNotTest",
      type: 'confirm',
      message: '支持JS压缩?'
    },
    module: {
      when: 'isNotTest',
      type: 'list',
      message:
        '支持输出类库模块格式?',
      choices: [
        {
          name: '使用es module',
          value: 'es',
          short: 'es',
        },
        {
          name: '使用umd',
          value: 'umd',
          short: 'umd',
        },
        {
          name: '使用cjs',
          value: 'cjs',
          short: 'cjs',
        },
      ]
    },
    css: {
      when: 'isNotTest && vue',
      type: 'list',
      message:
        '支持的CSS预处理?',
      choices: [
        {
          name: '使用sass、scss',
          value: 'scss',
          short: 'scss',
        },
        {
          name: '使用less',
          value: 'less',
          short: 'less',
        },
        {
          name: '不用了，我不需要',
          value: false,
          short: 'no',
        },
      ]
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        '创建项目后，我们应该为您运行`npm install`吗?',
      choices: [
        {
          name: '是的,使用npm',
          value: 'npm',
          short: 'npm',
        },
        {
          name: '是的,使用yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: '不用了，我手动安装它',
          value: false,
          short: 'no',
        },
      ]
    }
  },
  filters: {
    'example/**/*': "vue",
    "src/component": "vue",
    "src/component/Switch/switch.scss":"vue && css === 'scss'",
    "src/component/Switch/switch.less":"vue && css === 'less'",
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
};
