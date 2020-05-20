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
  
  //拒单(前端传来派单表（Assign）的id)
  async refuse() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.refuse();
  }

  //正在进行的任务页面
  async working() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.working();
  }

  //等待开始的任务页面
  async waitWork() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.waitWork();
  }

  //已完成工单
  async worked() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.worked();
  }

  //全部工单页面
  async allWork() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.allWork();
  }

  //任务页面
  async work() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.work();
  }

  //任务详情页面
  async workDetail() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.workDetail();
  }

  //任务图片提交 前端传来工单id和taskId
  async taskSubmit() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.taskSubmit();
  }

  //任务文字反馈提交  前端传来workorderId和taskId
  async taskWordSubmit() {
    const { ctx } = this;
    ctx.body = await ctx.service.workorder.taskWordSubmit();
  }

}

module.exports = WorkorderController;