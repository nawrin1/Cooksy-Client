/* eslint-disable prettier/prettier */

"use client"

import Image from 'next/image';

import '../../styles/globals.css';
import { Button } from '@nextui-org/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

import img from '../../assests/login.jpg';

import { useUserLoginHook } from "@/src/hooks/auth.hooks";
import FXForm from '@/src/components/form/FXForm';
import FXInput from '@/src/components/form/FXInput';
import loginValidationSchema from '@/src/schemas/login.schema';
import { useUser } from '@/src/context/user.provider';
import Loader from '@/src/components/UI/Loader';
import Link from 'next/link';
import ForgetPasswordModal from '@/src/components/UI/ForgetPasswordModal';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setIsLoading: userLoading } = useUser();
  
    const redirect = searchParams.get("redirect"); 
  
  
    
  
    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLoginHook();
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        handleUserLogin(data);
        userLoading(true);
    };
  
    useEffect(() => {
      if (!isPending && isSuccess) {
        if (redirect) {
          console.log("inside redirect")
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
      }
    }, [isPending, isSuccess]);

    return (
        <>
        {isPending && <Loader />}
        <div className=" h-screen flex justify-center items-center text-black">
            <div className="lg:w-[800px] lg:h-[400px] md:w-[700px] md:h-[400px] h-[300px] w-[400px] bg-[#ffd8b1] rounded-sm flex ">
                
                <div className="relative w-[50%] h-full">
                    
                    <Image alt="login" className="rounded-l-sm" layout="fill" objectFit="cover" src={img} />

                   
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}
                    <div className='overlay' />

                  
                    <div className="absolute inset-0 z-20 flex flex-col justify-around  text-center text-white  md:p-4 p-2 lg:p-4 font-Peyda">
                        <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl text-[#e3913f] font-semibold">WELCOME TO COOKSY</h2>
                        <p className=" lg:text-[18px] md:text-[15px] text-[12px]">Explore world-class recipes from chefs <br/> around the world </p>
                        </div>
                        <div className="mt-8">
                            <p className='lg:text-[12px] md:text-[12px] text-[10px]'>Do not have an account? No need to worry</p>
<Link href="/registration">                            <Button className="lg:my-2 md:my-2 mt-7  rounded-sm bg-default-900 font-semibold text-default"
              size="sm"
              type="submit">Sign Up</Button></Link>
                        </div>
                    </div>
                </div>

                
                <div className="w-[50%] h-full flex flex-col justify-center lg:p-8 md:p-8 p-10 font-Peyda">
                    <h1 className="text-[#964B00] text-2xl mb-4">Login</h1>
                    {/* <form>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-[#964B00]" htmlFor="email">Email Address</label>
                            <input
                                required
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-[#964B00]" htmlFor="password">Password</label>
                            <input
                                required
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                            />
                        </div>
                        <button
                            className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300"
                            type="submit"
                        >
                            Log In
                        </button>
                    </form> */}

<FXForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="lg:py-3 md:py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <div className="lg:py-3 md:py-3">
              <FXInput label="Password" name="password" type="password"  />
            </div>
            <div className="lg:py-3 md:py-3 ">
             {/* <p className='text-[14px] ml-1 hover:text-[#e3913f]'>Forget Password</p> */}
             <ForgetPasswordModal></ForgetPasswordModal>
            </div>

     <Button
              className="lg:mt-12 md:mt-12 mt-6 w-full rounded-md bg-default-900 font-semibold text-default "
              size="md"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginPage;
