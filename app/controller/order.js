'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {

  //获取订单
  async getOrder() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrder();
  }

  //增加订单
  async doAdd() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.doAdd();
  }
}

module.exports = OrderController;