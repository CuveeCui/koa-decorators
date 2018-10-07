import KoaRouter from 'koa-router';
import { resolve } from 'path';
import glob from 'glob';

const pathPrefix = Symbol('pathPrefix');
const routeMap = [];

export class Route {
  constructor(app, routesPath) {
    this.app = app;
    this.router = new KoaRouter();
    this.routesPath = routesPath;
  }
  init() {
    const { app, router, routesPath } = this;
    glob.sync(resolve(routesPath, './*.js')).forEach(require);
    routeMap.forEach(item => {
      const prefix = item.target[pathPrefix];
      router[item.method](`${prefix}${item.path}`, ...item.callback)
    })
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

export const setRouter = method => path => (target, key, descriptor) => {
  routeMap.push({
    target,
    method,
    path,
    callback: target[key] instanceof Array ? target[key] : new Array(target[key])
  })
  return descriptor;
}

export const Controller = path => target => { target.prototype[pathPrefix] = path };
export const Get = setRouter('get');
export const Post = setRouter('post');
export const Put = setRouter('put');
export const Delete = setRouter('delete');