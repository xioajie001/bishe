'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const shoppinglistSchema = new Schema({
        checklistID: {type: String, required: true}, // 清单表id
        customerID: {type: String, required: true}, // 用户id
        orderID: {type: String, required: false}, // 订单id
        orderstate: {type: String, required: false}, // 订单状态
        taskProgress: {type: String, required: false}, // 任务进度
        due: {type: String, required: false}, // 应付款  
  })
    return mongoose.model('Shoppinglist', shoppinglistSchema,);
  };