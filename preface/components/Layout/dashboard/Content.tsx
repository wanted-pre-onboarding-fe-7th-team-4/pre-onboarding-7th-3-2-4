import React from "react";

interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <main
      className={
        "w-full  bg-gray1 flex justify-center p-7 mx-auto h-[calc(100vh-112px)]"
      }
    >
      {children}
    </main>
  );
};

export default Content;
