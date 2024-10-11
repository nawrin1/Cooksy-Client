"use client";

// /* eslint-disable prettier/prettier */
// "use client"
// import Image from "next/image";
// import { Avatar } from "@nextui-org/avatar";
// import parse from "html-react-parser";
// import { RxLapTimer } from "react-icons/rx";
// import { AiFillStar } from "react-icons/ai";
// import { useContext } from "react";

// import ImageGallery from "@/src/components/UI/ImageGallery";
// import { UserContext } from "@/src/context/user.provider";
// import { format } from "date-fns";

// const RecipeCard = ({posts}) => {
//     const dateCreated=posts?.createdAt
//     const context = useContext(UserContext);

//     if (!context) {
//         throw new Error("RecipeCard must be used within a UserProvider");
//     }

//     const { user, isLoading } = context;
//     console.log((user?.isPremium))

//     // If loading, show a loading message (optional)
//     // if (isLoading) {
//     //     return <div>Loading...</div>;
//     // }

//     return (
//         <div className="relative bg-white border shadow-md p-8">
//             {/* If user is not premium, show the blurry overlay */}
//             {user?.isPremium ? "":(
//                 <div className="absolute font-Peyda inset-0 flex flex-col items-center pt-56 justify-start bg-white/50 backdrop-blur-lg z-10">
//                     <p className="text-center text-lg font-semibold text-gray-600">Become a Premium member to view the full recipe details!</p>
//                     <button className="mt-4 px-4 py-2 bg-[#e3913f] text-white rounded-lg hover:bg-orange-600">
//                         Upgrade to Premium
//                     </button>
//                 </div>
//             )}

//             <h2 className="font-Peyda text-black text-3xl font-semibold mb-3">{posts?.title}</h2>
//             <div className="text-[12px] text-orange-400 flex gap-2">
//                 {posts?.tags?.map((tag:string) => <p key={tag}>#{tag}</p>)}
//             </div>

//             <Image
//                 alt={posts?.title}
//                 className="rounded-lg mb-4 object-cover w-full"
//                 height={500}
//                 src={posts?.images[0]}
//                 width={1000}
//             />

//             {/* Title, Time, and Rating Flexed with Underline */}
//             <div className="flex justify-around items-center border-1 border-[#e3913f] rounded-lg p-4 mb-4 shadow-md">
//                 {/* Cooking Time */}
//                 <div className="flex items-center text-gray-600">
//                     <RxLapTimer className="text-3xl mr-2 text-gray-700" />
//                     <div>
//                         <p className="text-sm">To Cook</p>
//                         <p className="text-lg text-red-500 font-semibold">{posts?.time}</p>
//                     </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center text-gray-600">
//                     <AiFillStar className="text-3xl mr-2 text-yellow-500" />
//                     <div>
//                         <p className="text-sm">Rating</p>
//                         <p className="text-lg text-yellow-500 font-semibold">{posts?.rating}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-gray-800 text-base leading-6 mb-28 ">
//                 {parse(posts?.description)}
//             </div>

//             <ImageGallery images={posts?.images} />

//             <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 font-Peyda">
//                 <div className="flex flex-col lg:flex-row md:flex-row items-center gap-4">
//                     {/* User Avatar */}
//                     <Avatar size="sm" src={posts?.user?.image} />
//                     <div>
//                         <h2 className="text-[#e3913f]">Recipe by</h2>
//                         <h3 className="text-lg font-serif font-semibold text-gray-800">
//                             {posts?.user?.name}
//                         </h3>
//                         <p className="text-xs text-gray-500 italic">postsed on:{format(new Date(dateCreated), "dd MMM, yyyy")}</p>
//                         <p className="text-sm text-gray-600 mt-1">{posts?.user?.bio}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RecipeCard;

/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import parse from "html-react-parser";
import { RxLapTimer } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { useContext, useState } from "react";
import { RiChatDeleteLine } from "react-icons/ri";
import ImageGallery from "@/src/components/UI/ImageGallery";
import { UserContext } from "@/src/context/user.provider";
import { format } from "date-fns";
import { FiMoreHorizontal } from "react-icons/fi"; // For the three dots
import { CiEdit } from "react-icons/ci";
import { useDeleteComment } from "@/src/hooks/auth.hooks";
import { getSingleRecipe } from "@/src/services/Post";


