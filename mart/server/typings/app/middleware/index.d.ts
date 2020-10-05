// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGzip = require('../../../app/middleware/gzip');
import ExportOauth = require('../../../app/middleware/oauth');

declare module 'egg' {
  interface IMiddleware {
    gzip: typeof ExportGzip;
    oauth: typeof ExportOauth;
  }
}
