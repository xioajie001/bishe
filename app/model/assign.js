'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const assginSchema = new Schema({
    workorderID: { type: Schema.Types.ObjectId, ref: 'Workorder' }, // 派发的工单
    state: { type: String, required: true }, // 状态（0 – 拒单 / 1 – 待分配 / 2 - 已确认）
    servicerID: { type: Schema.Types.ObjectId, ref: 'Servicer', required: true }, // 分配的专才id
    startTime: { type: Date, default: new Date() }, // 一次派单的开始时间
    endTime: Date, // 派单结束时间，也是专才确认接单时间
    log: Array, // 派单日志，记录工单曾被派给过哪些专才，为了避免第二次派单重复
  });
  return mongoose.model('Assgin', assginSchema);
};
