/**
 * @packageDocumentation
 * @module @tomato-js/request
 */

import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { FunctionType } from "@tomato-js/shared";

type Interceptor = {
  onFulfilled: FunctionType<any, any>;
  onRejected: FunctionType<any, any>;
};

type Interceptors = Interceptor[];

type Settings = {
  requestInterceptors?: Interceptors;
  responseInterceptors?: Interceptors;
} & AxiosRequestConfig;

export type RequestInstance = AxiosInstance;
//创建拦截器
const createInterceptors = (inst: AxiosInstance, requestInterceptors: Interceptors = [], responseInterceptors: Interceptors = []) => {
  requestInterceptors.map(requestInterceptor => {
    inst.interceptors.request.use(requestInterceptor.onFulfilled, requestInterceptor.onRejected);
  });
  responseInterceptors.map(responseInterceptor => {
    inst.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected);
  });
};
/**
 * 详细配置一个request实例
 *
 * 脚本举例
 * ```
 *   import { getIns } from '@tomato-js/request'
 *   const myRequest = getIns({
 *     responseInterceptors: [
 *       {
 *         onFulfilled: response => {
 *           response.data.hello = "me";
 *           return response;
 *         },
 *         onRejected: error => {
 *           return Promise.reject(error);
 *         }
 *       }
 *     ]
 *   });
 *   const response = await myRequest.post("/post.json", {
 *     option: "lala"
 *   });
 * ```
 *
 * @param settings - 配置，和axios保持一致
 * @param settings.requestInterceptors - 请求拦截器
 * @param settings.responseInterceptors - 响应拦截器
 * @returns request实例
 */
function getIns(settings: Settings = {}) {
  const { requestInterceptors, responseInterceptors, ...config } = settings;

  const inst = axios.create(config);
  if (requestInterceptors || responseInterceptors) {
    //创建拦截器列表
    createInterceptors(inst, requestInterceptors, responseInterceptors);
  }
  return inst;
}
/**
 * 全量request方法
 *
 * 脚本举例
 * ```
 *   import { request } from '@tomato-js/request'
 *   const { data } = await request({
 *     method: "get",
 *     url: "/get.json"
 *   });
 * ```
 *
 * @param settings - 配置，和axios保持一致https://github.com/axios/axios/blob/master/README.md#request-config
 * @returns Promise
 */
function request(settings: AxiosRequestConfig) {
  return axios(settings);
}
/**
 * 简易get方法
 *
 * 脚本举例
 * ```
 *   import { get } from '@tomato-js/request'
 *   const { data } = await get('/api.json');
 * ```
 *
 * @param url - 请求路径
 * @param settings - 配置，和axios保持一致https://github.com/axios/axios/blob/master/README.md#request-config
 * @returns Promise
 */
function get(url: string, settings?: AxiosRequestConfig) {
  return axios.get(url, settings);
}
/**
 * 简易post方法
 *
 * 脚本举例
 * ```
 *   import { post } from '@tomato-js/request'
 *   const { data } = await post('/api.json',{
 *     data: {
 *       str: 'str'
 *     }
 *   });
 * ```
 * @param url - 请求路径
 * @param settings - 配置，和axios保持一致
 * @returns Promise
 */
function post(url: string, settings?: AxiosRequestConfig) {
  return axios.post(url, settings);
}

export { getIns, request, get, post };
