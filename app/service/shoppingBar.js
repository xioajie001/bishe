'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class ShoppingBarService extends Service {
  // 添加订单

  async doAdd() {   
    const { ctx,} = this;
    const data = await ctx.request.body;

    //  添加购物车id
    const day1 = sillyTime.format(new Date(), 'YYYYMMDD');
    const day2 = sillyTime.format(new Date(), 'YYYY-MM-DD');
    const id_number = await ctx.model.ShoppingBar.count({
        addTime:{
        "$gte": day2
      }
    });
    const collectShopingID = day1 + ("00" + (id_number+1)).slice(-2);
    data.collectShopingID = collectShopingID;

    // 添加下单时间
    const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm');
    const addTime = new Date(Time);
    data.addTime = addTime;

    try{
      const result = await ctx.model.ShoppingBar.create(data);    
      return result;
    }catch(err){
      return err;
    }
 
  }

}
module.exports = ShoppingBarService;