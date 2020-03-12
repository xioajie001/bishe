'use strict';

const Controller = require('egg').Controller;

class ShoppingBarController extends Controller {

  //获取购物车信息
  async getShoppingBar() {
    const { ctx } = this;
    ctx.body = await ctx.service.shoppingBar.getShoppingBar();
  }

  // 添加订单
  async doAdd() {
    const { ctx } = this;
    ctx.body = await ctx.service.shoppingBar.doAdd();
  }
}

module.exports = ShoppingBarController;