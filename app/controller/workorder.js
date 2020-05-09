'use strict';

const Controller = require('egg').Controller;

class WorkorderController extends Controller {

  //确认接收工单页面
  async comfirm() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.comfirm();
  }

  //确认接收工单
  async doComfirm() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.doComfirm();
  }

}

module.exports = WorkorderController;