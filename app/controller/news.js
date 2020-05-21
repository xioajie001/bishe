'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {

    async getNewsing() {
        const { ctx } = this;
        ctx.body = await ctx.service.news.getNewsing();
    }

    async getNewsed() {
        const { ctx } = this;
        ctx.body = await ctx.service.news.getNewsed();
    }

    async setRead() {
        const { ctx } = this;
        ctx.body = await ctx.service.news.setRead();
    }
  
}

module.exports = NewsController;