'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const categoryJudgeSchema = new Schema({
        categoryTableID: {type: String, required: true}, // 品类审核表ID
        categoryID: {type: String, required: true}, // 品类id
        auditResult: {type: String, required: false}, // 审核结果
        auditorID: {type: String, required: false}, // 审核人ID
        auditTime: {type: String, required: false}, // 审核时间
        auditStatus: {type: String, required: false}, // 审核状态（1-通过 0-未通过）  
  })
    return mongoose.model('CategoryJudge', categoryJudgeSchema);
  };