/* eslint-disable prettier/prettier */

"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineHome, AiOutlineFileAdd, AiOutlineInfoCircle, AiOutlineContacts, AiOutlineUnorderedList } from "react-icons/ai";
import { Divider } from "@nextui-org/divider";
import { GiChefToque, GiNoodles } from "react-icons/gi";

const Sidebar=()=> {
  const router = useRouter();
  const pathname=usePathname()
  console.log(pathname,"pathname")

  const isActive = (path: string) => pathname === path;

  console.log(isActive,"in sidebar")

  return (
    // [#fbeada]
    <div className="bg-[#fff4ea]  gap-2 lg:w-[20%] w-[10%] fixed h-screen flex flex-col p-4  place-content-around items-center text-orange-500 font-Peyda">
<div className="lg:flex gap-2 hidden">
<h2 className="text-black font-semibold text-3xl">COOKSY</h2>
<GiNoodles className="text-2xl mt-1"/> 
</div>
<div className="h-screen  flex flex-col place-content-around ">
<Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/post') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard/post">
        <AiOutlineFileAdd size={24} />
        {/* <span className="invisible lg:visible  lg:inline">Post a Recipe</span> */}
        <span className=" hidden lg:inline  ">Post a Recipe</span>
      </Link>
      

      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/my-recipe') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard/my-recipe">
      {/* <AiOutlineUnorderedList size={24} /> */}
      <ImSpoonKnife size={24}/>
        {/* <span className="invisible lg:visible  lg:inline">My Recipe</span> */}
        <span className="hidden   lg:inline">My Recipe</span>
      </Link>

      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard">
       
        <AiOutlineHome size={24} />
        {/* <span className="invisible lg:visible  lg:inline">All Recipes</span> */}
        <span className="hidden   lg:inline">All Recipe</span>
      </Link>

      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/about-us') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard/about-us">
        <AiOutlineInfoCircle size={24} />
        {/* <span className="invisible lg:visible  lg:inline">About Us</span> */}
        <span className="hidden   lg:inline">About Us</span>
      </Link>

      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/contact-us') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard/contact-us">
        <AiOutlineContacts size={24} />
        {/* <span className="invisible lg:visible  lg:inline">Contact Us</span> */}
        <span className="hidden   lg:inline">Contact Us</span>
      </Link>
</div>
    </div>
  );
}

export default Sidebar;