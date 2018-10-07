const env = process.env;
export default {
  env: env.NODE_ENV || 'development',
  server: {
    port: env.serverPort || 5000
  },
  mongo: {
    port: env.mongoPort || 27018,
    host: env.mongoHost || '127.0.0.1',
    userName: env.mongoUserName || '',
    password: env.mongoPassword || '',
    db: env.mongDb || 'test'
  }
}