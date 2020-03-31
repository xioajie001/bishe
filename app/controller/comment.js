'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async doAdd() {
    this.ctx.body =await this.ctx.service.comment.doAdd();
  }
}

module.exports = CommentController;