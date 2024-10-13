/* eslint-disable prettier/prettier */
"use client"

import { useContext, useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { Avatar } from "@nextui-org/avatar";

import { UserContext } from "@/src/context/user.provider";
import { getUserFromDB } from "@/src/services/AuthService";

const UserSidebar = () => {
    const contentFromDB = '<p>helloo</p><p>hiii<br></p>';
    const [userInfo,setUser]=useState<any>({})
    // const { user,isLoading,setIsLoading } = useUser();

    const context = useContext(UserContext);

    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
      }
    
      const { user, isLoading, setIsLoading } = context;
      console.log(user)

    // useEffect(() => {
    //     if(isLoading || !user){
    //         setUserInfo(false)
    //     }
    //     else if(!isLoading && user){
    //         setUserInfo(true)
    //     }

       
    //   }, []);

    useEffect(() => {
        const fetchUser = async () => {
          if (user?._id) {
            try {
              const data = await getUserFromDB(user._id);
    
              setUser(data?.data);
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }
        };
    
        fetchUser();
      }, [user]);
    //   console.log(user)

    return (
        <>{
            user?        <div className="max-w-sm mx-auto  shadow-lg  overflow-hidden h-screen pt-10">
            <div className=" mx-auto flex items-center justify-center  w-[130px] h-[130px] rounded-full ">
                {/* <Image className="rounded-full "  width={200} height={180} alt="user profile" src={user?.image}/> */}
                <Avatar isBordered className="w-20 h-20 text-large" color="warning" src={userInfo?.image} />
        
        
            </div>
            <div className="ml-4 flex justify-center">
            {/* <div dangerouslySetInnerHTML={{ __html: contentFromDB }} /> */}
                {/* {user?.name} */}
                    <h2 className="text-xl font-semibold text-black font-Peyda text-center">{userInfo?.name}</h2>
                    <p className=" text-xl pt-1 text-[#e3913f]"><CiForkAndKnife /></p>
                    {/* <p className="text-gray-300 text-sm">{user?.role}</p> */}
                </div>
            <div className="px-6 py-4">
                <i className="text-[#964B00] font-Peyda text-center">
                &quot; {user?.bio} &quot;
                </i>
               
            </div>
        </div>:""
        }
        


        </>
    );
};

export default UserSidebar;