/**
 * 单品分区表
 */
'use strict';

module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const partitionSchema = new Schema({
    // _id: Schema.Types.ObjectId,   //ID
    itemID: { type: Schema.Types.ObjectId, ref: 'Item', required: true },  //单品ID
    name: { type: String, required: true },   //单品分区名称
    introduction: { type: String, required: true },  //单品分区简介
    price: { type: Number, required: true },    //价格
    applicable: { type: String, required: true },  //单品应用场景
    style: { type: String, required: true },    //风格
    detail: { type: String, required: true }, // 服务详情
    type: { type: String, required: true }, // 类型
  });

  return mongoose.model('Partition', partitionSchema);
};
