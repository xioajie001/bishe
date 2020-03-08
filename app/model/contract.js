'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const contractSchema = new Schema({
        contractID: {type: String, required: true}, // ID
        contractName: {type: String, required: true}, // 名称
        grade: {type: String, required: false}, // 合约等级
        state: {type: String, required: false}, // 状态（0 – 结束 / 1 – 进行中）
        operatorID: {type: String, required: false}, // 运营商ID
        shar : {type: String, required: false}, // 运营商分成（订单总额百分比）
        maxOrderTimeout: {type: String, required: true}, // 约定每月最高接单超时数
        minOrder: {type: String, required: true}, // 约定每月最低接单数
        minCompletionRate: {type: String, required: false}, // 约定每月最低完成率
        minProfit: {type: String, required: false}, // 约定每月最低盈利
        maxCooperationTime: {type: String, required: false}, // 最长合作时间
        minCooperationTime: {type: String, required: false}, // 最短合作时间
        cashDeposit: {type: String, required: true}, // 保证金额
        liquidatedDamages: {type: String, required: true} // 违约赔偿金额
  })
    return mongoose.model('Contract', contractSchema);
  };