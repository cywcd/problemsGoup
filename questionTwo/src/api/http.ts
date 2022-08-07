
import request from '@/api/request'

// post
function postApi(url: string, params = {}, options = {}) {
  return request({
    url,
    method: 'post',
    params,
    ...options
  })
}

// get
function getApi(url: string, params = {}, options = {}) {
  return request({
    url,
    method: 'get',
    params,
    ...options
  })
}

// put
function putApi(url: string, params = {}) {
  return request({
    url: url,
    method: 'put',
    params
  })
}

// delete
function deleteApi(url: string, params = {}) {
  return request({
    url: url,
    method: 'delete',
    params
  })
}

// option
function optionsApi(url: string, params = {}) {
  return request({
    url: url,
    method: 'options',
    params
  })
}

export { postApi, getApi, putApi, deleteApi, optionsApi }
