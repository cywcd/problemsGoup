
import request from '@/api/request'
import { IResponse, ISubmit } from './type';

/**
 * @description: 提交组织数据
 * @params {ISubmit} params
 * @return {Promise}
 */
 export const orgSubmit = (params: ISubmit): Promise<IResponse> => {
  return request.post('user/orgSubmit',params).then((res: any) => res.data);
};

export default {
  orgSubmit
}