
const { isProduction,logger } = require("./config/utlils");
const loadConfigFile = require("rollup/dist/loadConfigFile");
const path = require("path");
const rollup = require("rollup");
let watcher;
loadConfigFile(path.resolve(__dirname, "config/index.js")).then(
  async ({ options, warnings }) => {
    warnings.flush();
    const bundle = await rollup.rollup(options[0]);
    await Promise.all(options[0].output.map(bundle.write));
    if(!isProduction()) {
      watcher = rollup.watch(options);
      watcher.on('event', event => {
        switch(event.code) {
          case 'START': logger.info('开始编译代码');break;
          case 'BUNDLE_START':
          case 'BUNDLE_END':
            logger.info('编译代码中...');break;
          case 'END':
            logger.success('编译成功');break;
          case 'FATAL':
            logger.error('不可预估的错误');break
        }
      });
    }
  }
);
