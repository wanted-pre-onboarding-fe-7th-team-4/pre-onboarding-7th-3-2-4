import React from "react";
import Content from "./Content";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: Props) => {
  return (
    <div className={"grid grid-cols-layout h-screen"}>
      <Sidebar />
      <div className={"w-full"}>
        <Header title={title} />
        <Content>{children}</Content>
        <footer>
          <p className="w-full flex justify-center items-center h-16 bg-myGray text-slate-400 text-sm">
            Copyright @ December and Company Inc.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
