'use strict';

/**
 * 工单表 字段设计说明：
 * 不足：
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const workOrderSchema = new Schema({
    name: { type: String }, // 工单名称
    servicer: { type: Schema.Types.ObjectId, ref: 'Servicer' }, // 接单的专才
    itemPartition: { type: Schema.Types.ObjectId, required: true }, // 分区id
    orderID: { type: Schema.Types.ObjectId, ref: 'Order' }, // 对应的订单
    operatorID: { type: Schema.Types.ObjectId, ref: 'Operator' }, // 运营商id
    state: { type: String, required: true }, // 工单状态工单状态（0 – 结束 / 1 – 进行中 / 2 – 待分配 / 3 – 用户终止 / 4 – 等待启动）
    startTime: { type: Date }, // 工单产生时间
    endTime: { type: Date }, // 工单结束时间或者中止时间
    serverTime: { type: Date }, // 服务启动时间
    requirement: { type: String }, // 下单时，客户特别的要求
    customerPhone: String, // 客户电话
  });

  return mongoose.model('Workorder', workOrderSchema);
};

