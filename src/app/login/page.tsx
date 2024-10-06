/* eslint-disable prettier/prettier */

"use client"

import Image from 'next/image';

import '../../styles/globals.css';
import img from '../../assests/login.jpg';

import { useUserLogin, useUserLoginHook } from "@/src/hooks/auth.hooks";
import { Button } from '@nextui-org/button';
import FXForm from '@/src/components/form/FXForm';
import { zodResolver } from "@hookform/resolvers/zod";
import FXInput from '@/src/components/form/FXInput';
import loginValidationSchema from '@/src/schemas/login.schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useUser } from '@/src/context/user.provider';
import Loader from '@/src/components/UI/Loader';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setIsLoading: userLoading } = useUser();
  
    const redirect = searchParams.get("redirect"); 
  
  
    
  
    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLoginHook();
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    //   handleUserLogin(data);
    //   userLoading(true);
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
            <div className="w-[800px] h-[400px]  bg-white rounded-sm flex shadow-lg">
                
                <div className="relative w-[50%] h-full">
                    
                    <Image alt="login" className="rounded-l-sm" layout="fill" objectFit="cover" src={img} />

                   
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}
                    <div className='overlay' />

                  
                    <div className="absolute inset-0 z-20 flex flex-col justify-around  text-center text-white p-4 font-Peyda">
                        <div>
                        <h2 className="text-4xl text-[#e3913f] font-semibold">WELCOME TO COOKSY</h2>
                        <p className=" ">Explore world-class recipes from chefs <br/> around the world</p>
                        </div>
                        <div className="mt-8">
                            <p>Do not have an account? No need to worry</p>
                            <Button className="my-2  rounded-sm bg-default-900 font-semibold text-default"
              size="sm"
              type="submit">Sign Up</Button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-[50%] h-full flex flex-col justify-center p-8 font-Peyda">
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
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" type="password"  />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
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
