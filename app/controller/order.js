'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async doAdd() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.doAdd();
  }
}

module.exports = OrderController;