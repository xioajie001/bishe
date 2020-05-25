'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class OrderService extends Service {

  //查看订单
  async getOrder(){
    const{ ctx } = this;
    const id =await ctx.state.user.data.id;

    const data = await ctx.model.Order.find({customerId : id});
    return {status : 1, msg : data};

  }

  //查看未开始订单
  async getOrderWait(){
    const { ctx } = this;
    const id = await ctx.state.user.data.id;
    // const data = await ctx.model.Order.find({ customerId : id, orderState : {$in : [0,1,2]} });

    const data = await ctx.model.Order.aggregate([
      {
        $lookup : {
          from : 'partitions',
          localField : "partitionId",
          foreignField : '_id',
          as : 'partition',
        }
      },
      {
        $match : { 
          customerId : await ctx.service.tools.getObjectId(id),
          orderState : {$in : ["0","1","2"]}
        }
      }
    ]);
    
    // 根据单品分区中的itemID获取item数据
    for(let i = 0; i < data.length; i++){
      const itemID = data[i].partition[0].itemID;
      let item = await ctx.model.Item.findOne({_id : itemID});
      data[i].item = item;
    }
    return {status : 1, msg : data};
  }

  //查看正在进行的订单
  async getOrdering(){
    const { ctx } = this;
    const id = await ctx.state.user.data.id;

    const data = await ctx.model.Order.aggregate([
      {
        $lookup : {
          from : 'partitions',
          localField : "partitionId",
          foreignField : '_id',
          as : 'partition',
        }
      },
      {
        $match : { 
          customerId : await ctx.service.tools.getObjectId(id),
          orderState : "3"
        }
      }
    ])
    
    // 根据单品分区中的itemID获取item数据
    for(let i = 0; i < data.length; i++){
      const itemID = data[i].partition[0].itemID;
      let item = await ctx.model.Item.findOne({_id : itemID});
      data[i].item = item;
    }
    return {status : 1, msg : data};
  }

  //查看正在进行的订单详情  前端传来订单id：_id 方式 URL传值
  async getOrderingDetail(){
    const { ctx } = this;
    const id = await ctx.state.user.data.id;
    const query = ctx.query;   

    let data = await ctx.model.Order.aggregate([
      {
        $lookup : {
          from : 'partitions',
          localField : "partitionId",
          foreignField : '_id',
          as : 'partition',
        }
      },
      {
        $match : { 
          _id : await ctx.service.tools.getObjectId(query._id)
        }
      }
    ])
    
    // 根据单品分区中的itemID获取item数据
    for(let i = 0; i < data.length; i++){
      const itemID = data[i].partition[0].itemID;
      let item = await ctx.model.Item.findOne({_id : itemID});
      data[i].item = item;
    }

    //根据单品分区id获取taskid
    const taskdata = await ctx.model.Task.find({partitionId : data[0].partitionId});
    data[0].tasks = taskdata;

    //获取订单数据
    const workoredrData = await ctx.model.Workorder.findOne({orderID : query._id})
    // console.log("workoredrData:",workoredrData);

    //当前正在进行的任务
    const workorderlogData = await ctx.model.Workorderlog.find( {workorderId : workoredrData._id, state: 2} );
    const working = await workorderlogData.length;
    data[0].working = working;
    data[0].workoredrId = workoredrData._id;
    return {status : 1, msg : data[0]};
  }

  /*
  *获取任务提交页面
  *前端提交工单id：workorderId和 任务id taskId
  */
  async getLog(){

    const { ctx } = this;
    const id = ctx.state.user.data.id;
    const query = ctx.query;
    const result = await ctx.model.Workorderlog.findOne(query);
    return {status : 1, msg : result};

  }

  //提交客户反馈
  async updatalog(){
    const { ctx } = this;
    const id = await ctx.state.user.data.id;
    const data = await ctx.request.body;

    //获取要更新的数据
    const updata = {};
    updata.customerfeedback = data.customerfeedback;
    updata.state = "2";

    try{
      const result = await ctx.model.Workorderlog.updateOne(
        {
          workorderId : data.workorderId,
          taskId : data.taskId
        }, updata
      )
      console.log("result:",result);
      if(result.nModified == 1){
        return {status : 1, msg : "数据反馈成功"}
      }
      return {status : 0, msg : "数据已提交或未更新成功"}
    }catch(err){
      console.log(err);
      return {status : 0, msg : err}
    }
    
    
  }

  // 添加订单
  async doAdd() {   
    const { ctx,} = this;
    const id =await ctx.state.user.data.id;
    const data = await ctx.request.body;


    let cashflowdata = {};
    cashflowdata.userPayable = data.cost;

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
      cashflowdata.orderId = result._id;
      cashflowdata.addTime = new Date();
      await ctx.model.Cashflow.create(cashflowdata);
      return {status : 1, msg : result};
    }catch(err){
      console.log(err);
      return err;
    }
  }

  //验收服务  值：订单id
  async confirm(){

    const { ctx } = this;
    const id =await ctx.state.user.data.id;
    const data = ctx.request.body;

    try{
      const orserResult = await ctx.model.Order.updateOne(data, {orderState : "5"});
      const workorserResult = await ctx.model.Workorder.updateOne({ orderID : data._id },{state : "0"});
      console.log(orserResult);
      console.log(workorserResult);
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
      const orserResult = await ctx.model.Order.updateOne(data, {orderState : "4"});
      const workorserResult = await ctx.model.Workorder.updateOne({ orderID : data._id }, {state : "3"});
      console.log(orserResult);
      console.log(workorserResult);
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
      orderState : "2",
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

  //监控服务
  // async 

}
module.exports = OrderService;