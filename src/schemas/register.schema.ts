/* eslint-disable prettier/prettier */

import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters."),
    bio: z.string().min(1, "Please enter a valid bio"),  
    image: z.string().min(1, "Please enter a valid image URL"),  
  });
  
export default registerValidationSchema;