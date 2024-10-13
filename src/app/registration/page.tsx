/* eslint-disable prettier/prettier */

"use client"

import Image from 'next/image';

import '../../styles/globals.css';
import { Button } from '@nextui-org/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

import img from '../../assests/register.jpg';

import { useUserLoginHook, useUserRegistration } from "@/src/hooks/auth.hooks";
import FXForm from '@/src/components/form/FXForm';
import FXInput from '@/src/components/form/FXInput';

import Loader from '@/src/components/UI/Loader';
import Link from 'next/link';
import registerValidationSchema from '@/src/schemas/register.schema';

const RegisterPage = () => {
    
    const router = useRouter();
   
  
    
  
  
    
  
    const { mutate: handleUserRegistration, isPending, isSuccess } = useUserRegistration();
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
       
        handleUserRegistration(data);
        
    };
  
    useEffect(() => {
      if (!isPending && isSuccess) {

          router.push("/login");
        
      }
    }, [isPending, isSuccess]);

    return (
        <>
        {isPending && <Loader />}
        <div className=" h-screen flex justify-center items-center text-black">
            <div className="lg:w-[800px] lg:h-[400px] md:w-[700px] md:h-[400px] h-[400px] w-[400px] bg-[#ffd8b1] rounded-sm flex shadow-lg">
                
                <div className="relative w-[50%] h-full">
                    
                    <Image alt="login" className="rounded-l-sm" layout="fill" objectFit="cover" src={img} />

                   
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}
                    <div className='overlay' />

                  
                    <div className="absolute inset-0 z-20 flex flex-col justify-between  text-center text-white  md:p-4 p-2 lg:p-4 font-Peyda">
                        <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl text-[#e3913f] font-semibold">WELCOME TO COOKSY</h2>
                        <p className=" lg:text-[18px] md:text-[15px] text-[12px]">Start exploring the recipes all around the world <br/> through registering now</p>
                        </div>
                        <div className="mt-8">
                            <p className='lg:text-[12px] md:text-[12px] text-[10px]'>Already have an account?</p>
<Link href="/login">                            <Button className="lg:my-2 md:my-2 mt-3 lg:mb-0 md:mb-0 mb-4  rounded-sm bg-default-900 font-semibold text-default"
              size="sm"
              type="submit">Sign In</Button></Link>
                        </div>
                    </div>
                </div>

                
                <div className="w-[50%] h-full flex flex-col justify-center p-8 font-Peyda">
                    <h1 className="text-[#964B00] text-2xl mb-4">Sign Up</h1>
                    
                    

<FXForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="">
              <FXInput label="Name" name="name" type="text" required={true} />
            </div>
            <div className="">
              <FXInput label="Bio" name="bio" type="text"  required={true} />
            </div>
            <div className="">
              <FXInput label="Email" name="email" type="email"  required={true}/>
            </div>
            <div className="">
              <FXInput label="Password" name="password" type="password" required={true}  />
            </div>
            <div className="">
              <FXInput label="Image" name="image" type="text"  required={true} />
            </div>

            <Button
              className="lg:mt-12 md:mt-12 mt-6 w-full rounded-md bg-default-900 font-semibold text-default "
              size="md"
              type="submit"
            >
              Sign Up
            </Button>
          </FXForm>
                </div>
            </div>
        </div>
        </>
    );
};

export default RegisterPage;
