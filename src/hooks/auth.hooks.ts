/* eslint-disable prettier/prettier */
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgetPassword, forgetPasswordNew, loginUser, registerUser } from "../services/AuthService";

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
