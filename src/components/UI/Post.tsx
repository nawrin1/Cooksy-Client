/* eslint-disable prettier/prettier */
"use client"
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import { LuArrowDownFromLine, LuArrowUpFromLine, LuBellOff } from "react-icons/lu";
import { FaRegBell, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { useFollow, useVote } from "@/src/hooks/post.hook";
import { checkFollow, getUser } from "@/src/services/AuthService";
import { UserContext } from "@/src/context/user.provider";
import { useFollowUser, useUnFollowUser } from "@/src/hooks/auth.hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";

const Post = ({ post,refetch}:{post:any,refetch:any}) => {
  const queryClient = useQueryClient();
  const [vote,setVote]=useState(0)
  const {mutate:handleRecipeVote,isSuccess,isPending}=useVote()
  const context = useContext(UserContext);
  const [followData,setfollowData]=useState(false)
  const [followUnfollow,setFollowUnfollow]=useState(true)

  if (!context) {
      throw new Error("MyComponent must be used within a UserProvider");
    }
  
    const { user, isLoading, setIsLoading } = context;
    const { mutate: handleFollowUser } = useFollowUser();
    const { mutate: handleunFollowUser } = useUnFollowUser();
  // const {data}=checkFollow({current:user?._id,follow:post?.user})






  const fetchFollowData = async () => {

    console.log("inside fetch")
    try {
      const data = await checkFollow({ current: user?._id, follow: post?.user?._id });

      
      console.log(data, "hi");
      setfollowData(data?.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      console.log("innnn")
      fetchFollowData();
    }
  }, [user,post]);

// const handlefollow=async(value:any)=>{
//   setFollowUnfollow(value)
//   console.log(value,"fl/unfl")

//   if(!user){
//     toast.warning("You have to login first to follow/unfollow")

//   }
//   else if(value){
//     const followInfo={
//       currentUser:user?._id,
//       followedUser:post?.user?._id
//   }
  
//   handleFollowUser(followInfo)
//   refetch()

//   console.log("eh")
//   fetchFollowData()
//   // const data = await checkFollow({ current: user?._id, follow: post?.user?._id });
//   // console.log(data, "second");
//   // setfollowData(data?.data)



//   }

// }





 
    

  // console.log(vote)


  const handlefollow = async (value: boolean) => {
    if (!user) {
      toast.warning("You have to login first to follow/unfollow");
      return;
    }
  
    const followInfo = {
      currentUser: user?._id,
      followedUser: post?.user?._id
    };
    
    if(value){
      await handleFollowUser(followInfo);
      // queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      // refetch(); 

    }
    else{
      console.log("in un")
      await handleunFollowUser(followInfo)
      // queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      // refetch(); 
    }
    queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    refetch()
    fetchFollowData();
    
  
   
    setTimeout(() => {
      fetchFollowData();
      setFollowUnfollow(value);
      refetch(); 
    }, 600); 
  };
  
  



  const dateCreated=post?.createdAt
  const handleVote=(votes:number)=>{
    setVote(votes)
    if(!user){
      toast.warning("You have to login first to upvote/downvote")
  
    }
    else{
      const voteInfo={
      vote:vote,
      recipe:post?._id
    }
    // console.log(voteInfo)

    handleRecipeVote(voteInfo)
  }
  }
  

 



  return (
    <div className="border shadow-md w-full bg-white p-4">
  
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
  
          <Avatar src={post?.user?.image} />
          <div>
        
            <h3 className="text-sm font-semibold text-black">{post?.user?.name}</h3>
            {/* Posted Date */}
            <p className="text-xs text-gray-500">Posted on: {format(new Date(dateCreated), "dd MMM, yyyy")}</p>
          </div>
        </div>
        {/* Follow Button */}
        {/* <Button color="warning" variant="bordered" size="sm">
        <FaRegBell />Follow
        </Button> */}
        {
          user?._id==post?.user?._id ? '':<div>
          {followData?        
          <Button variant="bordered" className="flex text-[#f1a04f] gap-2 font-Peyda font-medium"
           onClick={()=>handlefollow(false)}
           onKeyDown={(e) => {
             if (e.key === "Enter" || e.key === " ") {
              handlefollow(false);
             }
           }}
           role="button"
           tabIndex={0}>
          <LuBellOff  className="mt-1"/>Unfollow
          </Button>: 

           <Button variant="bordered" className="flex text-[#f1a04f] gap-2 font-Peyda font-medium" 
          onClick={()=>handlefollow(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlefollow(true)
            }
          }}
          role="button"
          tabIndex={0}>
          <FaRegBell className="mt-1"/>Follow
          </Button> }
  
          </div>
        }
       
       

      </div>

   
      <div className="relative w-full h-auto mb-4">
        <Image
          alt="Recipe Image"
          className="rounded-lg"
          height={400}
          layout="responsive"
          objectFit="cover"
          src={post?.images[0]}
          width={700}
        />

     
        <div className="absolute bottom-0 font-Peyda  w-full bg-black bg-opacity-60 text-white p-2 flex justify-between items-end">
          <h2 className=" font-bold lg:text-3xl text-2xl">{post?.title}</h2>
          <Link href={`/dashboard/${post?._id}`}><span className="hover:text-gray-300">...See more</span></Link>
        </div>
      </div>

  
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Like Icon */}
          <button className="text-gray-500 hover:text-blue-500" onClick={()=>handleVote(1)}>
            {/* <AiOutlineLike size={24} /> */}
            <LuArrowUpFromLine size={24}/>
            
          </button>
          {/* Dislike Icon */}
          <button className="text-gray-500   hover:text-red-500" onClick={()=>handleVote(-1)}>
            {/* <AiOutlineDislike size={24} /> */}
            <LuArrowDownFromLine size={24}/>
          </button>
          {/* Comment Icon */}
          <button className="text-gray-500 hover:text-green-500">
            <AiOutlineComment size={24} />
          </button>
        </div>

        {/* Rating */}
        <div className="text-yellow-500 flex items-center">
          {/* <FaStar size={20} /> */}
          <FaRegStar  />
          <span className="ml-1">5.0</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
