'use strict';

const Controller = require('egg').Controller;

class ComplainController extends Controller {
  async doAdd() {
    this.ctx.body =await this.ctx.service.complain.doAdd();
  }
}

module.exports = ComplainController;