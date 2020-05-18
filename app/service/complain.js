'use strict';


const sillyTime = require("silly-datetime");
const Service = require('egg').Service;

class ComplainService extends Service {

  // 用户投诉
  async doAdd() {
    const { ctx,} = this;
    const id = await ctx.state.user.data.id;
    const data = ctx.request.body;

    //添加客户id
    data.customerId = id;

    //添加投诉时间
    const time = sillyTime.format(new Date(), "YYYY-MM-DD, HH:mm:ss");
    data.complainDate = time;

    try{
      const result = await ctx.model.Complain.create(data);
      return {status : 1, msg : "投诉成功"};
    }catch(err){
      console.log(err);
      return {status : 0, msg : "投诉未成功，请在尝试一次"}
    }
        
  }
}
module.exports = ComplainService;