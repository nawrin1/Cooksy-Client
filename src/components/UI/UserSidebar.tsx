/* eslint-disable prettier/prettier */
"use client"

import { useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";

import { useUser } from "@/src/context/user.provider";
import Loader from "./Loader";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";

const UserSidebar = () => {
    const contentFromDB = '<p>helloo</p><p>hiii<br></p>';
    const [userInfo,setUserInfo]=useState(false)
    const { user,isLoading,setIsLoading } = useUser();

    useEffect(() => {
        if(isLoading || !user){
            setUserInfo(false)
        }
        else if(!isLoading && user){
            setUserInfo(true)
        }

       
      }, []);
      console.log(user)

    return (
        <>{
            user?        <div className="max-w-sm mx-auto  shadow-lg  overflow-hidden h-screen pt-10">
            <div className=" mx-auto flex items-center justify-center  w-[130px] h-[130px] rounded-full ">
                {/* <Image className="rounded-full "  width={200} height={180} alt="user profile" src={user?.image}/> */}
                <Avatar isBordered color="warning" src={user?.image} className="w-20 h-20 text-large" />
        
        
            </div>
            <div className="ml-4 flex justify-center">
            {/* <div dangerouslySetInnerHTML={{ __html: contentFromDB }} /> */}
                {/* {user?.name} */}
                    <h2 className="text-xl font-semibold text-black font-Peyda text-center">{user?.name}</h2>
                    <p className=" text-xl pt-1 text-[#e3913f]"><CiForkAndKnife /></p>
                    {/* <p className="text-gray-300 text-sm">{user?.role}</p> */}
                </div>
            <div className="px-6 py-4">
                <i className="text-[#964B00] font-Peyda text-center">
                   " {user?.bio} "
                </i>
               
            </div>
        </div>:""
        }
        


        </>
    );
};

export default UserSidebar;