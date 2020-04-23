const chalk = require("chalk");

const isProduction = () => process.env.NODE_ENV === "prod";
const logger = {
  info(msg) {
    console.info(chalk.blue(msg));
  },
  success(msg) {
    console.log(chalk.green(msg));
  },
  error(msg) {
    console.error(chalk.red(msg));
  },
};
exports.isProduction = isProduction;
exports.logger = logger;
