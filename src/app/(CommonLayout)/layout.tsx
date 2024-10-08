/* eslint-disable prettier/prettier */

import UserProvider from "@/src/context/user.provider"
import Link from "next/link"


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  ">
      <div className="bg-red-300 border-2 gap-2 border-red-400 flex flex-col h-screen">
     
        <Link href="/dashboard/post">Post</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      
      
      <div className="bg-blue-600 flex-1">

      <main>{children}</main>
      </div>
      
    </div>
  );
}
