/* eslint-disable prettier/prettier */
"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useForgetPasswordNew } from "@/src/hooks/auth.hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ForgetPassword = () => {
  const search = useSearchParams();

//   console.log(search, "from forget");
  const email=(search.get("email"));
  const token=(search.get("token"));
  const { mutate: handleForgetPasswordNew, isPending, isSuccess } = useForgetPasswordNew();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    const newData={
        token:token,
        newPasswordInfo:{
        email:email,
        newPassword:data?.password}
    }
    // console.log(newData)
    handleForgetPasswordNew(newData);
    
};

  return (
    <div className="forget h-screen flex items-center ">
      
      <div className="lg:w-[500px] md:w-[500px] w-[400px] h-[400px] backdrop-blur-md bg-black/40 mx-auto rounded-md p-7">

      {/* <h2 className="text-2xl">Forget Password</h2>
      <FXForm
            // resolver={zodResolver(forgetValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="New Password" name="password" type="text" />
            </div>
            
            

            <Button className="w-full" type="submit">Submit</Button>
          </FXForm> */}

<h2 className="text-3xl text-white font-bold mb-6 text-center">Reset Your Password</h2>
    
    <p className="text-gray-300 text-center mb-8">
      Please enter your new password below to regain access to your account.
    </p>
    
    <FXForm onSubmit={onSubmit}>
      <div className="py-3">
        <FXInput label="New Password" name="password" type="password" required={true} />
      </div>
      
     
      
      <Button className="w-full mt-4 bg-[#e3913f] hover:bg-[#a26a33] text-white py-2 rounded-md transition duration-300" type="submit">
        Submit
      </Button>
    </FXForm>
    
    <p className="text-center mt-4 text-gray-400">
      <Link href="/login" className="text-white hover:underline">Back to Login</Link>
    </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
