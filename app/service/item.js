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
      const data = await ctx.request.body;
      console.log(data);
      const itemDetail = await ctx.model.Item.findOne(data);
      // itemDetail.csrf = ctx.csrf;
      console.log(itemDetail);
      return itemDetail;
  }
}
module.exports = ItemService;