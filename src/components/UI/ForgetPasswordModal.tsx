/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXModal from "../modals/FXModals";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";

import forgetValidationSchema from "@/src/schemas/forgetpassword.schema";
import { useForgetPassword } from "@/src/hooks/auth.hooks";



interface IProps {
  email: string;
}

const ForgetPasswordModal = () => {

    const { mutate: handleForgetPassword, isPending, isSuccess } = useForgetPassword();
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        handleForgetPassword(data);
        // userLoading(true);
    };

  return (
    <FXModal
      buttonClassName="flex-1 text-left text-[#964B00] "
      buttonText="Forget Password"
      title="Forget Password"
      
    >
      <div>
        Enter your email below. You will receive a mail to reset password of your account.
      </div>
      <FXForm
            resolver={zodResolver(forgetValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="Email" name="email" type="email"  required={true}/>
            </div>
            
            

            <Button className="w-full " type="submit">Submit</Button>
          </FXForm>
    </FXModal>
  );
};

export default ForgetPasswordModal;