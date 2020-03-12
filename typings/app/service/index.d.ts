// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCourse = require('../../../app/service/course');
import ExportCustomer = require('../../../app/service/customer');
import ExportItem = require('../../../app/service/item');
import ExportOrder = require('../../../app/service/order');
import ExportShoppingBar = require('../../../app/service/shoppingBar');
import ExportTools = require('../../../app/service/tools');

declare module 'egg' {
  interface IService {
    course: ExportCourse;
    customer: ExportCustomer;
    item: ExportItem;
    order: ExportOrder;
    shoppingBar: ExportShoppingBar;
    tools: ExportTools;
  }
}
