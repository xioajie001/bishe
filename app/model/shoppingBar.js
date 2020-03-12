'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const shoppingBarSchema = new Schema({
        _Id :  Schema.Types.ObjectId,   //购物车商品ID
        itemId : {type : String, required : true},  //所收藏的服务id
        partitionId : {type : String, required : true}, //服务分区ID
        purchaseQuantity : {type : String, required : true},    //购买数量
        customerId : {type : String, required : true}, //买家id
        addTime : {type : Date, required : true} //添加时间
    });
    return mongoose.model("ShoppingBar",shoppingBarSchema);
}