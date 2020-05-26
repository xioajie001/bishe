'use strict';

const Service = require('egg').Service;

class ItemService extends Service {
  // 获取所有商品信息
  async getItem() {
    const { ctx } = this;
    try{
      //单品表关联单品分区表
      const data =await ctx.model.Item.aggregate([
        {
          $lookup : {
            from : 'partitions',
            localField : "_id",
            foreignField : 'itemID',
            as : 'partitions',
          },
        },{
          $match : { itemState : "1"}
        }
    
      ]);
      
      for(let i =0; i < data.length; i++){
        let itemMinMaxPrice = {};
        let itemPrices = [];
        for(let j = 0; j < data[i].partitions.length; j++){
          itemPrices.push(data[i].partitions[j].price);
        };

        let minPrice = await ctx.service.tools.getMin(itemPrices);
        let maxPrice = await ctx.service.tools.getMax(itemPrices);
        itemMinMaxPrice.minPrice = minPrice;
        itemMinMaxPrice.maxPrice = maxPrice;
        data[i].itemMinMaxPrice = itemMinMaxPrice;
      }
      return {status : 1, msg : data};
    }catch(err){
      console.log(err);
      return {status : 0, msg : err};
    } 
  }

  // 按品类获取商品  前端通过url传值的方式 传来operatorID值
  async getItemSome() {
    const { ctx } = this;
    const query = await ctx.query;
    try{
      //单品表关联单品分区表
      const data =await ctx.model.Item.aggregate([
        {
          $lookup : {
            from : 'partitions',
            localField : "_id",
            foreignField : 'itemID',
            as : 'partitions',
          },
        },{
          $match : { itemState : "1",operatorID : await ctx.service.tools.getObjectId(query.operatorID)}
        }
    
      ]);
      
      for(let i =0; i < data.length; i++){
        let itemMinMaxPrice = {};
        let itemPrices = [];
        for(let j = 0; j < data[i].partitions.length; j++){
          itemPrices.push(data[i].partitions[j].price);
        };

        let minPrice = await ctx.service.tools.getMin(itemPrices);
        let maxPrice = await ctx.service.tools.getMax(itemPrices);
        itemMinMaxPrice.minPrice = minPrice;
        itemMinMaxPrice.maxPrice = maxPrice;
        data[i].itemMinMaxPrice = itemMinMaxPrice;
      }
      return {status : 1, msg : data};
    }catch(err){
      console.log(err);
      return {status : 0, msg : err};
    }
    
    
  }

  //获取商品详情
  async getItemDetail() {
    const{ ctx } = this;
    const query = await ctx.query;
    let commentData;
    if(query._id){
      try{
        const data = await ctx.model.Item.aggregate([{
          $lookup : {
            from : 'partitions',
            localField : "_id",
            foreignField : 'itemID',
            as : 'partitions',
          },
        },{
          $match : { "_id" : await ctx.service.tools.getObjectId(query._id) }
        }]);

        //取出单品分区价格中的最小值和最大值保存在itemMinMaxPrice中
        for(let i =0; i < data.length; i++){
          let itemMinMaxPrice = {};
          let itemPrices = [];
          for(let j = 0; j < data[i].partitions.length; j++){
            itemPrices.push(data[i].partitions[j].price);
          };
          
          let minPrice = await ctx.service.tools.getMin(itemPrices);
          let maxPrice = await ctx.service.tools.getMax(itemPrices);
          itemMinMaxPrice.minPrice = minPrice;
          itemMinMaxPrice.maxPrice = maxPrice;
          data[i].itemMinMaxPrice = itemMinMaxPrice;
        }

        commentData = await ctx.model.Comment.find({ itemId : query._id });
        for(let i =0; i < commentData.length; i++){
          let customer = await ctx.model.Customer.findOne({_id : commentData[i].customerId })
          const name = customer.customerName;
          commentData[i].name = name;

        }
        console.log(commentData);
        
        data[0].comment = commentData;
        
        return {status : 1, msg : data};
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