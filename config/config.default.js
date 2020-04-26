/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576225884608_9878';

  config.uploadDir = 'app/public/admin/upload/customer';

  //配置session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000*60*60*24,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  //关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    // domainWhiteList: [ 'http://localhost:8080' ],
  };

  // add your middleware config here
  config.middleware = ["csrfAuth"];
  
  config.api = "mongodb://admin:admin123@59.110.162.236:27017:27017/test?authSource=admin";

  // 配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.cors = {
    credentials: true,
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    // match: '/jwt', // optional
  };

  // 数据库配置
  config.mongoose = {
    client: {
      url: 'mongodb://admin:admin123@59.110.162.236:27017:27017/FW?authSource=admin', 
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};


