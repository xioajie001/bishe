'use strict';

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');
const sillyTime = require("silly-datetime")
const sendToWormhole = require('stream-wormhole');

const Service = require('egg').Service;
class ServicerService extends Service {

  //获取专才个人详情页面（待添加可接项目信息）
  async personal(){
    const{ ctx } = this;
    const id =await ctx.state.user.data.id;
    if(id){
      const servicerId = id;
      const data = await ctx.model.Servicer.findOne({_id :servicerId});
      console.log(data);
      return  {status : 1, msg : data};
    }else{
      return {status : 0, msg : "请登录"};
    }  
  }

  // 专才注册
  async doAdd() {
    const { ctx,} = this;
    const data = this.ctx.request.body;
    console.log(data);
    const query = await this.ctx.model.Servicer.find({
      servicerZhanghao : data.servicerZhanghao
    });

    if( query.length > 0 ){
      return {status : 0, msg : "该账号已存在，请重新输入账号"};
    }else if(data.password == data.password1){
      //添加注册时间
      const time = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      data.servicerRegistrationDate = time;
    }else{
      return {status : 0, msg : "密码1和密码1不一样，请确认后输入"};
    }

    try{
      const result = await ctx.model.Servicer.create(data);
      return {status : 1, msg : "注册成功"};
    }catch(err){
      console.log(err)
      return {status : 0, msg : err};
    }
    
  }

  // 登录
  async login(){
    const{servicerZhanghao,password} = this.ctx.request.body;
    const query = await this.ctx.model.Servicer.find({servicerZhanghao,password});
    if(query.length > 0){
      return {status:1,
         msg:"登录成功",
         token: await this.ctx.service.actionToken.apply( query[0]._id ) //设置
        };
    }else{
      return {status:0, msg:"账号不存在或密码不正确"};
    } 
  }

  //专才信息修改
  async doEdit(){
    const id =await ctx.state.user.data.id;
    if(id){
      const data = this.ctx.request.body;
      try{
        const servicerId = id;
        await this.ctx.model.Servicer.updateOne({_id : servicerId},data);
        return {status : 1, msg : "更新成功"};
      }catch(err){
        return err;
      }     
    }else{
      return {status : 0, msg : "请登录"};
    }   
  }

  //专才头像上传
  async upload() {
    const { ctx } = this;
    const id =await ctx.state.user.data.id;
    if(id){
      // 读取表单提交的文件流
      const stream = await ctx.getFileStream();
      const dir = await this.service.tools.getUploadFile(stream.filename);
      // console.log()

      //创建一个可以写入的流
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      //根据session获取要更改头像的专才的id
      const servicerId = id;
      const saveDir = dir.saveDir;
      try {
        // 把读取到的表单信息流写入创建的可写流
        await stream.pipe(writeStream);
        const result = await this.ctx.model.Servicer.updateOne({_id : servicerId},{servicerProfilePhoto : saveDir});
        console.log(result);
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

  //最大接单数设置
  async setMaxWorkeOrder(){
    const {ctx} = this;
    const id = await ctx.state.user.data.id;
    console.log(id);
    //从前端接收接单数数量参数
    const data = await ctx.request.body;
    console.log("data:",data);
    try{
      const result = await ctx.model.Servicer.updateOne({_id : id }, data);
      return {status : 1, msg : "最大接单数设置成功"};
    }catch(err){
      console.log(err);
      return err;
    }
  }

  //接单状态调整
  async setServicerStatus(){
    const {ctx} = this;
    const id = ctx.state.user.data.id;
    //从前端获取servicerStatus参数
    const data = ctx.request.body;
    try{
      await ctx.model.Servicer.updateOne({_id : id}, data);
      return {status : 1, msg : "接单状态调整成功"};
    }catch(err){
      console.log(err);
      return err;
    }
  }
}
module.exports = ServicerService;