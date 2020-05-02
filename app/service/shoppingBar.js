'use strict';

const Service = require('egg').Service;
const sillyTime = require("silly-datetime");

class ShoppingBarService extends Service {

  //获取购物车信息
  async getShoppingBar(){
    const{ ctx } = this;
    const customerId =await ctx.state.user.data.id;
    console.log(customerId);
    const data = await ctx.model.ShoppingBar.find({customerId : customerId});
    for(let i = 0; i < data.length; i++){
      let itemData = await ctx.model.Item.findOne({_id : data[i].itemId});
      for(let j = 0; j < itemData.partition.length; j++){
        if(itemData.partition[j].id === data[i].partitionId){
          console.log(itemData.partition[j]);
        }
      }
     
    }
    
    return 1;
  }

  // 添加购物车
  async doAdd() {   
    const { ctx,} = this;
    const id =await ctx.state.user.data.id;
    const data = await ctx.request.body;

    //获取客户id
    data.customerId = id;

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

}
module.exports = ShoppingBarService;