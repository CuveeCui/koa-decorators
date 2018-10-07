import {  Route } from '../decorators/router';
import { resolve } from 'path';

module.exports = app => {
  const routesPath = resolve(__dirname, '../routes');
  const ins = new Route(app, routesPath);
  ins.init();
}