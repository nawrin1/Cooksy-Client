/* eslint-disable prettier/prettier */
"use server"
import React from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import parse from "html-react-parser";
import { RxLapTimer } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";

import { getSingleRecipe } from "@/src/services/Post";
import ImageGallery from "@/src/components/UI/ImageGallery";
import { UserContext } from "@/src/context/user.provider";
import { getUser } from "@/src/services/AuthService";
import RecipeCard from "@/src/components/UI/RecipeCard";

// import LightGallery from "lightgallery/react";

// LightGallery styles
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";

const Recipe = async ({ params: { recipeId } }: any) => {
  console.log(recipeId);
  const { data: post } = await getSingleRecipe(recipeId);

 

 


//   console.log(post);

  return (
    <>
    <RecipeCard post={post} recipeId={recipeId}/></>

  );
};

export default Recipe;
