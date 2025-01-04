import React from "react";
import Navbar from "../(workspace)/resumes/_components/Navbar";


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
