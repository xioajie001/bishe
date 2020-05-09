// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportComment = require('../../../app/controller/comment');
import ExportComplain = require('../../../app/controller/complain');
import ExportCourse = require('../../../app/controller/course');
import ExportCustomer = require('../../../app/controller/customer');
import ExportFocus = require('../../../app/controller/focus');
import ExportHome = require('../../../app/controller/home');
import ExportItem = require('../../../app/controller/item');
import ExportOrder = require('../../../app/controller/order');
import ExportServicer = require('../../../app/controller/servicer');
import ExportServicerApply = require('../../../app/controller/servicerApply');
import ExportShoppingBar = require('../../../app/controller/shoppingBar');
import ExportWorkorder = require('../../../app/controller/workorder');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    comment: ExportComment;
    complain: ExportComplain;
    course: ExportCourse;
    customer: ExportCustomer;
    focus: ExportFocus;
    home: ExportHome;
    item: ExportItem;
    order: ExportOrder;
    servicer: ExportServicer;
    servicerApply: ExportServicerApply;
    shoppingBar: ExportShoppingBar;
    workorder: ExportWorkorder;
  }
}
