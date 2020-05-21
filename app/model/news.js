'use strict';
/**
 * 消息模板
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NewsSchema = new Schema({
    receiveId: Schema.Types.ObjectId, // 消息接受对象的id
    senderId: Schema.Types.ObjectId, // 发送方id
    read: { type: String, default: '0' }, // 是否已读，0表示未读，1表示已读
    reason: { type: String }, // 产生的理由,等组成消息内容等
    auditorName: String, // 发送消息者姓名
    // 消息拼接所需字段
    object: { type: String, required: true }, // 发送对象标识 o:运营商，p:平台，z:专才，y:用户
    action: String, // 动作标识 处理动作标识 t:提交审核，q:确认审核，p:派单，j:接单
    detailObject: String, // 具体处理对象标识 c:品类	t:任务  o:运营商	z:专才 I:单品	log:工作日志  p:分区	g:工单
    detailObjectId: Schema.Types.ObjectId, // 具体处理对象id
    timeOptions: Date, // 时间，备选
    result: { type: String }, // 处理结果 0 – 未处理 / 1 – 成功 / 2 – 不成功
    content: { type: String }, // 用于向专才发送消息的内容
    addTime: { type: Date, default: new Date() }, // 消息产生时间(新增)
    timestamp: { type: Number, default: Date.now() }, // 时间戳，表明消息的产生时间
    verifiedData: Schema.Types.Mixed, // 存放相关中间表字段

  });

  return mongoose.model('News', NewsSchema);
};
