import Navbar from "@/components/home/sections/Navbar";
import React from "react";



function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar/>
      {children}
    </div>
  );
}

export default Layout;
