'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require("moment");
    moment.locale('zh-cn');

    const orderSchema = new Schema({
        orderId : {type : String, required : true},   //订单ID
        orderState : {type : String, required : false},  //订单进度状态（0：已接单尚未变为工单；1 ：已接单且已变为便为工单；2：已接单且已分配专才；3：订单确认开始；4:订单取消；
                                                         //             5：订单完成；6：已结算）
        orderStartState : {type : String, required : false}, //订单开始状态（0：专才接单后默认服务开始；1：要客户确认后订服务才开始）
        cost : {type : Number, required : false},    //应付款
        orderTime : {type : Date, required : true }, //下单时间
        partitionId : { type: Schema.Types.ObjectId, ref: 'Partition', required: true },    //单品分区id
        remark : {type : String, required : false},  //备注
        // purchaseQuantity : {type : String, required : false},    //购买数量
        customerId : { type: Schema.Types.ObjectId, required : true }, //买家id
        timestamp: { type: Number, default: Date.now() }, // 时间戳，表明消息的订单产生的时间
        phone : {type : String, required : false},   //联系电话
        orderStartTime : {type : Date, required : false} //订单开始时间
    });
    return mongoose.model('Order', orderSchema);
}