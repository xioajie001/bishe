'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const operatorRPSchema = new Schema({
        contractID: {type: String, required: true}, // ID
        contractName: {type: String, required: true}, // 名称
        operatorID: {type: String, required: false}, // 运营商ID
        content: {type: String, required: false}, // 运营商奖惩内容
        bonus : {type: Date, required: false}, // 奖励金额
        penalty: {type: String, required: false}, // 惩罚金额
        time: {type: Date, required: false}, // 时间
  })
    return mongoose.model('OperatorRP', operatorRPSchema);
  };