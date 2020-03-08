// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportCourse = require('../../../app/controller/course');
import ExportCustomer = require('../../../app/controller/customer');
import ExportFocus = require('../../../app/controller/focus');
import ExportHome = require('../../../app/controller/home');
import ExportOrder = require('../../../app/controller/order');
import ExportShoppingBar = require('../../../app/controller/shoppingBar');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    course: ExportCourse;
    customer: ExportCustomer;
    focus: ExportFocus;
    home: ExportHome;
    order: ExportOrder;
    shoppingBar: ExportShoppingBar;
  }
}
