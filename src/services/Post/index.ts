"use server"
import envConfig from "@/src/config/envConfig";
import AxiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/* eslint-disable prettier/prettier */
export const createPost = async (formData: FormData): Promise<any> => {
    try {
      const { data } = await AxiosInstance.post("/recipes/create-recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
  
      revalidateTag("POSTS"); 
  
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create post");
    }
  };
export const getAllRecipes = async (): Promise<any> => {
    try {
      const res = await fetch("http://localhost:4000/recipes",{
        cache:"no-store"
        
      })
      
  
      revalidateTag("POSTS"); 
  
      const data=await res.json();
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get post");
    }
  };


  export const getMyRecipes = async (): Promise<any> => {
    const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    // console.log(decodedToken,"dedoded from get my")
    
    try {
      const res = await fetch(`http://localhost:4000/recipes/getMyRecipe/${decodedToken?._id}`,{
        cache:"no-store"
        
      })
      
  
      revalidateTag("MY_POSTS"); 
  
      const data=await res.json();
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get post");
    }
  }
};




  export const getSingleRecipe = async (recipeId: string) => {
    console.log(recipeId,"in post index.ts")
    let fetchOptions = {};
  
    fetchOptions = {
      cache: "no-store",
    };
  
    const res = await fetch(`http://localhost:4000/recipes/${recipeId}`, fetchOptions);
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  };

