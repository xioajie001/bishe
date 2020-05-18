'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class OrderService extends Service {

  //查看订单
  async getOrder(){
    const{ ctx } = this;
    const id =await ctx.state.user.data.id;
    if(id){
      const customerId = id;
      const data = await ctx.model.Order.find({customerId : id});
      return {status : 1, msg : data};
    }else{
      return {status : 0, msg : "请登录"}
    }
  }

  // 添加订单
  async doAdd() {   
    const { ctx,} = this;

    const id =await ctx.state.user.data.id;

    if(id){
      const data = await ctx.request.body;

      //  添加订单id
      const day1 = sillyTime.format(new Date(), 'YYYYMMDD');
      const day2 = sillyTime.format(new Date(), 'YYYY-MM-DD');
      const id_number = await ctx.model.Order.count({
        orderTime:{
          "$gte": day2
        }
      });
      console.log("id_number:",id_number);
      const orderId = day1 + ("0000" + (id_number+1)).slice(-4);
      data.orderId = orderId;

      //添加下单人
      const customerId = id;
      data.customerId = customerId;

      // 添加下单时间
      const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
      const orderTime = new Date(Time);
      data.orderTime = orderTime;

      // 添加订单状态
      data.orderState = "0";

      try{
        const result = await ctx.model.Order.create(data);    
        return {status : 1, msg : result};
      }catch(err){
        console.log(err);
        return err;
      }
    }else{
      return {status : 0, msg : "请登录"};
    }   
  }

  //验收服务
  async confirm(){

    const { ctx } = this;
    const id =await ctx.state.user.data.id;
    const data = ctx.request.body;

    try{
      await ctx.model.Order.updateOne(data,{orderState : "5"});
      await ctx.model.Workorder.updateOne(data,{state : "0"});
      return {status : 1, msg : "确认订单成功"};
    }catch(err){
      return {status : 0, msg : "确认订单失败"};
    }
  }

  //取消服务
  async cancel(){
    const { ctx } = this;
    const id =await ctx.state.user.data.id;
    const data = ctx.request.body;

    try{
      await ctx.model.Order.updateOne(data,{orderState : "4"});
      await ctx.model.Workorder.updateOne(data,{state : "3"});
      return {status : 1, msg : "取消订单成功"};
    }catch(err){
      console.log(err);
      return {status : 0, msg : "取消订单失败"};
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
      const orderId = query[i].orderId
      try{
         //将订单状态变为3（订单开始）
        await ctx.model.Order.updateOne(query[i],{orderState : "3", orderStartState : "0"});
        //将工单状态变为1（订单进行）
        await ctx.model.Workorder.updateOne({orderId}, {state : "1"});
      }catch(err){
        console.log(err);
      }
    }
    
  }

}
module.exports = OrderService;