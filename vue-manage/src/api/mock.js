import Mock from "mockjs";
import homeApi from "./mockServeData/home";

// mock请求拦截
Mock.mock("/api/home/getData", homeApi.getStatisticalData);
