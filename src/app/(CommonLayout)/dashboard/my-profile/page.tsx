// /* eslint-disable prettier/prettier */
// "use client";

// import { UserContext } from "@/src/context/user.provider";
// import { useMyRecipe } from "@/src/hooks/post.hook";
// import { getUserFromDB } from "@/src/services/AuthService";
// import { useContext, useEffect, useState } from "react";

// const Profile = () => {
//   const context = useContext(UserContext);
//   const [userData, setUser] = useState<any>(null);

//   if (!context) {
//     throw new Error("My Profile must be used within a UserProvider");
//   }

//   const { user, isLoading } = context;
//   const {data:recipe}=useMyRecipe()
//   console.log(recipe?.data,'recipe')

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (user?._id) {
//         try {
//           const data = await getUserFromDB(user._id);

//           setUser(data?.data);
//         //   console.log(data, "user");
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, [user]);

//   console.log(userData,"user")

//   return (
//     <div>
//       <h2>Profile</h2>
//     </div>
//   );
// };

// export default Profile;



/* eslint-disable prettier/prettier */

"use client";

import { UserContext } from "@/src/context/user.provider";
import { useMyRecipe } from "@/src/hooks/post.hook";
import { getUserFromDB } from "@/src/services/AuthService";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const context = useContext(UserContext);
  const [userData, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("recipes"); 

  if (!context) {
    throw new Error("My Profile must be used within a UserProvider");
  }

  const { user, isLoading } = context;
  const { data: recipe } = useMyRecipe();

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


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile p-6 font-Peyda text-black">
      {/* <h2 className="text-3xl font-bold mb-4">Profile</h2> */}

      {userData ? (
        <div className="user-info mt-4">
          <div className="flex items-center gap-6">
            <Image
              src={userData.image}
              alt={`${userData.name}'s profile`}
              className="rounded-full w-24 h-24"
              width={96}
              height={96}
            />
            <div>
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-gray-600">{userData.bio}</p>
              <p className="text-sm text-gray-500">Email: {userData.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

     
      <hr className="my-6 border-gray-300" />

  
      <div className="tabs mt-6 flex gap-6 text-lg">
            <div
        className={`cursor-pointer pb-2 ${
            activeTab === "recipes"
            ? "border-b-2 border-orange-800 text-orange-800"
            : "text-gray-500"
        }`}
        role="button" 
        tabIndex={0} 
        onClick={() => handleTabChange("recipes")}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleTabChange("recipes");
        }} 
        >
        My Recipes
        </div>

                    <div
            className={`cursor-pointer pb-2 ${
                activeTab === "followers"
                ? "border-b-2 border-orange-800 text-orange-800"
                : "text-gray-500"
            }`}
            role="button" 
            tabIndex={0} 
            onClick={() => handleTabChange("followers")}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleTabChange("followers");
            }} 
            >
            Followers ({userData?.follower.length})
            </div>

            <div
            className={`cursor-pointer pb-2 ${
                activeTab === "following"
                ? "border-b-2 border-orange-800 text-orange-800"
                : "text-gray-500"
            }`}
            role="button"
            tabIndex={0} 
            onClick={() => handleTabChange("following")}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleTabChange("following");
            }}
            >
            Following ({userData?.following.length})
            </div>

      </div>

      <div className="tab-content mt-6">
       
        {activeTab === "recipes" && (
          <div className="recipe-cards">
            {recipe && recipe?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipe?.data?.map((item: any) => (
                  <div
                    key={item._id}
                    className="recipe-card border p-4 rounded-lg shadow-md"
                  >
                    <Image
                      src={item?.images[0]}
                      alt={item?.title}
                      className="w-full h-40 object-cover rounded"
                      width={100}
                      height={100}
                    />
                    <h4 className="text-lg font-semibold mt-2">{item?.title}</h4>
                    <p className="text-gray-600">{item?.time}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recipes posted yet.</p>
            )}
          </div>
        )}

      
        {activeTab === "followers" && (
          <div className="follower-list">
            <h3 className="text-xl font-semibold">Followers List</h3>
            {userData?.follower.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {userData.follower.map((follower: any) => (
                  <li key={follower._id} className="flex items-center space-x-4">
                    <Image
                      src={follower?.image} 
                      alt={follower?.name}
                      className="w-10 h-10 rounded-full"
                      height={10}
                      width={10}
                    />
                    <span>{follower?.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No followers yet.</p>
            )}
          </div>
        )}

      
        {activeTab === "following" && (
          <div className="following-list">
            <h3 className="text-xl font-semibold">Following List</h3>
            {userData?.following.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {userData.following.map((following: any) => (
                  <li
                    key={following._id}
                    className="flex items-center space-x-4"
                  >
                    <Image
                      src={following?.image} 
                      alt={following?.name}
                      className="w-10 h-10 rounded-full"
                      height={10}
                      width={10}
                    />
                    <span>{following?.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No following yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
