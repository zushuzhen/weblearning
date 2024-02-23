import Axios from "axios";
/**
 * 1. 浏览器创建XMLHttpRequest；node 创建http
 * 2. 拦截请求、响应
 * 3. 转换响应数据和请求数据
 * 4. 取消请求
 * 5. 自动转换JSON数据
 * 6. 防御XSRF攻击
 *
 */
// 异常拦截处理器
const errorHandler = (error) => {
  // TODO
  return error;
};

class Api {
  constructor(config) {
    const options = {
      timeout: 6000,
      ...config,
    };
    this.ajax = Axios.create(options);
    // 拦截请求、响应
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  interceptorsRequest() {
    this.ajax.interceptors.request.use((config) => {
      // TODO
      config.headers.token = "";
      return config;
    }, errorHandler);
  }
  interceptorsResponse() {
    this.ajax.interceptors.response.use((response) => {
      if (response.data.code == 200) {
        return response.data;
      } else {
        console.error("Response Error:", response); // 输出完整的响应对象

        const msg =
          response.data && response.data.msg
            ? response.data.msg
            : response.statusText;

        throw new Error(msg);
      }
    }, errorHandler);
  }
  request(params) {
    return this.ajax(params);
  }
}
// 默认的服务地址
export const apiInstance = new Api({
  baseUrl: "/api",
});
export default Api;
