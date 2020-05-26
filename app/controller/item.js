'use strict';

const Controller = require('egg').Controller;

class ItemController extends Controller {
  async getItem() {
    const { ctx } = this;
    ctx.body = await ctx.service.item.getItem();
  }

  //按品类获取商品
  async getItemSome() {
    const { ctx } = this;
    ctx.body = await ctx.service.item.getItemSome();
  }

  async getItemDetail() {
    const { ctx } = this;
    ctx.body = await ctx.service.item.getItemDetail();
  }
}

module.exports = ItemController;