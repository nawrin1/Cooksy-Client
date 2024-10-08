/* eslint-disable prettier/prettier */
import { z } from "zod";

const forgetValidationSchema = z.object({
    email: z.string().trim().email("Please enter a valid email"),
   
      
  });

  export default forgetValidationSchema;