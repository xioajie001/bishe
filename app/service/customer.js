'use strict';

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

const Service = require('egg').Service;
class CustomerService extends Service {
  // 用户注册
  async add() {
    const { ctx,} = this;
    const data = this.ctx.request.body;
    const query = await this.ctx.model.Customer.find({
      customerZhanghao : data.customerZhanghao
    });

    if( query.length > 0 ){
      return {status : 0, msg : "该账号已存在，请重新输入账号"};
    }else if(data.password == data.password1){
      const cnum = await ctx .model.Customer.count();
      const customerId =( "000000" + (cnum +1)).slice(-6);
      data.customerId = customerId;
    }else{
      return {status : 0, msg : "密码1和密码1不一样，请确认后输入"};
    }

    try{
      const result = await ctx.model.Customer.create(data);
      return {status : 1, msg : "注册成功"};
    }catch(err){
      return err;
    }
    
  }

  // 登录
  async login(){
    const{customerZhanghao,password} = this.ctx.request.body;
    const query = await this.ctx.model.Customer.find({customerZhanghao,password});
    console.log(query)
    if(query.length > 0){
      console.log(query[0].customerId)
      // 设置session
      this.ctx.session.customerId = query[0].customerId;
      console.log(this.ctx.session)
      return {status:1, msg:"登录成功"};
    }else{
      return {status:0, msg:"账号不存在或密码不正确"};
    } 
  }

  //客户信息修改
  async edit(){
    if(this.ctx.session.customerId){
      const data = this.ctx.request.body;
      try{
        const customerId = this.ctx.session.customerId;
        await this.ctx.model.Customer.updateOne({customerId},data);
        return {status : 1, msg : "更新成功"};
      }catch(err){
        return err;
      }     
    }else{
      return {status : 0, msg : "请登录"};
    }   
  }

  async upload() {
    const { ctx } = this;
    if(ctx.session.customerId){
      // 读取表单提交的文件流
      const stream = await ctx.getFileStream();
      const dir = await this.service.tools.getUploadFile(stream.filename);
      // console.log()

      //创建一个可以写入的流
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      //根据session获取要更改头像的客户的id
      const customerId = ctx.session.customerId;
      const saveDir = dir.saveDir;
      try {
        // 把读取到的表单信息流写入创建的可写流
        await stream.pipe(writeStream);
        await this.ctx.model.Customer.updateOne({customerId},{customerProfilePhoto : saveDir});
        return {status : 1, msg : "头像上传成功"};
      } catch (err) {
          // 上传失败销毁流
          await sendToWormhole(stream)
          return {status : 0, msg : "头像上传失败"};
      }
    }else{
      return {status : 0, msg : "请登录"};
    } 
  }

}
module.exports = CustomerService;