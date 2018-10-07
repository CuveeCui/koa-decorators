import mongoose from 'mongoose';
import { resolve } from 'path';
import glob from 'glob';
import config from '../../config';
mongoose.Promise = global.Promise;

glob.sync(resolve(__dirname, '../model', '**/*.js')).forEach(require);

class MongoClient {
  constructor() {
    this.instance = null;
    this.env = process.env;
    this.options = {
      reconnectTries: Number.MAX_VALUE,
      poolSize: 10,
      useNewUrlParser: true
    }
    this.mongoClient = this.makeClient();
    mongoose.connection.on('connected', this._connected.bind(this));
    mongoose.connection.on('error', this._error.bind(this));
    mongoose.connection.on('disconnected',this._disconnected.bind(this));
  }
  /**
   * @desc: singleton
   * @returns {*}
   */
  static generateInstance() {
    this.instance = this.instance || new MongoClient();
    return this.instance;
  }
  /**
   * @desc: build connect to mongo server
   * @returns {Promise}
   */
  makeClient() {
    const [
      host,
      port,
      userName,
      password,
      db
    ] = [
      config.mongo.host,
      config.mongo.port,
      config.mongo.userName,
      config.mongo.password,
      config.mongo.db
    ];
    return mongoose.connect(
      userName && password ? `mongodb://${userName}:${password}@${host}:${port}/${db}` : `mongodb://${host}:${port}/${db}`,
      this.options
    )
  }
  /**
   * @desc: bind err event
   * @param err
   * @private
   */
  _error(err) {
    console.log(`Mongoose connect error: ${err}`);
  }
  /**
   * @desc: bind conneted event
   * @private
   */
  _connected() {
    console.log(`Mongoose connected to server ${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);
  }
  /**
   * @desc: bind disconnected event
   * @private
   */
  _disconnected() {
    console.log(`Mongoose disconneted`);
    this.makeClient();
  }
  /**
   * @desc: close mongoClient
   */
  close() {
    mongoose.connection.close();
  }
}

module.exports = app => {
  MongoClient.generateInstance();
};