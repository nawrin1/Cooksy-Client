/* eslint-disable prettier/prettier */
"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        
      }, 2200);
    }, []);
    // https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif

    return (
        <>
        {isLoading ? (
            <div className="w-full h-screen flex justify-center items-center bg-white">

            
           
                <img 
                    src="https://i.pinimg.com/originals/67/a3/30/67a330c6c3edd8f424672510b4615507.gif" 
                    alt="Loading"
                    width="500px" 
                    height="500px" 
                />
                </div>
            
        ) :redirect('/dashboard')}
        </>
    );
};

export default Home;
