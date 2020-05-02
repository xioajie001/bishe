'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const itemSchema = new Schema({
    _id: Schema.Types.ObjectId,    //ID
    itemName: { type: String, required: true },   //名称
    itemPrice: { type: String },  //价格
    itemImages: { type: Array },   //单品图片
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, //所属品类ID
    itemIntroduction: { type: String, required: true },  //单品简介
    itemState: { type: String, required: true },  //单品上架状态（ 0 - 下架 / 1 - 上架 ）
    itemExamineTF: { type: String, required: true },  //是否通过审核（0 – 未通过上架/  1 – 通过上架/  2 – 未通过修改/  3 – 通过修改/  4 – 未通过下架/  5 – 下架）
    itemReason: { type: String }, //修改/弃用理由
    itemAddTime: { type: Date, default: Date.now() },  //单品添加时间
    itemReviseTime: { type: Date },  //单品修改时间
    itemDeleteTime: { type: Date }    //单品弃用时间
  });

  return mongoose.model('Item', itemSchema);
};
