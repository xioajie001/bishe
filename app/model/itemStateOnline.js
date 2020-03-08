'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const itemStateOnlineSchema = new Schema({
        itemStatusID: {type: String, required: true}, // 单品状态表id
        itemID: {type: String, required: true}, // 单品id
        itemInitialPrice: {type: String, required: false}, // 单品原始价格
        itemModifiedPrice: {type: String, required: false}, // 单品修改后价格
        itemstate: {type: String, required: false}, // 单品上架状态（ 0 - 下架 / 1 - 上架 ）
        auditorID: {type: String, required: false}, //审核人ID 
        time: {type: Date, required: false} // 时间   
  })
    return mongoose.model('itemStateOnline', itemStateOnlineSchema);
  };