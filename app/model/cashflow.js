/**
 * 现金流动表，记录了每笔订单各角色的分成
 * 工单依赖大小写注意一下
 * 如果有默认时间，返回的是时间戳而不是具体的时间，需要转换；
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const cashflowSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true }, // 订单id
    workOrderId: { type: Schema.Types.ObjectId, ref: 'Workorder' }, // 工单id
    userPayable: { type: Number, required: true }, // 用户应付款
    refund: { type: Number, required: true, default: 0 }, // 退款
    servicerId: { type: Schema.Types.ObjectId, ref: 'Servicer' }, // 接单的专才id
    serverReceivable: { type: Number, required: true, default: 0 }, // 专才所得
    operatorId: { type: Schema.Types.ObjectId, ref: 'Operator' }, // 运营商id
    operatorReceivable: { type: Number, required: true, default: 0 }, // 运营商所得
    systemReceivable: { type: Number, required: true, default: 0  }, // 平台所得
    addTime: { type: Date, default: new Date() }, // 产生时间
    timestamp: { type: Number, default: Date.now() }, // 产生时的时间戳
    state: { type: String, default: '2' }, // 结算状态，0 - 中止/ 1- 顺利完成/ 2 - 正在进行
  });

  return mongoose.model('Cashflow', cashflowSchema);
};
