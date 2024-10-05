/* eslint-disable prettier/prettier */

"use client"

import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";


const LoginPage = () => {

    const searchParams = useSearchParams();
    

  
    const redirect = searchParams.get("redirect"); 
  
  

  
    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  
    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //   handleUserLogin(data);
    
    // };

    return (
        <div>
            <h1>Login</h1>
            
        </div>
    );
};

export default LoginPage;