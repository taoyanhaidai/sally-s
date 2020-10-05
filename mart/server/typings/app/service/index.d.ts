// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAddress = require('../../../app/service/address');
import ExportCarousel = require('../../../app/service/carousel');
import ExportComment = require('../../../app/service/comment');
import ExportOrder = require('../../../app/service/order');
import ExportProduct = require('../../../app/service/product');
import ExportSort = require('../../../app/service/sort');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    address: AutoInstanceType<typeof ExportAddress>;
    carousel: AutoInstanceType<typeof ExportCarousel>;
    comment: AutoInstanceType<typeof ExportComment>;
    order: AutoInstanceType<typeof ExportOrder>;
    product: AutoInstanceType<typeof ExportProduct>;
    sort: AutoInstanceType<typeof ExportSort>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
