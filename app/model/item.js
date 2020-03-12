'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const itemSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemName: { type: String, required: true },
    itemCategoryID: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    itemIntroduction: { type: String, required: true },
    itemState: { type: String, required: true },
    itemExamineTF: { type: String, required: true },
    itemReason: { type: String },
    itemAddTime: { type: Date, default: Date.now() },
    itemReviseTime: { type: Date },
    itemDeleteTime: { type: Date },

    /** 单品分区 */
    partition: Array,
    // partition: {
    //   _id: Schema.Types.ObjectId,
    //   name: { type: String, required: true },
    //   introduction: { type: String, required: true },
    //   price: { type: Number, required: true },
    //   applicable: { type: String, required: true },
    //   style: { type: String, required: true },
    //   industry: { type: String, required: true },
    //   type: { type: String, required: true },
    //   task: {
    //     _id: Schema.Types.ObjectId,
    //     name: { type: String, required: true },
    //     introduction: { type: String, required: true },
    //     conditions: { type: String, required: true },
    //     maxCompletionTime: { type: String, required: true },
    //     passageConditions: { type: String, required: true },
    //     receivable: { type: String, required: true },
    //     before: { type: String },
    //     after: { type: String },
    //   },

    // },

  });

  return mongoose.model('Item', itemSchema);
};
