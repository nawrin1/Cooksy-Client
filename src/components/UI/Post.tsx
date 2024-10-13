/* eslint-disable prettier/prettier */
"use client"
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import { LuArrowDownFromLine, LuArrowUpFromLine, LuBellOff } from "react-icons/lu";
import { FaRegBell, FaRegStar, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { EventHandler, useContext, useEffect, useState } from "react";

import {  useVote } from "@/src/hooks/post.hook";
import { checkFollow, getUser } from "@/src/services/AuthService";
import { UserContext } from "@/src/context/user.provider";
import { useComment, useFollowUser, useRate, useUnFollowUser } from "@/src/hooks/auth.hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Rating } from '@smastrom/react-rating'





import '@smastrom/react-rating/style.css'
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

const Post = ({ post,refetch}:{post:any,refetch:any}) => {
  const queryClient = useQueryClient();
  const [vote,setVote]=useState(0)
  const {mutate:handleRecipeVote,isSuccess,isPending}=useVote()
  const context = useContext(UserContext);
  const [followData,setfollowData]=useState(false)
  const [followUnfollow,setFollowUnfollow]=useState(true)
  const [showCommentSection, setShowCommentSection] = useState(false);
  // const [comments, setComments] = useState(""); // State for comments
  const [newComment, setNewComment] = useState("");
  const [visibleRate,setVisibleRate]=useState(false)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const {mutate:handleRecipeComment}=useComment()
  const [rating, setRating] = useState(0)
  const {mutate:handleRateMutate}=useRate()

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
      handleFollowUser(followInfo);
      // queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      // refetch(); 

    }
    else{
      console.log("in un")
      handleunFollowUser(followInfo)
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


  const handleCommentToggle = () => {
    setShowCommentSection((prev) => !prev); 
    
  };


  const handleCommentSubmit = (e:any) => {

    if(!user){
      toast.warning("You have to login first to comment")
      return
    }
    e.preventDefault();
    // setComments(newComment)
    console.log(newComment)
    const commentData={
      recipe:post?._id,
      user:user?._id,
      comment:newComment
    }
    handleRecipeComment(commentData)

    setNewComment('')
    // if (newComment.trim()) {
    //   setComments((prev) => [...prev, newComment]); // Add new comment to state
    //   setNewComment(""); // Clear input
    // }
  };

  const handleRate=(id:string)=>{
    if(!user){
      toast.warning("You have to login first to rate")
      return
  
    }
    const rateInfo={
      id:id,
      rate:Number(rating)
    }

    // console.log(rateInfo)
    handleRateMutate(rateInfo)
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
          <button className="text-gray-500 hover:text-green-500"  onClick={handleCommentToggle}>
            <AiOutlineComment size={24} />
          </button>
        </div>

        {/* Rating */}


        {/* <div
          role="button" 
          tabIndex={0} 
          className="text-yellow-500 flex items-center"
          onClick={() => setVisibleRate(!visibleRate)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setVisibleRate(!visibleRate);
            }
          }}
          aria-expanded={visibleRate} 
        >
                 
          <FaRegStar  />
          <span className="ml-1">5.0</span>
         
        </div> */}



<Button onPress={onOpen} color="warning" variant="bordered"><FaRegStar  />Rate</Button>
      <Modal
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rate My Post</ModalHeader>
              <ModalBody>
             
             <div className="w-full flex justify-center"> <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} /></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button  onPress={onClose} color="warning" onClick={()=>handleRate(post?._id)}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>





      {showCommentSection && (
       <div className="mt-4">
       <form onSubmit={handleCommentSubmit} className="flex bg-white p-4 rounded shadow-md">
         <textarea
           value={newComment}
           onChange={(e) => setNewComment(e.target.value)}
           placeholder="Add a comment..."
           className="border p-2 rounded flex-grow text-gray-600 bg-slate-50 font-Peyda"
           rows={2}
         />
         <Button 
           type="submit" 
           className="ml-2 flex items-center justify-center bg-white text-black text-2xl rounded p-2"
         >
           <FaTelegramPlane />
         </Button>
       </form>
     </div>




     )}
    </div>
  );
};

export default Post;
