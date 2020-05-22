/* eslint-disable no-unused-vars */
/**
 * 模拟消息服务
 */
'use strict';

const Service = require('egg').Service;
class NewsService extends Service {

  /**
  * 接受其他端传来的消息，获取新增消息
  */
  // async receiveVerify() {
  //   const News = this.ctx.model.Verify.News;

  //   // 假设第一条消息时间戳为0,获取上一次最新的消息时间戳
  //   const firstNews = 0;
  //   const lastOne = this.ctx.session.news ? this.ctx.session.news : firstNews;

  //   // 查询现有数据库中最新的时间戳
  //   const latest = await News.findOne().sort({ _id: -1 });
  //   const latestOne = latest.timestamp;
  //   let news = []; // 用来存储新增的消息
  //   // 判断是否有新增消息
  //   if (lastOne < latestOne) {
  //     // 有新增消息，然后查询
  //     news = await News.find({ timestamp: { $gt: lastOne } });
  //     this.ctx.session.news = latestOne; // 更新session为最新的
  //   }

  //   return {
  //     news,
  //     amount: news.length,
  //     information: '新增的消息内容与数量',
  //   };
  // }

  /**
   * 已读消息查询
   */
  async getNewsing() {
    const { ctx } = this;
    const News = ctx.model.News;
    const id = ctx.state.user.data.id;
    // const query = ctx.query;
    // console.log(query);
    try {
      const findresult = await News.find({receiveId : id, read : 0}).sort({ timestamp: -1 });

      if (findresult.length !== 0) {
        return {
          msg: findresult,
          status: '1',
        };
      }

      // 查询为空
      return {
        msg: '查询为空',
        status: '0',
      };
    } catch (err) {
      console.log('getNews: ' + err);
      return {
        msg: err.message,
        status: '0',
      };
    }
  }

  /**
   * 已读消息查询
   */
  async getNewsed() {
    const { ctx } = this;
    const News = ctx.model.News;
    const id = ctx.state.user.data.id;
    // const query = ctx.query;
    // console.log(query);
    try {
      const findresult = await News.find({receiveId : id, read : 1}).sort({ timestamp: -1 });

      if (findresult.length !== 0) {
        return {
          msg: findresult,
          status: '1',
        };
      }

      // 查询为空
      return {
        msg: '查询为空',
        status: '0',
      };
    } catch (err) {
      console.log('getNews: ' + err);
      return {
        msg: err.message,
        status: '0',
      };
    }
  }

  /**
   * 消息阅读状态改变
   * _id:为前端传来的消息记录id
   */
  async setRead() {

    const News = await this.ctx.model.News;
    const id = await this.ctx.query._id; // 消息记录id

    try {
      const updatedResult = await News.updateOne({ _id: id }, { read: '1' });

      if (updatedResult.nModified !== 0) {
        return {
          status: '1',
          msg: '消息已读',
          updatedResult,
        };
      }

      return {
        status: '0',
        msg: '数据库更新数为0，消息仍未读',
      };
    } catch (err) {
      console.log('setread: ', err);
      return {
        status: '0',
        msg: '数据库更新异常，消息仍未读',
        error: err.message,
      };
    }
  }

  //消息创建
  async newsCreate(parameter){
    let news = {};
    news.object = "z";
    news.object = "z";
  }

}

module.exports = NewsService;
