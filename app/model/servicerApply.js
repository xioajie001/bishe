'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const servicerApplySchema = new Schema({
      servicerId: {type: String, required: true}, //专才ID
      itemId: {type: String, required: true}, //单品ID
      itemName: {type: String, required: false}, //项目名称
      certificates: {type: Array, required: false}, // 技能证书 是照片
      skillDescribe: {type: String, required: true}, // 能力描述
      state: {type: String, required: true} // 申请状态(0 : 申请中，1 ：审核通过，2 ：审核不通过)
  })
    return mongoose.model('ServicerApply', servicerApplySchema);
  };