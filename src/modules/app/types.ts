export type Type<C extends object = object> = new (...args: any) => C;

export interface IMulterRequestFile {
    key: string
    path: string
    mimetype: string
    originalname: string
    size: number
    location: string
  }