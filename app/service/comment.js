'use strict';


const sillyTime = require("silly-datetime");
const Service = require('egg').Service;

class CommentService extends Service {
  // 用户评论
  async doAdd() {

    const { ctx,} = this;
    const id = await ctx.state.user.data.id;
    const data = ctx.request.body;

    //添加客户id
    data.customerId = id

    //添加评论时间
    const time = sillyTime.format(new Date(), "YYYY-MM-DD, HH:mm:ss")
    data.commentDate = time;

    try{
        const result = await ctx.model.Comment.create(data);
        return {status : 1, msg : "评论成功"};
    }catch(err){
        console.log(err);
        return {status : 0, msg : "评论未成功，请在尝试一次"}
    }
    
  }
}
module.exports = CommentService;