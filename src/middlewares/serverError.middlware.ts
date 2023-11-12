import { Injectable } from "src/modules/common";
import { Request, Response, NextFunction } from "express";
import { ErrorMiddleware } from 'src/modules/app'
import { Exception } from '@enjoys/exception';
@Injectable()
export class ServerErrorHandler implements ErrorMiddleware { 
  use(error: Error, _request: Request, response: Response, next: NextFunction) {
    if (error)  {     
       return Exception.HttpException.ExceptionHandler(error, _request, response, next);
    }
    next()
  }
}
