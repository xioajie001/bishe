'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {

  //获取订单
  async getOrder() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrder();
  }

  //查看未开始订单
  async getOrderWait() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrderWait();
  }

  //查看正在进行的订单
  async getOrdering() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrdering();
  }

  //查看正在进行的订单详情
  async getOrderingDetail() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrderingDetail();
  }

  //获取任务提交页面
  async getLog() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getLog();
  }

  async getOrder() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.getOrder();
  }

  //增加订单
  async doAdd() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.doAdd();
  }

  //验收订单
  async confirm() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.confirm();
  }

  //取消订单
  async cancel() {
    const { ctx } = this;
    ctx.body = await ctx.service.order.cancel();
  }
}

module.exports = OrderController;