const RecipeCard = ({ post, recipeId }) => {
  const [posts, setposts] = useState(post);
  const dateCreated = posts?.createdAt;
  const context = useContext(UserContext);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editon, setEditOn] = useState(false);
  const { mutate: handleDelete } = useDeleteComment();

  if (!context) {
    throw new Error("RecipeCard must be used within a UserProvider");
  }

  const { user, isLoading } = context;

  const handleEditComment = (index: any) => {
    // console.log("Edit comment with ID:", commentId);
    setEdit(index);
    setEditOn(!edit);
    console.log(index);
    console.log(edit);
  };

  const handleDeleteComment = async (commentId: any) => {
    console.log("Delete comment with ID:", commentId);
     handleDelete(commentId);
     setTimeout(async() => {
        const { data } =  await getSingleRecipe(recipeId);

        console.log(data)
        setposts(data); 
      }, 600); 

  };

  const toggleCommentOptions = (commentId: any) => {
    if (selectedCommentId === commentId) {
      setSelectedCommentId(null);
      setEdit(null);
    } else {
      setSelectedCommentId(commentId);
    }
  };

  return (
    <div className="relative bg-white border shadow-md p-8">
      {/* Premium check */}
      {!user?.isPremium && (
        <div className="absolute font-Peyda inset-0 flex flex-col items-center pt-56 justify-start bg-white/50 backdrop-blur-lg z-10">
          <p className="text-center text-lg font-semibold text-gray-600">
            Become a Premium member to view the full recipe details!
          </p>
          <button className="mt-4 px-4 py-2 bg-[#e3913f] text-white rounded-lg hover:bg-orange-600">
            Upgrade to Premium
          </button>
        </div>
      )}

      {/* Recipe content */}
      <h2 className="font-Peyda text-black text-3xl font-semibold mb-3">
        {posts?.title}
      </h2>
      <div className="text-[12px] text-orange-400 flex gap-2">
        {posts?.tags?.map((tag: string) => <i key={tag}>#{tag}</i>)}
      </div>

      <Image
        alt={posts?.title}
        className="rounded-lg mb-4 object-cover w-full"
        height={500}
        src={posts?.images[0]}
        width={1000}
      />

      <div className="flex justify-around items-center border-1 border-[#e3913f] rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center text-gray-600">
          <RxLapTimer className="text-3xl mr-2 text-gray-700" />
          <div>
            <p className="text-sm">To Cook</p>
            <p className="text-lg text-red-500 font-semibold">{posts?.time}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <AiFillStar className="text-3xl mr-2 text-yellow-500" />
          <div>
            <p className="text-sm">Rating</p>
            <p className="text-lg text-yellow-500 font-semibold">
              {posts?.rating}
            </p>
          </div>
        </div>
      </div>

      <div className="text-gray-800 text-base leading-6 mb-28 ">
        {parse(posts?.description)}
      </div>

      <ImageGallery images={posts?.images} />

      <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 font-Peyda">
        <div className="flex flex-col lg:flex-row md:flex-row items-center gap-4">
          <Avatar size="sm" src={posts?.user?.image} />
          <div>
            <h2 className="text-[#e3913f]">Recipe by</h2>
            <h3 className="text-lg font-serif font-semibold text-gray-800">
              {posts?.user?.name}
            </h3>
            <p className="text-xs text-gray-500 italic">
              postsed on: {format(new Date(dateCreated), "dd MMM, yyyy")}
            </p>
            <p className="text-sm text-gray-600 mt-1">{posts?.user?.bio}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
        <div className="space-y-6">
          {posts?.comments?.map((comment, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <Avatar size="sm" src={comment?.user?.image} />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-700">
                  {comment?.user?.name}
                </h4>
                {edit == index && selectedCommentId === comment?._id ? (
                  <textarea
                    value={comment?.comment}
                    // onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border p-2 rounded flex-grow text-gray-600 bg-slate-50 font-Peyda"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{comment?.comment}</p>
                )}
              </div>

              {/* Show Edit/Delete options if the comment belongs to the logged-in user */}
              {user?._id === comment?.user?._id && (
                <div className="relative ">
                  <button
                    onClick={() => toggleCommentOptions(comment?._id)}
                    className="text-gray-600"
                  >
                    <FiMoreHorizontal className="text-xl" />
                  </button>
                  {selectedCommentId === comment?._id && (
                    <div className="absolute right-8 bottom-5  w-32 bg-white shadow-lg rounded-md">
                      <button
                        onClick={() => handleEditComment(index)}
                        className="block flex gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <CiEdit className="text-2xl pb-1 text-green-600" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment?._id)}
                        className="block flex gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <RiChatDeleteLine className="text-xl text-red-500 " />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
