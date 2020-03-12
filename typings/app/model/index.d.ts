// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategoryAdjust = require('../../../app/model/categoryAdjust');
import ExportCategoryJudge = require('../../../app/model/categoryJudge');
import ExportCategoryJudgeStandard = require('../../../app/model/categoryJudgeStandard');
import ExportComment = require('../../../app/model/comment');
import ExportComplain = require('../../../app/model/complain');
import ExportContract = require('../../../app/model/contract');
import ExportCourse = require('../../../app/model/course');
import ExportCustomer = require('../../../app/model/customer');
import ExportDistributeOrder = require('../../../app/model/distributeOrder');
import ExportFocus = require('../../../app/model/focus');
import ExportItem = require('../../../app/model/item');
import ExportItemjudge = require('../../../app/model/itemjudge');
import ExportItemStateOnline = require('../../../app/model/itemStateOnline');
import ExportOperatorJudge = require('../../../app/model/operatorJudge');
import ExportOperatorJudgeStandard = require('../../../app/model/operatorJudgeStandard');
import ExportOperatorRP = require('../../../app/model/operatorRP');
import ExportOrder = require('../../../app/model/order');
import ExportServicer = require('../../../app/model/servicer');
import ExportShoppingBar = require('../../../app/model/shoppingBar');
import ExportShoppinglist = require('../../../app/model/shoppinglist');

declare module 'egg' {
  interface IModel {
    CategoryAdjust: ReturnType<typeof ExportCategoryAdjust>;
    CategoryJudge: ReturnType<typeof ExportCategoryJudge>;
    CategoryJudgeStandard: ReturnType<typeof ExportCategoryJudgeStandard>;
    Comment: ReturnType<typeof ExportComment>;
    Complain: ReturnType<typeof ExportComplain>;
    Contract: ReturnType<typeof ExportContract>;
    Course: ReturnType<typeof ExportCourse>;
    Customer: ReturnType<typeof ExportCustomer>;
    DistributeOrder: ReturnType<typeof ExportDistributeOrder>;
    Focus: ReturnType<typeof ExportFocus>;
    Item: ReturnType<typeof ExportItem>;
    Itemjudge: ReturnType<typeof ExportItemjudge>;
    ItemStateOnline: ReturnType<typeof ExportItemStateOnline>;
    OperatorJudge: ReturnType<typeof ExportOperatorJudge>;
    OperatorJudgeStandard: ReturnType<typeof ExportOperatorJudgeStandard>;
    OperatorRP: ReturnType<typeof ExportOperatorRP>;
    Order: ReturnType<typeof ExportOrder>;
    Servicer: ReturnType<typeof ExportServicer>;
    ShoppingBar: ReturnType<typeof ExportShoppingBar>;
    Shoppinglist: ReturnType<typeof ExportShoppinglist>;
  }
}
