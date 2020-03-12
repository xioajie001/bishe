'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const customerSchema = new Schema({
        customerZhanghao: {type: String, required: true}, // 客户账号
        password: {type: String, required: true}, // 客户密码
        customerName: {type: String, required: false}, // 客户名
        customerId: {type: String, required: true}, // 客户ID
        customerPhone: {type: String, required: false}, // 客户电话
        customerEmail: {type: String, required: false}, // 客户邮箱
        customerAdress: {type: String, required: false}, // 客户地址
        customerRegistrationDate: {type: Date, required: false}, // 客户注册时间
        customerIDNo: {type: String, required: false}, // 客户身份证号
        customerProfilePhoto: {type: String, required: false} // 客户头像
      // name:String
      
  })
    return mongoose.model('Customer', customerSchema);
  };