'use strict';

const Service = require('egg').Service;
class ItemService extends Service {
  // 获取所有商品信息
  async getItem() {
    const { ctx } = this;

    //单品表关联单品分区表
    const data =await ctx.model.Item.aggregate([{
      $lookup : {
        from : 'partitions',
        localField : "_id",
        foreignField : 'itemID',
        as : 'partitions',
      },
    }]);
    return data;
  }

  //获取商品详情
  async getItemDetail() {
    const mongoose = require('mongoose')
    var ObjectId = mongoose.Types.ObjectId;
    const{ ctx } = this;
    const data = await ctx.query;
    console.log(data._id)
    if(data._id){
      try{
        const itemDetail = await ctx.model.Item.aggregate([{
          $lookup : {
            from : 'partitions',
            localField : "_id",
            foreignField : 'itemID',
            as : 'partitions',
          },
        },{
          $match : { "_id" : new ObjectId(data._id) }
        }]);
        const itemDetailData = await ctx.model.Item.find({_id : data._id});
        return itemDetail;
      }catch(err){
        console.log(err);
        return err;
      }
      
    }else{
      // console.log(err)
      return {state : 0, msg : "出现错误，未能获取商品详情信息"}
    }
  }
}
module.exports = ItemService;