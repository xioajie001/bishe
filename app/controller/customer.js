'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {

  async add() {
    this.ctx.body = this.ctx.csrf;
  }

  // 注册
  async doAdd() {
    this.ctx.body = await this.ctx.service.customer.doAdd();
  }

  async login() {
    this.ctx.body = await this.ctx.service.customer.login();
  }

  async edit() {
    this.ctx.body = await this.ctx.service.customer.edit();
  }

  async upload() {
    this.ctx.body = await this.ctx.service.customer.upload();
  }


}

module.exports = CustomerController;
