'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {

  // 注册
  async add(){
    this.ctx.body = await this.ctx.service.customer.add();
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
