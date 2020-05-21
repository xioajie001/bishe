'use strict';
/**
 * 专才合约
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const contractSchema = new Schema({
    contractName: { type: String, required: true }, // 名称
    content: { type: String }, // 合约可扩充的文字内容
    grade: { type: String, required: false }, // 合约等级 A，B,C,等等
    state: { type: String, required: true, default: '1' }, // 状态（0 – 结束 / 1 – 进行中）
    operatorID: { type: Schema.Types.ObjectId, required: true }, // 运营商ID
    servicerID: { type: Schema.Types.ObjectId, required: true }, // 专才id
    shar: { type: Number, required: false }, // 专才分成（订单总额百分比）
    minOrder: { type: Number, required: true }, // 约定每月最低接单数
    minScore: { type: Number, required: true }, // 客户评分下限
    minCooperationTime: { type: String, required: false }, // 最短合作时间
    cashDeposit: { type: Number, required: true }, // 保证金额
    liquidatedDamages: { type: Number, required: true }, // 违约赔偿金额
    addTime: { type: Date, default: new Date() }, // 合约生成时间
    Timestamp: { type: Number, default: Date.now() },
  });
  return mongoose.model('Contract', contractSchema);
};
