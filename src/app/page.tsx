/* eslint-disable prettier/prettier */
"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer); // Clean up the timeout on unmount
  }, []);

  useEffect(() => {
    if (!isLoading) {
      redirect('/login'); // Redirect when loading is complete
    }
  }, [isLoading]);

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
      ) : null}
    </>
  );
};

export default Home;
