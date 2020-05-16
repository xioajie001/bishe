'use strict';

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');
const sillyTime = require("silly-datetime")
const sendToWormhole = require('stream-wormhole');

const Service = require('egg').Service;
class CustomerService extends Service {

  //获取个人详情页面
  async personal(){
    const{ ctx } = this;
    const id =await ctx.state.user.data.id;
    if(id){
      const data = await ctx.model.Customer.findOne({ _id : id });
      // data.csrf = ctx.csrf;
      console.log(data);
      return data;
    }else{
      return {status : 0, msg : "请登录"};
    }  
  }

  // 用户注册
  async doAdd() {
    const { ctx,} = this;
    const data = this.ctx.request.body;
    const query = await this.ctx.model.Customer.find({
      customerZhanghao : data.customerZhanghao
    });

    if( query.length > 0 ){
      return {status : 0, msg : "该账号已存在，请重新输入账号"};
    }else if(data.password == data.password1){

      //给密码进行md5加密
      data.password = await ctx.service.tools.md5(data.password);

      //添加注册时间
      const time = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      data.customerRegistrationDate = time;
      
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
    if(query.length > 0){
      return {
        status:1,
        msg:"登录成功", 
        token: await this.ctx.service.actionToken.apply( query[0]._id )
      };
    }else{
      return {status:0, msg:"账号不存在或密码不正确"};
    } 
  }

  //客户信息完善
  async doEdit(){
    const id =await this.ctx.state.user.data.id;
    const data = this.ctx.request.body;
    try{
      await this.ctx.model.Customer.updateOne({ _id : id },data);
      return {status : 1, msg : "更新成功"};
    }catch(err){
      return err;
    }      
  }

  async upload() {
    const { ctx } = this;
      // 读取表单提交的文件流
      const stream = await ctx.getFileStream();
      const dir = await this.service.tools.getUploadFile(stream.filename);
      // console.log()

      //创建一个可以写入的流
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      //根据token获取要更改头像的客户的id
      const customerId =await ctx.state.user.data.id;
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
  }
  
}
module.exports = CustomerService;