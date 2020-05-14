/**
 * 单品分区对应的任务
 */
'use strict';
module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const taskSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    order: { type: Number, required: true }, // 顺序，表明此任务是排列在何位置，第二个还是第三个
    partitionId: { type: Schema.Types.ObjectId, ref: 'Partition', required: true },
    name: String, //  任务名称
    introduction: String, // 任务介绍
    conditions: String, // 任务执行条件
    maxCompletionTime: Number, // 任务最大执行时长（单位：小时）
    passageConditions: String, // 任务通过条件
    receivable: Number, // 到达该任务的分成
    reason: String,
    options: Schema.Types.Mixed, // 用于补充字段
  });
  return mongoose.model('Task', taskSchema);
};
