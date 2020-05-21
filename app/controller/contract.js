'use strict';

const Controller = require('egg').Controller;

class ContractController extends Controller {
  async getContract() {
    const { ctx } = this;
    ctx.body = await ctx.service.contract.getContract();
  }

}

module.exports = ContractController;