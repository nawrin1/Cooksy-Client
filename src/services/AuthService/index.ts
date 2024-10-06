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
      //   cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userInfo: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userInfo);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      //   cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
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
