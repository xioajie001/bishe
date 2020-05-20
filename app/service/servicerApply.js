'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");
const path = require('path');
const fs = require('fs');
const pump = require('pump');

class ServicerApplyService extends Service {

  //专才申请时获取可选单品
  async getServicerApplyItem(){
      const { ctx } = this;
      let data = await ctx.model.Item.find()
      let itemArr = [];
      for(let i = 0; i < data.length; i++){

          //获取单品id和单品名称
          let itemObj = {}
          itemObj.itemId = data[i]._id;
          itemObj.itemName = data[i].itemName;

          //将单品id和单品名称组成的对象加入数组
          itemArr.push(itemObj);
      }
      return {status : 1, data : itemArr}
  }

  //专才项目申请
  async servicerApply(){
    const { ctx } = this;
    let parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    let certificates = [];
    while ((stream = await parts()) !== null) {
        if (!stream || !stream.filename) {
          break;
        }
        // 表单的名字
        let { filename } = stream;
        console.log(filename);
        // 上传图片的目录
        const dir = await this.service.tools.getUploadFile(filename);
        const target = dir.uploadDir;
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        certificates.push({certificate: dir.saveDir})
      }
    files.certificates = certificates;  
    files = Object.assign(files, parts.field);
    const servicerId = ctx.state.user.data.id;
    files.servicerId = servicerId;
    files.state = "0";
    const time = Date.now();
    files.timestamp = time;
    const sercicer = ctx.model.Servicer.findOne({ _id : servicerId });
    files.operatorId = sercicer.operatorId;
    try{
        await ctx.model.ServicerApply.create(files);
        return{status : 1,msg : "项目申请成功"}
    }catch(err){
        return {status : 0, msg : err};
    
      }
  }

}
module.exports = ServicerApplyService;