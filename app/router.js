'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 客户
  router.get('/customer/personal',app.jwt,controller.customer.personal); //获取用户个人信息
  router.post('/customer/doAdd', controller.customer.doAdd); //客户注册
  router.post('/customer/login',controller.customer.login);  //客户登录
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
  router.get('/item/getItem',controller.item.getItem) //获取全部商品信息
  router.get('/item/getItemDetail',controller.item.getItemDetail) //获取商品详情信息

  //投诉
  router.post('/complain/doAdd',controller.complain.doAdd) //投诉

  //评论
  router.post('/comment/doAdd',controller.comment.doAdd) //评论

  // 专才
  router.get('/servicer/personal',app.jwt, controller.servicer.personal); //获取专才个人信息
  router.post('/servicer/doAdd', controller.servicer.doAdd); //专才注册
  router.post('/servicer/login',controller.servicer.login);  //专才登录
  router.post('/servicer/doEdit',app.jwt,controller.servicer.doEdit);  //专才做修改
  router.post('/servicer/upload',app.jwt,controller.servicer.upload);  //专才上传头像
  router.post('/servicer/setMaxWorkeOrder',app.jwt,controller.servicer.setMaxWorkeOrder);  //最大接单数设置
  router.post('/servicer/setServicerStatus',app.jwt,controller.servicer.setServicerStatus);  //接单状态调整

  //专才项目申请
  router.get('/servicerApply/getServicerApplyItem', controller.servicerApply.getServicerApplyItem); //专才申请时获取可选单品
  router.post('/servicerApply/servicerApply', app.jwt, controller.servicerApply.servicerApply); //专才申请时获取可选单品

  //专才工单管理模块
  router.get('/workorder/comfirm', app.jwt, controller.workorder.comfirm); //确认接收工单页面
  router.post('/workorder/doComfirm', app.jwt, controller.workorder.doComfirm); //确认接收工单
  router.post('/workorder/refuse', app.jwt, controller.workorder.refuse); //拒单
  router.get('/workorder/working', app.jwt, controller.workorder.working); //正在进行的任务页面
  router.get('/workorder/waitWork', app.jwt, controller.workorder.waitWork); //等待开始的任务页面
  router.get('/workorder/work', app.jwt, controller.workorder.work); //任务页面
  router.post('/workorder/workDetail', app.jwt, controller.workorder.workDetail); //任务详情页面
  router.post('/workorder/taskSubmit', app.jwt, controller.workorder.taskSubmit); //任务提交

  // 图片上传尝试
  router.get('/focus', controller.focus.index);
  router.get('/focus/add', controller.focus.add);
  router.post('/focus/doAdd', controller.focus.doAdd);
  
};
