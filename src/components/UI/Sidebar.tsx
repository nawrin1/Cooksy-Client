/* eslint-disable prettier/prettier */

"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineHome, AiOutlineFileAdd, AiOutlineInfoCircle, AiOutlineContacts, AiOutlineUnorderedList } from "react-icons/ai";
import { Divider } from "@nextui-org/divider";
import { GiChefToque, GiNoodles } from "react-icons/gi";
import { MdCardMembership, MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { UserContext } from "@/src/context/user.provider";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "@/src/services/AuthService";
import { toast } from "sonner";
import { FaBook, FaUserCircle } from "react-icons/fa";


const Sidebar=()=> {
  const router = useRouter();
  const pathname=usePathname()
  // console.log(pathname,"pathname")

  const isActive = (path: string) => pathname === path;
  
  const context = useContext(UserContext);

  if (!context) {
      throw new Error("MyComponent must be used within a UserProvider");
    }
  
    const { user, isLoading, setIsLoading,setUser } = context;


  
    
  
    const handleLogout = () => {
      console.log("inside logged out")
      logout();
      setUser(null)
     
      toast.success("Logged out successfully")
      router.push('/dashboard')
     
    
      }

      console.log(user,"what")
    

  // console.log(isActive,"in sidebar")

  return (
    // [#fbeada]
    <div className="bg-[#fff4ea]  gap-2 lg:w-[20%] w-[10%] fixed h-screen flex flex-col p-4  place-content-around items-center text-orange-500 font-Peyda">
<div className="lg:flex gap-2 hidden ">
<h2 className="text-black font-semibold text-3xl">COOKSY</h2>
<GiNoodles className="text-2xl mt-1"/> 
</div>
<div className="h-screen  flex flex-col place-content-around ">
{
    user?.role=="Admin" && (
      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/manage') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/manage">
        <FaUserCircle size={23} />
        {/* <span className="invisible lg:visible  lg:inline">Post a Recipe</span> */}
        <span className=" hidden lg:inline  ">Manage User</span>
      </Link>
    )
  }
{
    user?.role=="Admin" && (
      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/manage') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/manage">
       <FaBook size={22} />
        {/* <span className="invisible lg:visible  lg:inline">Post a Recipe</span> */}
        <span className=" hidden lg:inline  ">Manage Recipe</span>
      </Link>
    )
  }
{
    user?.role=="Admin" && (
      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/manage') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/manage">
        <AiOutlineFileAdd size={24} />
        {/* <span className="invisible lg:visible  lg:inline">Post a Recipe</span> */}
        <span className=" hidden lg:inline  ">Manage Account</span>
      </Link>
    )
  }

  {
    user?.role=="User" && (
      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/post') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/post">
        <AiOutlineFileAdd size={24} />
        {/* <span className="invisible lg:visible  lg:inline">Post a Recipe</span> */}
        <span className=" hidden lg:inline  ">Post a Recipe</span>
      </Link>
    )
  }

      


      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard">
       
     
        <ImSpoonKnife size={24}/>
        {/* <span className="invisible lg:visible  lg:inline">All Recipes</span> */}
        <span className="hidden   lg:inline">All Recipe</span>
      </Link>
{
  user?.role=="User" && (
    <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/membership') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/membership">
       
    <MdCardMembership size={24} />
    {/* <span className="invisible lg:visible  lg:inline">All Recipes</span> */}
    <span className="hidden   lg:inline">Membership</span>
  </Link>
  )
}
      {
        user?.role=="User" && (      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/my-profile') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/my-profile">
      
        <CgProfile size={24}/>
          {/* <span className="invisible lg:visible  lg:inline">My Recipe</span> */}
          <span className="hidden   lg:inline">My Profile</span>
        </Link>
  )
      }


      {
        user?.role=="User" && (      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/mydashboard') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/mydashboard">
      
      <MdOutlineDashboardCustomize size={24} />
          {/* <span className="invisible lg:visible  lg:inline">My Recipe</span> */}
          <span className="hidden   lg:inline">Dashboard</span>
        </Link>
  )
      }
     



      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/aboutus') ? 'text-[#964B00] font-bold' : ''}`} href="/dashboard/aboutus">
        <AiOutlineInfoCircle size={24} />
        {/* <span className="invisible lg:visible  lg:inline">About Us</span> */}
        <span className="hidden   lg:inline">About Us</span>
      </Link>

      <Link className={`flex items-center gap-2 hover:text-orange-700 ${isActive('/dashboard/contactus') ? 'text-orange-700 font-bold' : ''}`} href="/dashboard/contactus">
        <AiOutlineContacts size={24} />
        {/* <span className="invisible lg:visible  lg:inline">Contact Us</span> */}
        <span className="hidden   lg:inline">Contact Us</span>
      </Link>

      {
        user ? (      
      
    <button className="flex gap-2  hover:text-orange-700" onClick={() => handleLogout()}>
        <RiLogoutCircleLine size={24} />
          {/* <span className="invisible lg:visible  lg:inline">My Recipe</span> */}
          <span className="hidden   lg:inline">Logout</span>
    </button>
      
        ):
        (      
      
          <Link className={`flex items-center gap-2 hover:text-orange-700 `} href="/login">
        <RiLogoutCircleLine size={24} />
          {/* <span className="invisible lg:visible  lg:inline">My Recipe</span> */}
          <span className="hidden   lg:inline">Login</span>
    </Link>
      
        )
      }
</div>
    </div>
  );
}

export default Sidebar;