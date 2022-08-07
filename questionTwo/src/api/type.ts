// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

/** 提交信息 */
export interface ISubmit {
  orgs: object[];
  members: object[];
}