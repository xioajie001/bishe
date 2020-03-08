'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
  async add() {
    console.log(this.config.api)
    this.ctx.body =await this.ctx.service.course.add();
  }
}

module.exports = CourseController;
