'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class ShoppingBarService extends Service {

  //获取购物车信息
  async getShoppingBar(){
    const{ ctx } = this;

    const customerId =await ctx.state.user.data.id;

    const data = await ctx.model.ShoppingBar.aggregate([
      {
        $lookup : {
          from : 'partitions',
          localField : "partitionId",
          foreignField : '_id',
          as : 'partition',
        }
      },
      {
        $match : { "customerId" : await ctx.service.tools.getObjectId(customerId) }
      }
    ]);
    
    //根据单品分区中的itemID获取item数据
    for(let i = 0; i < data.length; i++){
      const itemID = data[i].partition[0].itemID;
      let item = await ctx.model.Item.findOne({_id : itemID});
      data[i].item = item;
    }
    return data;
  }

  // 添加购物车
  async doAdd() {   
    const { ctx,} = this;
    const id =await ctx.state.user.data.id;
    let data = await ctx.request.body;

    //获取客户id
    data.customerId = id;
    let query;
    //查询数据库中是否已有该单品信息，返回单品的数量
    try{
      query =await ctx.model.ShoppingBar.findOne( data );
    }catch(err){
      console.log(err);
      return {status : 0,msg : err};
    }

    if(query){
      //如果已有该单品已存在在购物车中，则将购物车中该单品的数量+1
      try{
        const result =await ctx.model.ShoppingBar.update( data , {quantity : query.quantity+1});
        return {status : 1, msg : "添加购物车成功"};
      }catch(err){
        console.log(err);
        return {status : 0,msg : err};
      }
    }
    console.log(query);
    // 添加加入购物车时间
    const Time = sillyTime.format(new Date(), 'YYYY-MM-DD HH:mm');
    data.addTime = Time;

    //添加数据到数据库
    try{
      const result = await ctx.model.ShoppingBar.create(data);
      console.log(result);    
      return {status : 1, msg : "添加购物车成功"};
    }catch(err){
      console.log(err);
      return {status : 0,msg : err};
    }
  }

  //删除购物车
  // async doDel(){
    
  // }

}
module.exports = ShoppingBarService;