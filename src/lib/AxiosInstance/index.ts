/* eslint-disable prettier/prettier */
import axios from "axios";
import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:4000"
    
  });


  AxiosInstance.interceptors.request.use(function (config) {
    const cookieStore=cookies()
    const accessToken=cookieStore.get("accessToken")?.value

    console.log("at time of req")

    if(accessToken){
        config.headers.Authorization=accessToken
    }
    
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });


export default AxiosInstance