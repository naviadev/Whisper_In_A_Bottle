import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";

import REQUEST_PORT from "../../ts/enums/REQUEST_PORT.enum";

const SERVER_URL = process.env.SERVER_URL || REQUEST_PORT.__NEXT_SERVER_PORT;

//TODO 함수로 계속 생성하지말고, 싱글톤으로 변경할까 고민임. (헤더를 고정적으로 사용하면?)
//! 메모리 단편화 문제가 있습니다.
const returnInstance = (headers?: AxiosRequestHeaders): AxiosInstance =>
  axios.create({
    baseURL: SERVER_URL,
    headers: headers,
  });

export default returnInstance;
