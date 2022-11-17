import React from "react";
import Content from "./Content";
import Footer from "./Footer";
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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
