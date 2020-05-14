'use strict';
/**
 * 通知运营商审核结果
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NewsSchema = new Schema({
    object: { type: String, required: true }, // 对象标识 c:品类，o:运营商，p:平台，I:单品，i: 中断要求，p:分区，t:任务，z:专才，y:用户，d:订单，g:工单，
    action: String, // 动作标识 t:提交审核，q:确认审核，p:派单，j:接单
    read: { type: String, default: '0' }, // 是否已读，0表示未读，1表示已读
    reason: { type: String }, // 审核 产生的理由
    auditorID: { type: String }, // 审核员ID
    auditorName: String, // 返回信息的人
    auditTime: Date, //返回的时间
    result: { type: String }, // 审核结果
    timestamp: { type: Number, default: Date.now() }, // 时间戳，
    addtime: { type: Date, default: new Date() },
    verifiedData: Schema.Types.Mixed, // 存放审核的数据  { id : 工单id, object ： g }
  });

  return mongoose.model('News', NewsSchema);
};
