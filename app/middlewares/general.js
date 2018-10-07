import KoaStatic from 'koa-static';
import KoaViews from 'koa-views';
import chalk from 'chalk';
import KoaBodyParser from 'koa-bodyparser';
import { resolve } from 'path';

module.exports = app => {
  /**
   * @desc: print log
   */
  app.use(async (ctx, next) => {
    const start = Date.now();
    console.log(`[${chalk.green(new Date().toLocaleString())}] ${chalk.gray('<--')} ${chalk.bold(ctx.method)} ${chalk.gray(ctx.originalUrl)}`);
    await next();
    const end = Date.now();
    let upstream = 0;
    let color = 'green';
    if (ctx.status >= 400) {
      upstream = 1;
      color = 'red';
    }
    let stdout_str = upstream ? `${chalk.red('xxx')}` : `${chalk.gray('-->')}`;
    console.log(`\t\t    ${stdout_str} ${chalk.bold(ctx.method)} ${chalk.gray(ctx.originalUrl)} ${chalk[color](ctx.status)} ${chalk.gray(end - start)}${chalk.green('ms')} ${chalk.gray(ctx.response.length)}${chalk.green('b')}`);
  });

  /**
   * @desc: use bodyparser to resolve request params
   */
  app.use(KoaBodyParser());

  /**
   * @desc: static sources directory
   */
  app.use(KoaStatic(
    resolve(__dirname, '../', 'public')
  ))

  /**
   * @desc: view sources directory
   */
  app.use(
    KoaViews(
      resolve(__dirname, '../', 'views'),
      {
        extension: 'ejs'
      }
    )
  )
}