import { apiInstance } from "./ajax.js";
// post + application/x-www-form-urlencoded
export async function postForm(url, params, configs) {
  const options = {
    url: `/api${url}`, // 添加相对路径
    method: "post",
    data: new URLSearchParams(params),
    ...configs,
  };
  return apiInstance.request(options);
}

// post + application/json
export async function postJson(url, data, configs) {
  const options = {
    url: `/api${url}`, // 添加相对路径
    method: "post",
    data,
    ...configs,
  };
  return apiInstance.request(options);
}

// get
export async function get(url, params, configs) {
  const options = {
    url: `/api${url}`, // 添加相对路径
    method: "get",
    params,
    ...configs,
  };
  return apiInstance.request(options);
}
//栏目树
export async function gettree(id = null, Boole = null) {
  let data = {
    parentId: id,
    containParent: Boole,
  };
  return apiInstance.request({
    url: "/api/cms/category/tree",
    method: "get",
    params: data,
  });
}
export async function getContentById(url, id, configs) {
  const options = {
    url: `/api${url}/${id}`, // 添加相对路径
    method: "get",
    ...configs,
  };
  return apiInstance.request(options);
}
