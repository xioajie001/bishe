'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class WorkorderService extends Service {

    //确认接收工单页面
    async comfirm(){
        const { ctx }  = this;
        const id =await ctx.state.user.data.id;

        //在派单表中联立工单表，根据状态码和专才id查询
        let data = await ctx.model.Assign.aggregate([
            {
                $lookup : {
                    from : 'workorders',
                    localField : "workorderID",
                    foreignField : '_id',
                    as : 'workorders',
                }
            },{
                $match : {"state" : "1", servicerID : await ctx.service.tools.getObjectId(id)}
            }
        ]);

        //循环已经查询出来的信息，根据其中的单品分区id
        for(let i = 0; i < data.length; i++){
            const itemPartitionId = data[i].workorders[0].itemPartition;
            let itemPartition = await ctx.model.Partition.findOne({_id : itemPartitionId});
            data[i].itemPartition = itemPartition;
        }

        //判断是否有新增工单，有返回工单，没有返回“没有新增工单”的提示
        if(data.length > 0){
            return { status : 1, msg : data };
        }else{
            return { status : 1, msg : "没有新增工单" }
        }
       
    }

    //订单确认
    async doComfirm(){

        const { ctx } = this;
        const data = await ctx.request.body;
        const id = await ctx.state.user.data.id;
        let updata = {};
        updata.servicerID = id;
        const newTime = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:s")

        //根据工单id，联立查询工单和订单数据
        let orderData = await ctx.model.Workorder.aggregate([
            {
                $lookup : {
                    from : "orders",
                    localField : "orderID",
                    foreignField : "_id",
                    as : "order"
                }
            },{
                $match : { _id : await ctx.service.tools.getObjectId(data._id)}
            }
        ]);

        //判断订单的orderStartState（订单开始状态)为0则把工单状态变为开始，为1变为等待开始
        if(orderData[0].order[0].orderStartState == 0){
            updata.startTime = newTime;
            updata.serverTime = newTime;
            updata.state = 1;
        }else{
            updata.startTime = newTime;
            updata.state = 4;
        }

        //更新数据库
        try{
            const result = await ctx.model.Workorder.updateOne(data, updata);
            const resultAssign = await ctx.model.Assign.updateOne({ workorderID : data._id}, {state : 2, endTime : newTime})
            return { status : 1, msg : "确认订单成功" };
        }catch(err){
            console.log(err);
            return { status : 0, msg : err };
        }
    }

    //拒单(前端传来派单表（Assign）的id)
    async refuse(){
        const { ctx }  = this;
        const id =await ctx.state.user.data.id;
        const data = await ctx.request.body;
        console.log(data);

        //定义一个upData存放要更新的log数据
        let upData = {};
        upData.servicerID = id;
        const newTime = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:s")
        upData.endTime = newTime;
        let query = await ctx.model.Assign.find(data);

        //获取元数据中的log数据
        let log = query[0].log;
        log.push(upData);
        
        try{
            await ctx.model.Assign.updateOne(data, {log : log, state : 0});
            return { status : 1, msg : "拒单成功" }
        }catch(err){
            console.log(err);
            return { status : 0, msg : err};
        }
    }

    //正在进行的任务页面
    async working(){
        const { ctx } = this;
        const id = await ctx.state.user.data.id;
        let data = await ctx.model.Workorder.aggregate([
            {
                $lookup : {
                    from : "partitions",
                    localField : "itemPartition",
                    foreignField : "_id",
                    as : "itemPartition"
                }
            },{
                $match : { state : "1", servicer : await ctx.service.tools.getObjectId(id)}
            }
        ]);
        return { status : 1, msg : data }
    }

    //等待开始的任务页面
    async waitWork(){
        const { ctx } = this;
        const id = await ctx.state.user.data.id;
        let data = await ctx.model.Workorder.aggregate([
            {
                $lookup : {
                    from : "partitions",
                    localField : "itemPartition",
                    foreignField : "_id",
                    as : "itemPartition"
                }
            },{
                $match : { state : "4", servicer : await ctx.service.tools.getObjectId(id)}
            }
        ]);
        return { status : 1, msg : data }
    }

    //任务页面
    async work(){
        let data = {};
        const working = await this.working();
        const waitWork = await this.waitWork();
        data.working = working.msg;
        data.waitWork = waitWork.msg;
        return { status : 1, msg : data }
    }

    //正在进行的任务详情页面


}
module.exports = WorkorderService;