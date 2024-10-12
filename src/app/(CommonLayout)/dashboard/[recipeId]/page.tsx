/* eslint-disable prettier/prettier */





import { getSingleRecipe } from "@/src/services/Post";
import RecipeCard from "@/src/components/UI/RecipeCard";



const Recipe = async({ params: { recipeId } }: any) => {
  console.log(recipeId);
  // const[post,setPost]=useState(null)

  const { data: post } =  await getSingleRecipe(recipeId);
  // const {data:post}=useFetchSinglePost(recipeId)
  // console.log(post,"recipe details")
  // useEffect(()=>{
  //   const handlerecipe=async()=>{
  //     const data=await getSingleRecipe(recipeId)

  //     console.log(data)
  //     setPost(data)

  //   }

  //   handlerecipe()

  // },[recipeId])

 

 


  console.log(post);

  return (
    <>
    <RecipeCard post={post} recipeId={recipeId}/></>

  );
};

export default Recipe;
