/* eslint-disable prettier/prettier */
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

export default function FXSelect({
  options,
  size,
  name,
  label,
  variant = "bordered",
  color="warning"
  
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      selectionMode="multiple"
      label={label}
      variant={variant}
      color={color}
      size={size}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}