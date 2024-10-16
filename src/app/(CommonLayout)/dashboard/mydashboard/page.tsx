/* eslint-disable prettier/prettier */
"use client"

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { CiEdit } from 'react-icons/ci';
import { FaEllipsisV } from 'react-icons/fa'; 
import { RiChatDeleteLine } from 'react-icons/ri';
import { Avatar } from '@nextui-org/avatar';

import { UserContext } from '@/src/context/user.provider';
import { useDeleteRecipe, useMyRecipe } from '@/src/hooks/post.hook';
import { getUserFromDB } from '@/src/services/AuthService';

const Profile = () => {
    const context = useContext(UserContext);
    const [userData, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("recipes");
    const [showOptions, setShowOptions] = useState<string | null>(null); 
    const {mutate:handleDeleteRecipe}=useDeleteRecipe()

    const toggleOptions = (id: string) => {
        setShowOptions((prev) => (prev === id ? null : id)); // Toggle per card
    };

    if (!context) {
        throw new Error("My Profile must be used within a UserProvider");
    }

    const { user, isLoading } = context;
    const { data: recipe,refetch } = useMyRecipe();

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


    const handleDelete=(id:any)=>{
        console.log(id)
        const recipeId={
            id:id
        }
        handleDeleteRecipe(recipeId)
        refetch()


    }

    return (
        <div className='text-black p-6 font-Peyda'>
            <div className='flex items-center mb-6 gap-4'>
                <Avatar size="lg" src={userData?.image} />
                <div className='flex-grow'>
                    <h1 className='text-2xl font-bold'>
                        {userData?.name || "Username"}
                        {userData?.isPremium && (
                            <span className="ml-2 bg-yellow-300 text-yellow-800 text-sm font-semibold rounded px-2 py-1">
                                Premium
                            </span>
                        )}
                    </h1>
                    <div className='flex space-x-4'>
                        <span><strong>{recipe?.data?.length || 0}</strong> Posts</span>
                        <span><strong>{userData?.follower?.length || 0}</strong> Followers</span>
                        <span><strong>{userData?.following?.length || 0}</strong> Following</span>
                    </div>
                </div>
            </div>

            {/* Recipes Section */}
            <h2 className='text-xl font-semibold mb-4 text-[#964B00] pt-10'>Your Recipes</h2>
            <div className="recipe-cards">
                {recipe && recipe?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipe?.data?.map((item: any) => (
                            <div key={item?._id} className="relative recipe-card border p-4 rounded-lg shadow-md">
                                <Image
                                    alt={item?.title}
                                    className="w-full h-40 object-cover rounded"
                                    height={100}
                                    src={item?.images[0]}
                                    width={100}
                                />
                                <h4 className="text-lg font-semibold mt-2">{item?.title}</h4>
                                <p className="text-gray-600">{item?.time}</p>
                                {/* Three-dot button */}
                                <button
                                    className='absolute top-2 right-[2px] text-gray-600'
                                    onClick={() => toggleOptions(item?._id)} 
                                >
                                    <FaEllipsisV />
                                </button>
                                {showOptions === item?._id && ( 
                                    <div className="absolute top-10 right-2 bg-white border rounded shadow-lg p-2">
                                        <button className="block w-full text-left gap-2 p-1 hover:bg-gray-100 flex" >
                                            <CiEdit className="text-2xl pb-1 text-green-600" />
                                            Edit
                                        </button>
                                        <button className="block w-full text-left p-1 hover:bg-gray-100 text-red-600 flex gap-2 "onClick={()=>handleDelete(item?._id)} >
                                            <RiChatDeleteLine className="text-xl text-red-500 pt-1 " />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No recipes posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
