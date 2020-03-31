'use strict';


const sillyTime = require("silly-datetime");
const Service = require('egg').Service;

class ComplainService extends Service {

  // 用户投诉
  async doAdd() {
    const { ctx,} = this;
    if(ctx.session.customerId){
        const data = ctx.request.body;
        //添加客户id
        const custonerId = ctx.session.customerId;
        data.customerId = custonerId
        //添加投诉时间
        const time = sillyTime.format(new Date(), "YYYY-MM-DD, HH:mm:ss")
        console.log(time)
        data.complainDate = time;
        try{
            const result = await ctx.model.Complain.create(data);
            return result;
        }catch(err){
            console.log(err);
            return {status : 0, msg : "投诉未成功，请在尝试一次"}
        }
        
    }else{
        return{status : 0, msg : "请登录"}
    }   
  }
}
module.exports = ComplainService;