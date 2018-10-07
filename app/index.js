import Koa from 'koa';
import { resolve } from 'path';
import glob from 'glob';
import chalk from 'chalk';
import config from '../config';
const app = new Koa();

glob.sync(resolve(__dirname, 'middlewares', '*.js')).forEach(item => {
  require(item)(app);
})

app.listen(config.server.port, () => {
  console.log(
    config.env === 'development'
      ? `Open ${chalk.green(`http://127.0.0.1:${config.server.port}`)}`
      : `App listening on port ${port}`
  )
});