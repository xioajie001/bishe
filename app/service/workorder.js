'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class WorkorderService extends Service {

    //确认接收工单页面
    async comfirm(){
        const { ctx }  = this;
        const id =await ctx.state.user.data.id;
        let data = await ctx.model.Assign.aggregate([
            {
                $lookup : {
                    from : 'workorders',
                    localField : "workorderID",
                    foreignField : '_id',
                    as : 'workorders',
                }
            },{
                $match : {"state" : "1"}
            }
        ]);
        for(let i = 0; i < data.length; i++){
            const itemPartitionId = data[i].workorders[0].itemPartition;
            let itemPartition = await ctx.model.Item.findOne({_id : itemPartitionId});
            data[i].itemPartition = itemPartition;
        }
        return { status : 1, msg : data };
    }

    //订单确认
    async doComfirm(){
        const { ctx } = this;
        const data = await ctx.request.body;
        console.log(data);
        const id = await ctx.state.user.data.id;
        let updata = {};
        updata.servicerID = id;
        const newTime = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:s")
        console.log(newTime);
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
        if(orderData[0].order[0].orderStartState == 0){
            updata.startTime = newTime;
            updata.serverTime = newTime;
            updata.state = 1;
        }else{
            updata.startTime = newTime;
            updata.state = 4;
        }

        try{
            const result = await ctx.model.Workorder.updateOne(data,updata);
            const resultAssign = await ctx.model.Assign.updateOne(data, {state : 2})
            console.log(result);
            return { status : 1, msg : "确认订单成功" };
        }catch(err){
            console.log(err);
            return { status : 0, msg : err };
        }
        


    }



}
module.exports = WorkorderService;