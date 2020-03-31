'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const commentSchema = new Schema({
        // id : {type : String, required : true},   //评论id
        itemId : {type : String, required : true},  //单品ID
        customerId : {type : String, required : true},  //评论客户的ID
        commentContent : {type : String, required : true}, //评价内容
        commentDate : {type : Date, required : true},    //评价时间
        servicerScore : {type : Number, required : true}, //专才得分
        itemScore : {type : Number, required : true}, //单品得分
    });
    return mongoose.model("Comment",commentSchema);
}