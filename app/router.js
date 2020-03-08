'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 客户
  router.post('/customer/add', controller.customer.add); //客户注册
  router.get('/customer/login',controller.customer.login);  //客户登录
  router.post('/customer/edit',controller.customer.edit);  //客户登录
  router.post('/customer/upload',controller.customer.upload);  //客户登录

  //订单
  router.post('/order/doAdd',controller.order.doAdd);  //下单功能

  //购物车
  router.post('/shoppingbar/doAdd',controller.shoppingBar.doAdd);//添加购物车

  // 图片上传尝试
  router.get('/focus', controller.focus.index);
  router.get('/focus/add', controller.focus.add);
  router.post('/focus/doAdd', controller.focus.doAdd);
};
