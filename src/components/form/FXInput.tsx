/* eslint-disable prettier/prettier */
"use client";

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}
export default function FXInput({
  variant = "underlined",
  size = "sm",
  required = false,
  type = "text",
  label,
  name,
  color="warning",
}: IProps) {
  const {
    register,
    formState: { errors }, 
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]} 
      label={label}
      color={color}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
