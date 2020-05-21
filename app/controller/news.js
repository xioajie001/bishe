'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {

    async getNews() {
        const { ctx } = this;
        ctx.body = await ctx.service.news.getNews();
    }

    async setRead() {
        const { ctx } = this;
        ctx.body = await ctx.service.news.setRead();
    }
  
}

module.exports = NewsController;