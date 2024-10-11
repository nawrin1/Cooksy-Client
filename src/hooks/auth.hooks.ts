/* eslint-disable prettier/prettier */
import { FieldValues } from "react-hook-form";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteComment, editComment, followUser, forgetPassword, forgetPasswordNew, loginUser, recipeComment, registerUser, unfollowUser } from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLoginHook = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: () => {
      toast.success("Reset Link Sent Successfully. Check Email");
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
export const useFollowUser = () => {
  const queryClient = useQueryClient();
 
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (followData) => {
    
      
      await followUser(followData)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      toast.success("Follow Status Updated");

      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};



export const useComment = () => {
  const queryClient = useQueryClient();
 
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentData) => {
    
      
      await recipeComment(commentData)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      toast.success("Comment Added.See details to check your comment");

      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
 
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentId) => {
      console.log(commentId,"del hook")
    
      
      await deleteComment(commentId)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      toast.success("Comment Deleted");

      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
export const useEditComment = () => {
  const queryClient = useQueryClient();
 
  return useMutation<any, Error, { commentId: string; newComment: string }>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentInfo:{ commentId: string; newComment: string }) => {
      // console.log(commentId,"edit hook")
    
      
      await editComment(commentInfo)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      toast.success("Comment Edited");

      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};





export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
 
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UnFOLLOW_USER"],
    mutationFn: async (unfollowData) => {
    
      
      await unfollowUser(unfollowData)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      toast.success("UnFollow Status Updated");

      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
export const useForgetPasswordNew = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGET_PASSWORD_NEW"],
    mutationFn: async (userData) => await forgetPasswordNew(userData),
    onSuccess: () => {
      toast.success("Password updated Successfully");
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message);
    },
  });
};
