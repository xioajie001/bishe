'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const itemjudgeSchema = new Schema({
        itemTableID: {type: String, required: true}, // 单品审核表id
        itemID: {type: String, required: true}, // 单品id
        auditResult: {type: String, required: false}, // 审核结果
        auditorID: {type: String, required: false}, // 审核人ID
        auditTime: {type: String, required: false}, // 审核时间
        auditStatus: {type: String, required: false}, // 审核状态（1-通过 0-未通过）  
  })
    return mongoose.model('Itemjudge', itemjudgeSchema);
  };