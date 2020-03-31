'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class OrderService extends Service {

  //查看订单
  async getOrder(){
    const{ ctx } = this;
    if(ctx.session.customerId){
      const customerId = ctx.session.customerId;
      const data = await ctx.model.Order.find({customerId : customerId});
      return data;
    }else{
      return {status : 0, msg : "请登录"}
    }
  }

  // 添加订单
  async doAdd() {   
    const { ctx,} = this;

    if(ctx.session.customerId){
      const data = await ctx.request.body;

      //  添加订单id
      const day1 = sillyTime.format(new Date(), 'YYYYMMDD');
      const day2 = sillyTime.format(new Date(), 'YYYY-MM-DD');
      const id_number = await ctx.model.Order.count({
        orderTime:{
          "$gte": day2
        }
      });
      const orderId = day1 + ("0000" + (id_number+1)).slice(-4);
      data.orderId = orderId;

      //添加下单人
      const customerId = ctx.session.customerId;
      data.customerId = customerId;

      // 添加下单时间
      const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
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
    }else{
      return {status : 0, msg : "请登录"};
    }   
  }

  //验收服务
  async confirm(){
    const { ctx } = this;
    if(ctx.session.customerId){
      const data = ctx.request.body;
      try{
        await ctx.model.Order.updateOne(data,{orderState : "4"});
        await ctx.model.Workorder.updateOne(data,{W_state : "0"});
        return {status : 1, msg : "确认订单成功"};
      }catch(err){
        return {status : 0, msg : "确认订单失败"};
      }
    }else{
      return {status: 0, msg : "请登录"};
    }
  }

  //取消服务
  async cancel(){
    const { ctx } = this;
    if(ctx.session.customerId){
      const data = ctx.request.body;
      try{
        await ctx.model.Order.updateOne(data,{orderState : "3"});
        await ctx.model.Workorder.updateOne(data,{W_state : "3"});
        return {status : 1, msg : "取消订单成功"};
      }catch(err){
        return {status : 0, msg : "取消订单失败"};
      }
    }else{
      return {status: 0, msg : "请登录"};
    }
  }

  //开始服务
  async orderStart() {
    const { ctx } = this;
    
    const nowTime = new Date();
    const query =await ctx.model.Order.find({
      orderState : "1",
      orderStartState : "1",
      orderStartTime : {
        "$lte": nowTime
      }
    });

    for(const i in query){
      const orderID = query[i].orderID

      //将订单状态变为2（订单开始）
      try{
        await ctx.model.Order.updateOne(query[i],{orderState : "2"});
      }catch(err){
        console.log(err);
      }

      //将工单状态变为2（订单进行）
      try{
        await ctx.model.Workorder.updateOne({orderID}, {W_state : "2"})
      }catch(err){
        console.log(err);
      }
    }
    
  }

}
module.exports = OrderService;