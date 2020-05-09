// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActionToken = require('../../../app/service/actionToken');
import ExportComment = require('../../../app/service/comment');
import ExportComplain = require('../../../app/service/complain');
import ExportCustomer = require('../../../app/service/customer');
import ExportItem = require('../../../app/service/item');
import ExportOrder = require('../../../app/service/order');
import ExportServicer = require('../../../app/service/servicer');
import ExportServicerApply = require('../../../app/service/servicerApply');
import ExportShoppingBar = require('../../../app/service/shoppingBar');
import ExportTools = require('../../../app/service/tools');
import ExportWorkorder = require('../../../app/service/workorder');

declare module 'egg' {
  interface IService {
    actionToken: ExportActionToken;
    comment: ExportComment;
    complain: ExportComplain;
    customer: ExportCustomer;
    item: ExportItem;
    order: ExportOrder;
    servicer: ExportServicer;
    servicerApply: ExportServicerApply;
    shoppingBar: ExportShoppingBar;
    tools: ExportTools;
    workorder: ExportWorkorder;
  }
}
