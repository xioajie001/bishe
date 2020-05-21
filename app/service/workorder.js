'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");
const path = require('path');
const fs = require('fs');
const pump = require('pump');

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
        console.log(data)

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

    //订单确认  传来工单id
    async doComfirm(){

        const { ctx } = this;
        const data = await ctx.request.body;

        const id = await ctx.state.user.data.id;
        let updata = {};
        updata.servicer = id;
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
        console.log("orderData:",orderData);

        //判断订单的orderStartState（订单开始状态)为0则把工单状态变为开始，为1变为等待开始
        if(orderData[0].order[0].orderStartState == 0){
            updata.startTime = newTime;
            updata.serverTime = newTime;
            updata.state = 1;
        }else{
            updata.startTime = newTime;
            updata.serverTime = orderData[0].order[0].orderStartTime;
            updata.state = 4;
        }

        console.log("updata:",updata);
        //获取专才基础信息
        const servicer = await ctx.model.Servicer.findOne({ _id : id });

        //判断是否达到最大接单数
        if(servicer.workordering >= servicer.maxWorkOrder){
            return { status : 0, msg : "已达到最大接单数，不可接单" }
        }

        const assigndata = await ctx.model.Assign.findOne({workorderID : data._id});

        //添加消息数据
        console.log("servicer:",servicer);
        const news = { 
            reason : "接单成功", 
            object : "z", 
            action : "j", 
            detailObject : "g",
            result : "1",
        }
        news.receiveId = servicer.operatorId;
        news.auditorName = servicer.servicerName;
        news.senderId = id;
        news.detailObjectId = data._id;
        news.verifiedData = assigndata;
        console.log(news);

        //更新数据库并添加消息数据库
        try{
            const result = await ctx.model.Workorder.updateOne(data, updata);

            const resultAssign = await ctx.model.Assign.updateOne(
                { workorderID : data._id}, 
                {state : 2, endTime : newTime}
            );

            await ctx.model.Servicer.updateOne(
                {_id : id}, 
                { workordering : servicer.workordering + 1 }
            );

            await ctx.model.Cashflow.updateOne(
                {workOrderId : data._id}, 
                { servicerId : id, operatorId : servicer.operatorId }
            );

            await ctx.model.News.create(news);

            // console.log(resultAssign);
            return { status : 1, msg : "确认订单成功" };
        }catch(err){
            console.log(err);
            return { status : 0, msg : err };
        }
    }

    //拒单(前端传来派单表（Assign）的id：_id;
    async refuse(){
        const { ctx }  = this;
        const id =await ctx.state.user.data.id;
        const data = await ctx.request.body;
        // console.log(data);

        //定义一个upData存放要更新的log数据
        let upData = {};
        upData.servicerID = id;
        const newTime = sillyTime.format(new Date(), "YYYY-MM-DD HH:mm:s")
        upData.endTime = newTime;
        let query = await ctx.model.Assign.find(data);
        // console.log("query:",query);

        //添加消息数据
        const servicer = await ctx.model.Servicer.findOne({_id : id});
        console.log("servicer:",servicer);
        const news = { 
            reason : "被拒单", 
            object : "z", 
            action : "j", 
            detailObject : "g",
            result : "2",
        }
        news.receiveId = servicer.operatorId;
        news.auditorName = servicer.servicerName;
        news.senderId = servicer._id;
        news.detailObjectId = query[0].workorderID;
        news.verifiedData = { id : query[0]._id };
        news.verifiedData.startTime = query[0].startTime;
        news.verifiedData.log = query[0].log;
        news.verifiedData.state = query[0].state;
        news.verifiedData.workorderID = query[0].workorderID;
        news.verifiedData.servicerID = query[0].servicerID;

        //获取元数据中的log数据
        let log = query[0].log;
        log.push(upData);
        
        try{
            await ctx.model.Assign.updateOne(data, {log : log, state : 0});
            await ctx.model.Workorder.updateOne({ _id : query[0].workorderID }, { state : 2 });
            await ctx.model.News.create(news);
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

    //已完成工单
    async worked(){
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
                $match : { state : "3", servicer : await ctx.service.tools.getObjectId(id)}
            }
        ]);
        return { status : 1, msg : data }
    }

    //全部工单页面
    async allWork(){
        let data = {};
        const working = await this.working();
        const waitWork = await this.waitWork();
        const worked = await this.worked();
        data.working = working.msg;
        data.waitWork = waitWork.msg;
        data.worked = worked.msg;
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

    //任务详情页面 前端传来单品分区id和工单id
    async workDetail(){

        const { ctx } = this;
        const data = ctx.query;
        console.log(data);
        const id = ctx.state.user.data.id;

        let partitionTaskData = await ctx.model.Partition.aggregate([
            {
                $lookup : {
                    from : "tasks",
                    localField : "_id",
                    foreignField : "partitionId",
                    as : "tasks"
                }
            },{
                $match : { _id : await ctx.service.tools.getObjectId(data.partitionId) }
            }
        ]);
        //根据tasks数据中的order进行排序
        partitionTaskData[0].tasks.sort(await ctx.service.tools.compare("order"));

        //获取工单日志表的数据
        const logData = await ctx.model.Workorderlog.find({workorderId : data.workorderId});
        partitionTaskData[0].working = logData.length;
        partitionTaskData[0].workorderId = data.workorderId;

        return { status : 1, msg : partitionTaskData };
    }

    //任务图片提交 前端传来工单id和taskId
    async taskSubmit(){
        const { ctx } = this;
        const id = await ctx.state.user.data.id;
        let parts = ctx.multipart({ autoFields: true });
        let files = {};
        let stream;
        let certificates = [];
        console.log("parts.field:",parts.field);
        while ((stream = await parts()) !== null) {
            if (!stream || !stream.filename) {
            break;
            }
            // 表单的名字
            let { filename } = stream;
            console.log(filename);
            // 上传图片的目录
            const dir = await this.service.tools.getUploadFile(filename);
            const target = dir.uploadDir;
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
            certificates.push({serverFeedbackImg: dir.saveDir})
        }
        const worklogdata = await ctx.model.Workorderlog.find({ 
            taskId : parts.field.taskId, 
            workorderId : parts.field.workorderId 
        });
        console.log("worklogdata:",worklogdata);
        if(worklogdata[0]){

            //判断是否有图片，有图片就更新数据，没有就不更新
            if(certificates[0]){
                worklogdata[0].serverFeedbackImg.push(certificates[0]);
            }

             //判断是否有文字反馈，有文字反馈就更新数据，没有就不更新
            if(parts.field.serverFeedbackText){
                worklogdata[0].serverFeedbackText = parts.field.serverFeedbackText;
            }

            try{
                await ctx.model.Workorderlog.updateOne(
                    { 
                        taskId : parts.field.taskId, 
                        workorderId : parts.field.workorderId 
                    },worklogdata[0]);
                return { status : 1, msg : "任务提交成功" };
            }catch(err){
                console.log(err)
                return { status : 1, msg : err };
            }
        }else{
            files.serverFeedbackImg = certificates;
            files = Object.assign(files, parts.field);
            files.state = 2;
            try{
                await ctx.model.Workorderlog.create(files);
                return { status : 1, msg : "任务提交成功" };
            }catch(err){
                console.log(err)
                return { status : 1, msg : err };
            }
        }
        
    }

    //任务文字反馈提交  前端传来workorderId和taskId
    async taskWordSubmit(){
        const { ctx } = this;
        const id = ctx.state.user.data.id;
        const data = ctx.request.body;
        try{
            await ctx.model.Workorderlog.updateOne(
                {
                    taskId : data.taskId, 
                    workorderId : data.workorderId 
                },{
                    serverFeedbackText : data.serverFeedbackText
                }
            )
            return {status : 1, msg : "提交成功"};
        }catch(err){
            console.log(err);
            return {status : 0, msg : err}
        }
    }

}
module.exports = WorkorderService;