'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class ShoppingBarService extends Service {

  //获取购物车信息
  async getShoppingBar(){
    const{ ctx } = this;
    if(ctx.session.customerId){
      const customerId = ctx.session.customerId;
      console.log(customerId);
      const data = await ctx.model.ShoppingBar.find({customerId : customerId});
      return data;
    }else{
      return {status : 0, msg : "请登录"}
    }
  }

  // 添加购物车
  async doAdd() {   
    const { ctx,} = this;

    if(ctx.session.customerId){
      const data = await ctx.request.body;

      //获取客户id
      data.customerId = ctx.session.customerId;

      // 添加加入购物车时间
      const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const addTime = new Date(Time);
      data.addTime = addTime;

      //添加数据到数据库
      try{
        const result = await ctx.model.ShoppingBar.create(data);    
        return result;
      }catch(err){
        return err;
      }
    }else{
      return {status : 0, msg : "请登录"};
    }
  }

}
module.exports = ShoppingBarService;