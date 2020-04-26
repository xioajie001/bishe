'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 客户
  router.get('/customer/personal', app.jwt,controller.customer.personal); //获取用户个人信息
  router.post('/customer/doAdd', controller.customer.doAdd); //客户注册
  router.post('/customer/login',controller.customer.login);  //客户登录
  router.get('/customer/edit',app.jwt,controller.customer.edit);  //客户修改页面
  router.post('/customer/doEdit',app.jwt,controller.customer.doEdit);  //客户做修改
  router.post('/customer/upload',app.jwt,controller.customer.upload);  //客户上传头像

  //订单
  router.get('/order/getOrder',app.jwt,controller.order.getOrder);  //获取订单信息
  router.post('/order/doAdd',app.jwt,controller.order.doAdd);  //下单功能
  router.post('/order/confirm',app.jwt,controller.order.confirm);  //验收订单
  router.post('/order/cancel',app.jwt,controller.order.cancel);  //取消订单

  //购物车
  router.get('/shoppingbar/getShoppingBar',app.jwt,controller.shoppingBar.getShoppingBar);  //获取购物车信息
  router.post('/shoppingbar/doAdd',app.jwt,controller.shoppingBar.doAdd);//添加购物车

  //商品
  router.get('/item/getItem',app.jwt,controller.item.getItem) //获取全部商品信息
  router.get('/item/getItemDetail',app.jwt,controller.item.getItemDetail) //获取商品详情信息

  //投诉
  router.post('/complain/doAdd',app.jwt,controller.complain.doAdd) //投诉

  //评论
  router.post('/comment/doAdd',app.jwt,controller.comment.doAdd) //评论

  // 专才
  router.get('/servicer/personal',app.jwt, controller.servicer.personal); //获取专才个人信息
  router.get('/servicer/add', controller.servicer.add); //专才注册页面
  router.post('/servicer/doAdd', controller.servicer.doAdd); //专才注册
  router.get('/servicer/login',controller.servicer.login);  //专才登录
  router.get('/servicer/edit',controller.servicer.edit);  //专才修改页面
  router.post('/servicer/doEdit',app.jwt,controller.servicer.doEdit);  //专才做修改
  router.post('/servicer/upload',app.jwt,controller.servicer.upload);  //专才上传头像

  // 图片上传尝试
  router.get('/focus', controller.focus.index);
  router.get('/focus/add', controller.focus.add);
  router.post('/focus/doAdd', controller.focus.doAdd);
};
