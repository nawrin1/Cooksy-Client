/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/modal";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { getUserFromDB } from "@/src/services/AuthService";
import { useMyRecipe } from "@/src/hooks/post.hook";
import { UserContext } from "@/src/context/user.provider";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";
import { useEditProfile, useResetPassword } from "@/src/hooks/auth.hooks";
import { profile } from "console";

const Profile = () => {
  const context = useContext(UserContext);
  const [userData, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("recipes"); 
  const { isOpen: isResetOpen, onOpen: onResetOpen, onOpenChange: onResetOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const {mutate:handleReset}=useResetPassword()
  const {mutate:handleEditProfile}=useEditProfile()
  // const {register,handleSubmit,formState: { errors }}=useForm()
  const methods = useForm();

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

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    // console.log(data?.newpassword,userData)
    const resetInfo={
      password:data?.newpassword,
      user:userData?._id
    }
   
     handleReset(resetInfo)

  //  console.log(resetInfo)
  }

  const onEditSubmit:SubmitHandler<FieldValues>=(data)=>{
    // console.log(data)
    const profileUpdate={
     id:userData?._id,
     ...data

    }
    handleEditProfile(profileUpdate)
    setTimeout(()=>{
      console.log("inside")
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


    },100)
    // console.log(profileUpdate)
  }



  return (
    <div className="profile p-6 font-Peyda text-black">
      {/* Profile Information */}
      {userData ? (
        <div className="user-info mt-4">
          <div className="flex items-center gap-6">
            <Image
              alt={`${userData.name}'s profile`}
              className="rounded-full w-24 h-24"
              height={96}
              src={userData.image}
              width={96}
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

      {/* Edit Profile and Reset Password Buttons */}
      <div className='flex space-x-4 mb-6 relative lg:left-[16%] md:left-[21%] left-[29%] mt-6 font-Peyda'>
        <Button className='border-2 text-black py-2 px-4 bg-white rounded-sm hover:bg-slate-200' onPress={onEditOpen}>Edit Profile</Button>
        <Button className='border-2 bg-white text-black py-2 px-4 rounded-sm hover:bg-slate-200' onPress={onResetOpen}>Reset Password</Button>
        
        {/* Edit Profile Modal */}
        <Modal
          backdrop="opaque" 
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }} 
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <h2 className="text-center font-Peyda pt-4">Edit Profile</h2>
                <ModalBody>
                <FXForm onSubmit={onEditSubmit}>
      <div className="py-3">
        <FXInput label=" Name" name="name" type="text"  required={true} defaultValue={userData?.name}/>
      </div>
      <div className="py-3">
        <FXInput label=" Email" name="email" type="text"  required={true} defaultValue={userData?.email}/>
      </div>
      <div className="py-3">
        <FXInput label=" Password" name="password" type="text" required={true} defaultValue={userData?.password} />
      </div>
      <div className="py-3">
        <FXInput label="Bio" name="bio" type="text"  required={true} defaultValue={userData?.bio}/>
      </div>
      <div className="py-3">
        <FXInput label="Image" name="image" type="text"  required={true} defaultValue={userData?.image}/>
      </div>
      
     
      
      <Button className="w-full mt-4 bg-[#e3913f] hover:bg-[#a26a33] text-white py-2 rounded-md transition duration-300" type="submit">
        Edit Profile
      </Button>
    </FXForm>
                 
                </ModalBody>
                <ModalFooter>
                  
                  <Button className='py-2 px-4 rounded-sm hover:bg-slate-200' color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Reset Password Modal */}
       
  <Modal
    backdrop="opaque"
    classNames={{
      backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
    }}
    isOpen={isResetOpen}
    onOpenChange={onResetOpenChange}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <h2 className="text-center font-Peyda pt-4">Reset Password</h2>
          <ModalBody className="font-Peyda">
          <FXForm onSubmit={onSubmit}>
      <div className="py-3">
        <FXInput label="Reset Password" name="newpassword" type="text"  required={true}/>
      </div>
      
     
      
      <Button className="w-full mt-4 bg-[#e3913f] hover:bg-[#a26a33] text-white py-2 rounded-md transition duration-300" type="submit">
        Submit
      </Button>
    </FXForm>
          </ModalBody>

          <ModalFooter>
           
            <Button
              className="py-2 px-4 rounded-sm hover:bg-slate-200"
              color="danger"
              variant="light"
              onPress={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>


        
      </div>

      {/* Tabs for Recipes, Followers, and Following */}
      <hr className="my-6 border-gray-300" />
      <div className="tabs mt-6 flex gap-6 text-lg">
        <div
          className={`cursor-pointer pb-2 ${
            activeTab === "recipes" ? "border-b-2 border-orange-800 text-orange-800" : "text-gray-500"
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
            activeTab === "followers" ? "border-b-2 border-orange-800 text-orange-800" : "text-gray-500"
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
            activeTab === "following" ? "border-b-2 border-orange-800 text-orange-800" : "text-gray-500"
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

      {/* Tab Content */}
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
                      alt={item?.title}
                      className="w-full h-40 object-cover rounded"
                      height={100}
                      src={item?.images[0]}
                      width={100}
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
                      alt={follower.name}
                      className="w-10 h-10 rounded-full"
                      height={40}
                      src={follower.image}
                      width={40}
                    />
                    <span>{follower.name}</span>
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
                  <li key={following._id} className="flex items-center space-x-4">
                    <Image
                      alt={following.name}
                      className="w-10 h-10 rounded-full"
                      height={40}
                      src={following.image}
                      width={40}
                    />
                    <span>{following.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not following anyone yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

