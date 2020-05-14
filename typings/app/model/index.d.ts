// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAssign = require('../../../app/model/assign');
import ExportCategory = require('../../../app/model/category');
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
import ExportInterruptRequest = require('../../../app/model/interruptRequest');
import ExportItem = require('../../../app/model/item');
import ExportItemjudge = require('../../../app/model/itemjudge');
import ExportItemStateOnline = require('../../../app/model/itemStateOnline');
import ExportOperatorJudge = require('../../../app/model/operatorJudge');
import ExportOperatorJudgeStandard = require('../../../app/model/operatorJudgeStandard');
import ExportOperatorRP = require('../../../app/model/operatorRP');
import ExportOrder = require('../../../app/model/order');
import ExportPartition = require('../../../app/model/partition');
import ExportServicer = require('../../../app/model/servicer');
import ExportServicerApply = require('../../../app/model/servicerApply');
import ExportShoppingBar = require('../../../app/model/shoppingBar');
import ExportShoppinglist = require('../../../app/model/shoppinglist');
import ExportTask = require('../../../app/model/task');
import ExportWorkorder = require('../../../app/model/workorder');
import ExportWorkorderlog = require('../../../app/model/workorderlog');

declare module 'egg' {
  interface IModel {
    Assign: ReturnType<typeof ExportAssign>;
    Category: ReturnType<typeof ExportCategory>;
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
    InterruptRequest: ReturnType<typeof ExportInterruptRequest>;
    Item: ReturnType<typeof ExportItem>;
    Itemjudge: ReturnType<typeof ExportItemjudge>;
    ItemStateOnline: ReturnType<typeof ExportItemStateOnline>;
    OperatorJudge: ReturnType<typeof ExportOperatorJudge>;
    OperatorJudgeStandard: ReturnType<typeof ExportOperatorJudgeStandard>;
    OperatorRP: ReturnType<typeof ExportOperatorRP>;
    Order: ReturnType<typeof ExportOrder>;
    Partition: ReturnType<typeof ExportPartition>;
    Servicer: ReturnType<typeof ExportServicer>;
    ServicerApply: ReturnType<typeof ExportServicerApply>;
    ShoppingBar: ReturnType<typeof ExportShoppingBar>;
    Shoppinglist: ReturnType<typeof ExportShoppinglist>;
    Task: ReturnType<typeof ExportTask>;
    Workorder: ReturnType<typeof ExportWorkorder>;
    Workorderlog: ReturnType<typeof ExportWorkorderlog>;
  }
}
