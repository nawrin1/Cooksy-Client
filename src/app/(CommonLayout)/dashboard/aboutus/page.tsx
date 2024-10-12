import Image from 'next/image';

import img1 from '../../../../assests/login-bg.jpg'
import img2 from '../../../../assests/about1.jpg'
import img3 from '../../../../assests/about2.jpg'




const AboutUs = () => {
  return (
    <div className="relative h-screen overflow-hidden">
    
      <div className="absolute inset-0 z-0">
        <Image
          src={img3}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50" 
        />
      </div>


      <div className="relative h-full flex flex-col items-center justify-center text-center z-10 p-5">
        <h1 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-2">Welcome to Our Community!</h1>
        <h2 className="lg:text-3xl text-xl  italic text-gray-800 mb-4">Where Connections Matter</h2>
        <p className="lg:text-lg text-[14px] md:text-[16px] text-gray-700 max-w-lg mb-6">
          Join us in building a vibrant community where you can connect, share, and grow together. 
          Our platform is dedicated to fostering relationships and creating meaningful experiences. 
          <span className="italic"> Together, we can achieve more!</span>
        </p>
        
      
        <button className="bg-[#8B4513] text-white px-6 py-2  shadow-lg transition-transform transform hover:scale-105 hover:bg-[#A0522D] focus:outline-none">
          Join Us Today
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
