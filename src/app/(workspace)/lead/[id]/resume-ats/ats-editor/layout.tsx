import Navbar from "@/app/(workspace)/resumes/_components/Navbar";
import React from "react";


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      {children}
    </div>
  );
}

export default Layout;
