'use strict';

const Controller = require('egg').Controller;

class ServicerApplyController extends Controller {

  //专才申请时获取可选单品
  async getServicerApplyItem() {
    const { ctx } = this;
    ctx.body = await ctx.service.servicerApply.getServicerApplyItem();
  }

  //专才申请时获取可选单品
  async servicerApply() {
    const { ctx } = this;
    ctx.body = await ctx.service.servicerApply.servicerApply();
  }
}

module.exports = ServicerApplyController;