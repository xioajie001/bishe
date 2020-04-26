'use strict';

const Service = require('egg').Service;
class ItemService extends Service {
  // 获取所有商品信息
  async getItem() {
    const { ctx } = this;
    const data =await ctx.model.Item.find();
    return data;
  }

  //获取商品详情
  async getItemDetail() {
      const{ ctx } = this;
      const data = await ctx.query;
      if(data._id){
        const itemDetail = await ctx.model.Item.findOne(data);
        return itemDetail;
      }else{
        return {state : 0, msg : "出现错误，未能获取商品详情信息"}
      }
  }
}
module.exports = ItemService;