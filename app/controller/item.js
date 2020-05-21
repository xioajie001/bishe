'use strict';

const Controller = require('egg').Controller;

class ItemController extends Controller {
  async getItem() {
    const { ctx } = this;
    ctx.body = await ctx.service.item.getItem();
  }

  async getItemDetail() {
    const { ctx } = this;
    ctx.body = await ctx.service.item.getItemDetail();
  }
}

module.exports = ItemController;