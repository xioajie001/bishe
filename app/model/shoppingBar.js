'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const shoppingBarSchema = new Schema({
        collectShopingID : {type : String, required : true, unique : true},   //购物车商品ID
        collectServeId : {type : String, required : true},  //所收藏的服务id
        partitionId : {type : String, required : true}, //服务分区ID
        purchaseQuantity : {type : String, required : true},    //购买数量
        buyerID : {type : String, required : true}, //买家id
        addTime : {type : Date, required : true} //买家id
    });
    return mongoose.model("ShoppingBar",shoppingBarSchema);
}