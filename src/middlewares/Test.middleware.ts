import { Injectable } from "src/modules/common";
import { Request, Response, NextFunction } from "express"
import { Middleware} from "src/modules/app";

@Injectable() 
export class TestMiddleware implements Middleware {
  constructor() {}
  use(_request: Request, response: Response, next: NextFunction) {
    console.log('Test Middleware')
    next();
  }
}
