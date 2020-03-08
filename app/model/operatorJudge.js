'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const operatorJudgeSchema = new Schema({
        operatortableID: {type: String, required: true}, // 运营商审核通过表ID
        operatorID: {type: String, required: true}, // 运营商ID
        auditResult: {type: String, required: false}, // 审核结果
        auditorID: {type: String, required: false}, // 审核人ID
        auditTime: {type: Date, required: false}, // 审核时间
        auditStatus: {type: String, required: false}, // 审核状态（1-通过 0-未通过）  
  })
    return mongoose.model('OperatorJudge', operatorJudgeSchema);
  };