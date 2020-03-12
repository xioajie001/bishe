// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCsrfAuth = require('../../../app/middleware/csrfAuth');

declare module 'egg' {
  interface IMiddleware {
    csrfAuth: typeof ExportCsrfAuth;
  }
}
