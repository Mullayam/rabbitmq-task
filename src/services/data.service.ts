import { Injectable } from "src/modules/common";

@Injectable()
export class DataProvider {
  data() {
    return { hello: 'world' };
  }
}