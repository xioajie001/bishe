'use strict';

const Controller = require('egg').Controller;

class ShoppingBarController extends Controller {
  async doAdd() {
    const { ctx } = this;
    ctx.body = await ctx.service.shoppingBar.doAdd();
  }
}

module.exports = ShoppingBarController;