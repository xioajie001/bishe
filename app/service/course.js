'use strict';

const Service = require('egg').Service;
class CourseService extends Service {
  // 更新用户信息
  async add() {
    const { ctx,} = this;
    const result = await ctx.model.Course.create({
        courseId: '004',
        courseName:'计算机' ,
        teacher:'大地',
        courseInfo:'介绍nodejs的一门课程'
    });
    // const result = "111";
    return result;
  }
}
module.exports = CourseService;