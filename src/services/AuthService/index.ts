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
export const resetPassword = async (resetInfo: FieldValues) => {
  try {
    // console.log(userInfo,"from service")
    const { data } = await axiosInstance.patch("/auth/reset-password", resetInfo);
    
   



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const editProfile = async (updateInfo: FieldValues) => {
  try {
    // console.log(userInfo,"from service")
    const { data } = await axiosInstance.patch("/auth/edit-profile", updateInfo);
    
   



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const deleteRecipe = async (id: FieldValues) => {
  console.log(id,"del recipe service")
  try {

    const { data } = await axiosInstance.patch("/recipes/delete-recipe", id);
    
   



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const recipeVote = async (voteInfo: FieldValues) => {
  try {
    // console.log(userInfo,"from service")
    const { data } = await axiosInstance.put("/recipes/vote", voteInfo);
   
    // console.log(data)



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
export const followUser = async (followData: FieldValues) => {
  try {
  
   console.log(followData,"follow data")
    const { data } = await axiosInstance.patch("/auth/follow", followData);
    
    // console.log(data)



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const unfollowUser = async (unfollowData: FieldValues) => {
  try {
  
   console.log(unfollowData,"unfollow data")
    const { data } = await axiosInstance.patch("/auth/unfollow", unfollowData);
    
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
export const getUserFromDB = async (userId:string) => {

  try {
  
    const { data } = await axiosInstance.get(`/user/getMe/${userId}` );
   
  



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
  

 
};



export const checkFollow = async (Info: FieldValues) => {
  try {

    

    const res = await fetch(`http://localhost:4000/user/checkFollow?currentUser=${Info?.current}&followedUser=${Info.follow}`,{
   
    cache:"no-store"
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  //  console.log(res)

  
    const data= await res.json();

    console.log(data)
    return data



    
  } catch (error: any) {
    console.log(error)
    throw new Error(error);
  }
};


export const recipeComment = async (commentInfo: FieldValues) => {
  try {
    // console.log(userInfo,"from service")
    const { data } = await axiosInstance.put("/recipes/comments", commentInfo);
   
    // console.log(data)



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const deleteComment = async (commentId: FieldValues) => {
  try {
    console.log("delete service",commentId)
   
    const { data } = await axiosInstance.put("/recipes/commentsdelete", {commentId});
   
  



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const editComment = async (commentInfo: FieldValues) => {
  try {
    // console.log("comment edit service",commentInfo)
   
    const { data } = await axiosInstance.put("/recipes/editcomments", commentInfo);
   
  



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
export const rateRecipe = async (rateInfo: FieldValues) => {
  try {
 
   
    const { data } = await axiosInstance.put("/recipes/rate", rateInfo);
   
  



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};

export const createPayment = async (price: FieldValues) => {
  try {
 
   
    const { data } = await axiosInstance.post("/create-payment-intent", price);
   
  



    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message);
  }
};
