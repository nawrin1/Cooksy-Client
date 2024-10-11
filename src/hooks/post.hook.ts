/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost, getAllRecipes } from "../services/Post";
import { checkFollow, recipeVote } from "../services/AuthService";



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
  return useMutation<any, Error>({
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
export const useFetchPost = () => {
  return useQuery({
    queryKey: ["POSTS"],
    queryFn: async () => await getAllRecipes(),
    refetchInterval: 10,
  });
};
// export const useFollow = (info:any) => {
//   return useQuery({
//     queryKey: ["FOLLOW_UPDATE"],
//     queryFn: async () => await checkFollow(info),
//   });
// };