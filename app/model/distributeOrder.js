'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const distributeOrderSchema = new Schema({
        orderID: {type: String, required: true}, // 订单ID
        itemID: {type: String, required: true}, // 单品ID
        operatorID: {type: String, required: false}, // 运营商ID
        distributeOrderTime: {type: Date, required: false}, // 派单时间
        distributeOrderState: {type: String, required: false}, // 派单状态（0-接单  1-未接单）
        responseTime: {type: Date, required: false}, // 响应时间
  })
    return mongoose.model('DistributeOrder', distributeOrderSchema);
  };