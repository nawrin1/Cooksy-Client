/* eslint-disable prettier/prettier */
"use client"
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import { LuArrowDownFromLine, LuArrowUpFromLine } from "react-icons/lu";
import { FaRegBell, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

import { useVote } from "@/src/hooks/post.hook";

const Post = ({ post}) => {
  const [vote,setVote]=useState(0)
  const {mutate:handleRecipeVote,isSuccess,isPending}=useVote()
 


  console.log(vote)
  const dateCreated=post?.createdAt
  const handleVote=(votes:number)=>{
    setVote(votes)
    const voteInfo={
      vote:vote,
      recipe:post?._id
    }
    console.log(voteInfo)

    handleRecipeVote(voteInfo)
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
        <div className="flex text-[#f1a04f] gap-2 font-Peyda font-medium">
        <FaRegBell className="mt-1"/>Follow
        </div>
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
