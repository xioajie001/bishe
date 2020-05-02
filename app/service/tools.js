'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const baseMd5 = require('md5');
const sillyTime = require('silly-datetime');
const mkdirp = require('mz-modules/mkdirp');
const path = require('path');

    

class ToolsService extends Service {
  
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#ddd',
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }

  async md5(str) {
    return baseMd5(str);
  }

  async getTime() {
    const date = new Date();
    return date.getTime();
  }

  async getObjectId( id ){
    console.log("id",id);
    const mongoose = require('mongoose');
    let ObjectId = mongoose.Types.ObjectId;
    console.log(new ObjectId(id));
    return new ObjectId(id);
     
  }

  async getUploadFile(filename) {
    // 获取当前日期
    const day = sillyTime.format(new Date(), 'YYYYMMDD');
    // 创建图片保存路径
    const dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);
    // 毫秒数
    const time = await this.getTime();
    // 返回图片保存的路径
    const uploadDir = path.join(dir, time + path.extname(filename));
    return {
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
      uploadDir,
    };
  }

  //获取数组中最小值
  async getMin(arr){
    arr.sort(function (a, b) {
      return a-b;
    }); 
    return arr[0];
  }

  //获取数组中最大值
  async getMax(arr){
    arr.sort(function (a, b) {
      return a-b;
    }); 
    return arr[arr.length - 1 ];
  }
}

module.exports = ToolsService;
