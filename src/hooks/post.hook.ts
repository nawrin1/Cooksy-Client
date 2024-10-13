/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import { createPost, getAllRecipes, getMyRecipes, getSingleRecipe } from "../services/Post";
import { deleteRecipe, recipeVote } from "../services/AuthService";



export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useVote = () => {
  return useMutation<any, Error,FieldValues>({
    mutationKey: ["Vote"],
    mutationFn: async (voteInfo) => await recipeVote(voteInfo),
    onSuccess: () => {
      toast.success("Vote done succesfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteRecipe = () => {
  return useMutation<any, Error,FieldValues>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (id) => await deleteRecipe(id),
    onSuccess: () => {
      toast.success("Recipe deleted succesfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useFetchPost = () => {
  return useQuery({
    queryKey: ["POSTS"],
    queryFn: async () => await getAllRecipes(),
    refetchInterval: 10,
  });
};

export const useMyRecipe = () => {
  return useQuery({
    queryKey: ["MY_POSTS"],
    queryFn: async () => await getMyRecipes(),
    refetchInterval: 10,
  });
};

// export const useFetchSinglePost = (data:any) => {
//   console.log(data,"data in post hook")

//   return useQuery({
//     queryKey: ["SINGLE_POSTS"],
//     queryFn: async () => await getSingleRecipe(data),
//     refetchInterval: 10,
//   });
// };
// export const useFollow = (info:any) => {
//   return useQuery({
//     queryKey: ["FOLLOW_UPDATE"],
//     queryFn: async () => await checkFollow(info),
//   });
// };