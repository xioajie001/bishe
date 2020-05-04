'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const shoppingBarSchema = new Schema({
        _Id :  Schema.Types.ObjectId,   //购物车商品ID
        partitionId : {type : Schema.Types.ObjectId, ref: 'Partition', required : true}, //服务分区ID
        customerId : { type : Schema.Types.ObjectId, ref: 'Customer', required : true }, //买家id
        quantity : {type : Number, required : true, default : 1}, //数量
        addTime : {type : Date, required : true} //添加时间
    });
    return mongoose.model("ShoppingBar",shoppingBarSchema);
}