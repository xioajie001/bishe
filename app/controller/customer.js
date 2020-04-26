'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {

  //获取个人详情信息
  async personal() {
    this.ctx.body = await this.ctx.service.customer.personal();
  }


  // 注册
  async doAdd() {
    this.ctx.body = await this.ctx.service.customer.doAdd();
  }

  //登录
  async login() {
    this.ctx.body = await this.ctx.service.customer.login();
  }

  async edit() {
    this.ctx.body = this.ctx.csrf;
  }

  //做修改
  async doEdit() {
    this.ctx.body = await this.ctx.service.customer.doEdit();
  }

  //头像上传
  async upload() {
    this.ctx.body = await this.ctx.service.customer.upload();
  }

  


}

module.exports = CustomerController;
