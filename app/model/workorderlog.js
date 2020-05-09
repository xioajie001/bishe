'use strict';

/**
 * 工单日志表 字段设计说明：
 * 日志表的每次记录对应着单品分区的具体任务
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const workOrderlogSchema = new Schema({
    workorderId: { type: Schema.Types.ObjectId, ref: 'Workorder' }, // 所属工单
    name: { type: String, required: true }, // 任务名称
    content: { type: String, required: true }, // 任务内容
    start: { type: Date }, // 开始时间
    end: { type: Date }, // 结束时间
    Servicerfeedback: { type: String }, // 专才反馈内容
    Customerfeedback: { type: String }, // 顾客点评内容
    deadline: { type: Date }, // 任务最迟完成时间点
    state: { type: String, required: true }, // 任务的状态（0 – 任务未开始 / 1 – 任务进行中 / 2 – 任务完成 / 3 – 任务中止）

  });

  return mongoose.model('Workorderlog', workOrderlogSchema);
};
