'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const categoryJudgeStandardSchema = new Schema({
        categorystandardID: {type: String, required: true}, // 品类标准表id
        minCategoryName: {type: String, required: true}, // 名称最小字数
        maxCategoryName: {type: String, required: false}, // 名称最大字数
        maxCategoryIntroduction: {type: String, required: false}, // 简介最大字数
        minCategoryIntroduction: {type: String, required: false}, // 简介最小字数
        maxCategoryContent: {type: String, required: false}, // 详情最大字数
        
        minCategoryContent: {type: String, required: true}, // 详情最小字数
        maxemitting: {type: String, required: true}, // 最大单品数
        minemitting: {type: String, required: false}, // 最小单品数
        label: {type: String, required: false}, // 服务类别标签
        maxPrice: {type: String, required: false}, // 品类最高价格
        minPrice: {type: String, required: false}, // 品类最低价格
        minServiceTime: {type: String, required: true}, // 服务最短天数
        maxServiceTime: {type: String, required: true}, // 服务最长天数
        minResponseTime: {type: String, required: false}, // 接单响应最短时长
        maxResponseTime: {type: String, required: false}, // 接单响应最长时长
        maxOrder: {type: Number, required: false}, // 最大接单数
        minODer: {type: Number, required: false}, // 最小接单数
  
  })
    return mongoose.model('CategoryJudgeStandard', categoryJudgeStandardSchema);
  };