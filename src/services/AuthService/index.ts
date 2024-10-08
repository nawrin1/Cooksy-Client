"use server";

import { jwtDecode } from "jwt-decode";
/* eslint-disable prettier/prettier */

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userInfo: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userInfo);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userInfo: FieldValues) => {
  try {
    console.log(userInfo,"from service")
    const { data } = await axiosInstance.post("/auth/login", userInfo);
    // console.log(data)

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      
    }

    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const forgetPassword = async (userInfo: FieldValues) => {
  try {
    // console.log(userInfo,"from service")
    const { data } = await axiosInstance.post("/auth/forget-password", userInfo);
    console.log("hello")
    console.log(data)



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const forgetPasswordNew = async (userInfo: FieldValues) => {
  try {
    const {token,newPasswordInfo}=userInfo
    console.log(token,newPasswordInfo)
    if(token){
      cookies().set("accessToken", token);

    }
    const { data } = await axiosInstance.patch("/auth/forget-password-new", newPasswordInfo);
    
    // console.log(data)



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};

export const getUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      email: decodedToken.email,
      role: decodedToken.role,
      image: decodedToken.image,
      name: decodedToken.name,
      _id: decodedToken._id,
      password: decodedToken.password,
      bio: decodedToken.bio,
      follower: decodedToken.follower,
      following: decodedToken.following,
      isBlocked: decodedToken.isBlocked,
      isPremium: decodedToken.isPremium,
    };
  }

  return decodedToken;
};
