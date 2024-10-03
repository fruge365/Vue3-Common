// 一、导入模块：切记cnpm i axios -S
import axios from "axios";
import router from "@/router";

// 二、创建axios实例
const request = axios.create({
    // baseURL: "/api",
    // .env 全局默认配置文件，不论什么环境都会加载合并
    // .env.development 开发环境下的配置文件  cnpm run serve
    // .env.production 生产环境下的配置文件   cnpm run build
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
    // headers: {
    //   // 意味着：后期post请求 body: '参数名=数据&...&参数名=数据
    //   "content-type": "application/x-www-form-urlencoded",
    // },
});

// 三、拦截器
let ajax = {};
request.interceptors.request.use(
    (config) => {
        // token
        let token =
            localStorage.getItem("token") || "9201591ba0eb36c8abaea2854274f5082";
        config.headers.token = token;
        // cancelToken
        // if (ajax[config.url]) {
        //   ajax[config.url].cancel("Operation canceled by the user.");
        //   delete ajax[config.url];
        // }
        ajax[config.url] = axios.CancelToken.source();
        config.cancelToken = ajax[config.url].token;

        return config;
    },
    (error) => Promise.reject(error)
);
request.interceptors.response.use(
    (response) => {

        // // 403
        // if (response.code == 200) {
        //   Message.error("无权访问，跳转中...");
        //   // router.push("/login");
        //   return;
        // }
        // TOKEN过期
        // if (response.data.meta.msg.includes("TOKEN过期")) {
        //   Message.error("TOKEN过期，请重新登录...");
        //   router.push("/login");
        //   // TODO. 调用store去清除登录数据
        //   return;
        // }
        // 过滤.data.data
        return response.data;
    },
    (error) => {
        // 失败响应
        let errorObj = JSON.parse(JSON.stringify(error));

        // 关闭Loading
        if (loadingInstance) loadingInstance.close();
        // 判断失败原因
        if (errorObj.message.includes("timeout")) {
            Message.error("网络繁忙，请刷新后重试...");
        } else if (errorObj.message.includes("404")) {
            Message.error("接口地址写错了 404...");
        }
        return Promise.reject(error);
    }
);

// 四、导出
export default request;