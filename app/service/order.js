'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class OrderService extends Service {
  // 添加订单

  async doAdd() {   
    const { ctx,} = this;
    const data = await ctx.request.body;

    //  添加订单id
    const day1 = sillyTime.format(new Date(), 'YYYYMMDD');
    const day2 = sillyTime.format(new Date(), 'YYYY-MM-DD');
    const id_number = await ctx.model.Order.count({
      orderTime:{
        "$gte": day2
      }
    });
    const orderID = day1 + ("0000" + (id_number+1)).slice(-4);
    data.orderID = orderID;

    // 添加下单时间
    const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm');
    const orderTime = new Date(Time);
    data.orderTime = orderTime;

    // 添加订单状态
    data.orderState = "0";

    try{
      const result = await ctx.model.Order.create(data);    
      return result;
    }catch(err){
      return err;
    }
 
  }

}
module.exports = OrderService;