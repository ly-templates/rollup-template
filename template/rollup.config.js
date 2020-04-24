const { isProduction, logger } = require("./config/utlils");
const loadConfigFile = require("rollup/dist/loadConfigFile");
const path = require("path");
const rollup = require("rollup");
const ora = require("ora");

let watcher;
loadConfigFile(path.resolve(__dirname, "config/index.js")).then(
  async ({ options, warnings }) => {
    console.log(`We currently have ${warnings.count} warnings\n`);
    warnings.flush();
    const bundle = await rollup.rollup(options[0]);
    await Promise.all(options[0].output.map(bundle.write));
    if (!isProduction()) {
      watcher = rollup.watch(options);
      const spinner = ora("Loading unicorns");
      spinner.color = "green";
      watcher.on("event", (event) => {
        switch (event.code) {
          case "START":
            spinner.start("开始编译");
            break;
          case 'BUNDLE_START':
          case 'BUNDLE_END':
            spinner.text = '编译中';break;
          case "END":
            spinner.succeed("编译成功\n");
            logger.success("持续监听文件更新...");
            break;
          case "FATAL":
            spinner.fail("编译失败");
            break;
        }
      });
    }
  }
);
