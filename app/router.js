'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 客户
  router.get('/customer/personal', controller.customer.personal); //获取用户个人信息
  router.get('/customer/add', controller.customer.add); //客户注册页面
  router.post('/customer/doAdd', controller.customer.doAdd); //客户注册
  router.get('/customer/login',controller.customer.login);  //客户登录
  router.get('/customer/edit',controller.customer.edit);  //客户修改页面
  router.post('/customer/doEdit',controller.customer.doEdit);  //客户做修改
  router.post('/customer/upload',controller.customer.upload);  //客户上传头像

  //订单
  router.get('/order/getOrder',controller.order.getOrder);  //获取订单信息
  router.post('/order/doAdd',controller.order.doAdd);  //下单功能
  router.post('/order/confirm',controller.order.confirm);  //验收订单
  router.post('/order/cancel',controller.order.cancel);  //取消订单

  //购物车
  router.get('/shoppingbar/getShoppingBar',controller.shoppingBar.getShoppingBar);  //获取购物车信息
  router.post('/shoppingbar/doAdd',controller.shoppingBar.doAdd);//添加购物车

  //商品
  router.get('/item/getItem',controller.item.getItem) //获取全部商品信息
  router.get('/item/getItemDetail',controller.item.getItemDetail) //获取商品详情信息

  //投诉
  router.post('/complain/doAdd',controller.complain.doAdd) //投诉

  //评论
  router.post('/comment/doAdd',controller.comment.doAdd) //评论

  // 专才
  router.get('/servicer/personal', controller.servicer.personal); //获取专才个人信息
  router.get('/servicer/add', controller.servicer.add); //专才注册页面
  router.post('/servicer/doAdd', controller.servicer.doAdd); //专才注册
  router.get('/servicer/login',controller.servicer.login);  //专才登录
  router.get('/servicer/edit',controller.servicer.edit);  //专才修改页面
  router.post('/servicer/doEdit',controller.servicer.doEdit);  //专才做修改
  router.post('/servicer/upload',controller.servicer.upload);  //专才上传头像

  // 图片上传尝试
  router.get('/focus', controller.focus.index);
  router.get('/focus/add', controller.focus.add);
  router.post('/focus/doAdd', controller.focus.doAdd);
};
