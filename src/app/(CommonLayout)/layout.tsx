/* eslint-disable prettier/prettier */

import Sidebar from "@/src/components/UI/Sidebar";
import UserSidebar from "@/src/components/UI/UserSidebar";
import Link from "next/link";
import { AiOutlineHome, AiOutlineFileAdd, AiOutlineInfoCircle, AiOutlineContacts, AiOutlineUnorderedList } from "react-icons/ai";


export default function layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="flex">
     
      {/* <div className="bg-red-300 border-2 gap-2 w-[25%] border-red-400 fixed h-screen flex flex-col">
        <Link href="/dashboard/post">Post a Recipe</Link>
        <Link href="/dashboard">My Recipe</Link>
        <Link href="/dashboard">All Recipes</Link>
        <Link href="/dashboard">About Us</Link>
        <Link href="/dashboard">Contact Us</Link>
      </div> */}



{/* <div className="bg-white border-2 gap-2 w-[25%] border-orange-400 fixed h-screen flex flex-col p-4 text-orange-500">
      <Link href="/dashboard/post" className="flex items-center gap-2 hover:text-orange-700">
        <AiOutlineFileAdd size={24} />
        <span className="invisible lg:visible md:inline lg:inline">Post a Recipe</span>
      </Link>
      <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-700">
        <AiOutlineHome size={24} />
        <span className="invisible lg:visible md:inline lg:inline">My Recipe</span>
      </Link>
      <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-700">
        <AiOutlineUnorderedList size={24} />
        <span className="invisible lg:visible md:inline lg:inline">All Recipes</span>
      </Link>
      <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-700">
        <AiOutlineInfoCircle size={24} />
        <span className="invisible lg:visible md:inline lg:inline">About Us</span>
      </Link>
      <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-700">
        <AiOutlineContacts size={24} />
        <span className="invisible lg:visible md:inline lg:inline">Contact Us</span>
      </Link>
    </div> */}
    <Sidebar />

      {/* Middle content */}
      <div className="lg:w-[55%] md:w-[65%] w-[90%] lg:ml-[20%] ml-[10%] h-screen overflow-y-auto scrollable-content bg-white">
        <main>{children}</main>
      </div>

      
      <div className="lg:w-[25%] md:w-[25%] w-0 bg-[#fff4ea] fixed right-0 h-screen">
        <UserSidebar />
      </div>
    </div>
  );
}
