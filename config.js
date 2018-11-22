module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://atrujic1000:lazarus123!!!@ds029831.mlab.com:29831/customer_api',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}