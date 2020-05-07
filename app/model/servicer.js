'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const servicerSchema = new Schema({
      // _id : Schema.Types.ObjectId, // 专才id
      servicerZhanghao: {type: String, required: true}, // 专才账号
      password: {type: String, required: true}, // 专才密码
      // servicerId: {type: String, required: true}, //专才ID
      servicerName: {type: String, required: false}, //专才姓名
      servicerEmail: {type: String, required: false}, // 专才邮箱
      servicerProfilePhoto: {type: String, required: false}, // 专才头像
      servicerAdress: {type: String, required: false}, // 专才地址
      servicerRegistrationDate: {type: Date, required: false}, // 专才注册时间
      servicerIDNo: {type: String, required: false}, // 专才身份证号码
      servicerPhone: {type: String, required: false}, // 专才手机电话
      servicerStatus: {type: String, required: false}, // 接单状态
      maxWorkOrder: {type: String, required : false, trim : true}, // 最大接单数
      workeordering: {type: Number, required: false,default:0}, // 在接项目数量
      servicerItem: {type: Array, required : false}, // 可接项目
  })
    return mongoose.model('Servicer', servicerSchema);
  };