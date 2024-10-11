/* eslint-disable prettier/prettier */
"use client"
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import parse from "html-react-parser";
import { RxLapTimer } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { useContext } from "react";

import ImageGallery from "@/src/components/UI/ImageGallery";
import { UserContext } from "@/src/context/user.provider";
import { format } from "date-fns";

const RecipeCard = ({post}) => {
    const dateCreated=post?.createdAt
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("RecipeCard must be used within a UserProvider");
    }

    const { user, isLoading } = context;
    console.log((user?.isPremium))

    // If loading, show a loading message (optional)
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="relative bg-white border shadow-md p-8">
            {/* If user is not premium, show the blurry overlay */}
            {user?.isPremium ? "":(
                <div className="absolute font-Peyda inset-0 flex flex-col items-center pt-56 justify-start bg-white/50 backdrop-blur-lg z-10">
                    <p className="text-center text-lg font-semibold text-gray-600">Become a Premium member to view the full recipe details!</p>
                    <button className="mt-4 px-4 py-2 bg-[#e3913f] text-white rounded-lg hover:bg-orange-600">
                        Upgrade to Premium
                    </button>
                </div>
            )}

            <h2 className="font-Peyda text-black text-3xl font-semibold mb-3">{post?.title}</h2>
            <div className="text-[12px] text-orange-400 flex gap-2">
                {post?.tags?.map((tag:string) => <p key={tag}>#{tag}</p>)}
            </div>
            
            <Image
                alt={post?.title}
                className="rounded-lg mb-4 object-cover w-full"
                height={500}
                src={post?.images[0]}
                width={1000}
            />

            {/* Title, Time, and Rating Flexed with Underline */}
            <div className="flex justify-around items-center border-1 border-[#e3913f] rounded-lg p-4 mb-4 shadow-md">
                {/* Cooking Time */}
                <div className="flex items-center text-gray-600">
                    <RxLapTimer className="text-3xl mr-2 text-gray-700" />
                    <div>
                        <p className="text-sm">To Cook</p>
                        <p className="text-lg text-red-500 font-semibold">{post?.time}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center text-gray-600">
                    <AiFillStar className="text-3xl mr-2 text-yellow-500" />
                    <div>
                        <p className="text-sm">Rating</p>
                        <p className="text-lg text-yellow-500 font-semibold">{post?.rating}</p>
                    </div>
                </div>
            </div>

            <div className="text-gray-800 text-base leading-6 mb-28 ">
                {parse(post?.description)}
            </div>

            <ImageGallery images={post?.images} />

            <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 font-Peyda">
                <div className="flex flex-col lg:flex-row md:flex-row items-center gap-4">
                    {/* User Avatar */}
                    <Avatar size="sm" src={post?.user?.image} />
                    <div>
                        <h2 className="text-[#e3913f]">Recipe by</h2>
                        <h3 className="text-lg font-serif font-semibold text-gray-800">
                            {post?.user?.name}
                        </h3>
                        <p className="text-xs text-gray-500 italic">Posted on:{format(new Date(dateCreated), "dd MMM, yyyy")}</p>
                        <p className="text-sm text-gray-600 mt-1">{post?.user?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
