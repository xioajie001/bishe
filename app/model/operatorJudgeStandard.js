'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const operatorJudgeStandardSchema = new Schema({
        operatorstandardID: {type: String, required: true}, // 运营商审核标准表ID
        minOperatorName: {type: String, required: true}, // 名称最小字数
        maxOperatorName: {type: String, required: false}, // 名称最大字数
        maxOperatorIntroduction: {type: String, required: false}, // 简介最大字数
        minOperatorIntroduction: {type: String, required: false}, // 简介最小字数
        maxOperatorContent: {type: String, required: false}, // 详情最大字数
        minOperatorContent: {type: String, required: true}, // 详情最小字数
        maxemitting: {type: String, required: true}, // 最大单品数
        minemitting: {type: String, required: false}, // 最小单品数
        maxCategory : {type: String, required: false}, // 最大品类数
        minCategory : {type: String, required: false}, // 最小品类数
        maxOperatorOrder: {type: String, required: false}, // 同时最大接单数
        minOperatorODer: {type: String, required: true}, // 同时最小接单数
  })
    return mongoose.model('OperatorJudgeStandard', operatorJudgeStandardSchema);
  };