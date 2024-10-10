/* eslint-disable prettier/prettier */

"use client"

import { GiNotebook } from "react-icons/gi";
import { Button } from "@nextui-org/button";
import JoditEditor from "jodit-react";
import { ChangeEvent, useRef, useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IoMdImages } from "react-icons/io";

import FXSelect from "@/src/components/form/FXSelect";
import { useUser } from "@/src/context/user.provider";
import FXInput from "@/src/components/form/FXInput";
import { tags } from "@/src/constant";
import { useCreatePost } from "@/src/hooks/post.hook";

const Post = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
    const { user } = useUser();
    const methods = useForm();
    const {
        mutate: handleCreatePost,
        isPending: createPostPending,
        isSuccess,
      } = useCreatePost();

    const { control, handleSubmit } = methods;

    console.log(content)

    const config = {
        readonly: false, 
        placeholder: 'Add Ingredients and Description here...'
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setImageFiles((prev) => [...prev, file]);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => { 
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file); 
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData();
        const postData = {
            ...data,
            description:content,
            rating:"5",
            user: user!._id,
            vote:0
        };

        formData.append("data", JSON.stringify(postData)); 
        console.log(postData);

        for (let image of imageFiles) {
            formData.append("file", image); 
        }
        console.log(formData.get("data"));
        console.log(formData.get("file"));

        handleCreatePost(formData);
    };

    return (
        <div className=" text-black flex items-center justify-center font-Peyda ">
            <div className="bg-white shadow-xl p-6 max-w-4xl w-full">
                <div className="flex text-black ">
                <h2 className="text-3xl font-bold text-center mb-8 font-Peyda">Add Your Recipe</h2>
                <GiNotebook className="text-2xl mt-2"/>
                </div>
                <FormProvider {...methods}>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-wrap gap-2 py-2 overflow-x-hidden ">
                    <div className="min-w-fit flex-1">
                    <FXInput label="Title" name="title" variant="underlined" />
                    </div>
                    <div className="min-w-fit flex-1">
                    <FXInput label="Cooking Time" name="time" variant="underlined" />
                    </div>

                    </div>
                    <div className="flex flex-wrap gap-2 py-2 overflow-x-hidden ">
                    <div className="min-w-fit flex-1 text-black overflow-x-hidden">
                    <FXSelect label="Tags" name="tags" options={tags} size="sm" variant="underlined"/>
                    </div>

                    {/* <div className="min-w-fit flex-1 text-black overflow-x-hidden">
                    <FXInput label="Rating" name="rating" variant="underlined" />
                    
                    </div> */}
                    </div>
                        
                       
                        <div className="mt-4">
                            <p className="block text-lg font-medium text-[#e3913f]">Description</p>
                            <JoditEditor
                                ref={editor}
                                config={config}
                                value={content}
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => {}}
                            />
                        </div>
                        <div>
                            <p className="block text-lg font-medium text-[#e3913f]">Upload Image</p>
                            <div className="mt-2 flex items-center">
                                <input
                                    multiple
                                    className="hidden"
                                    id="image"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label
                                    className="cursor-pointer bg-gray-200 rounded-lg px-4 py-2  hover:bg-gray-300"
                                    htmlFor="image"
                                >
                                    <IoMdImages />
                                </label>
                            </div>
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="flex gap-4 mt-4">
                                {imagePreviews.map((imageDataUrl) => (
                                    <div key={imageDataUrl} className="relative w-32 h-32 rounded-full border-2 border-dashed border-[#964B00] overflow-hidden shadow-md">
                                        <img
                                            alt="item"
                                            className="h-full w-full object-cover"
                                            src={imageDataUrl}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg py-2 px-6 shadow-lg" type="submit">
                                Post
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Post;
