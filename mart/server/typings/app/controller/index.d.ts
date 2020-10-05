// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress = require('../../../app/controller/address');
import ExportCarousel = require('../../../app/controller/carousel');
import ExportComment = require('../../../app/controller/comment');
import ExportHome = require('../../../app/controller/home');
import ExportOrder = require('../../../app/controller/order');
import ExportProduct = require('../../../app/controller/product');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    address: ExportAddress;
    carousel: ExportCarousel;
    comment: ExportComment;
    home: ExportHome;
    order: ExportOrder;
    product: ExportProduct;
    user: ExportUser;
  }
}
