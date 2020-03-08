'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require("moment");
    moment.locale('zh-cn');

    const orderSchema = new Schema({
        orderID : {type : String, required : true, unique : true},   //订单ID
        orderState : {type : String, required : false},  //订单进度状态（0：已接单尚未分配专才；1：已接单且已分配专才；2：订单确认开始；3:订单取消）
        orderStartState : {type : String, required : false}, //订单开始状态（0：专才接单后默认服务开始；1：要客户确认后订服务才开始）
        cost : {type : String, required : false},    //应付款
        orderTime : {type : Date, required : true }, //下单时间
        orderServeId : {type : String, required : false},    //所购买的服务id
        partitionId : {type : String, required : false}, //服务分区ID
        remark : {type : String, required : false},  //备注
        purchaseQuantity : {type : String, required : false},    //购买数量
        buyerID : {type : String, required : false}, //买家id
        phone : {type : String, required : false},   //联系电话
        orderStartTime : {type : Date, required : false} //订单开始时间
    });
    return mongoose.model('Order', orderSchema);
}