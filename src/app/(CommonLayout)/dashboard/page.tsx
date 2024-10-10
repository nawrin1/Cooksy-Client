/* eslint-disable prettier/prettier */

"use client"
import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { SearchIcon } from "@/src/components/icons";
import Post from "@/src/components/UI/Post";
import { useFetchPost } from "@/src/hooks/post.hook";
import { getUser } from "@/src/services/AuthService";



const Dashboard = () => {
    const { register, handleSubmit, watch } = useForm();
   
    const { data, isPending, isSuccess } = useFetchPost();
    const { user, isLoading, setIsLoading } = getUser();


    console.log(user)
    // console.log("hel")
    console.log(data)

    
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    // handleSeeAll(data.search);
  };


    return (
        <div className="flex h-screen">
         
        

         
          <div className="flex-1 bg-white">
            
            <div className="sticky top-0 bg-white z-10 p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1 text-black">
                  <Input
                    {...register("search")}
                    aria-label="Search"
                    classNames={{
                      inputWrapper: "bg-white",
                      input: "text-sm text-black",
                    }}
                    placeholder="Search..."
                    size="lg"
                    startContent={
                      <SearchIcon className="pointer-events-none flex-shrink-0 " />
                    }
                    type="text"
                  />
                </div>
              </form>
            </div>

            {/* Posts */}
            <div className="p-4 overflow-auto">
              {data?.data?.map((post: any) => (
                <Post key={post?._id} post={post} />
              ))}
            </div>
          </div>
        </div>
    );
};

export default Dashboard;
